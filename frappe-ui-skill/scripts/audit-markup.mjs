/**
 * Audits Vue markup against the frappe-ui API reference.
 *
 * Catches the two failure modes a passing build does not: an invented prop or
 * enum value (which silently renders the component's default) and a raw
 * Tailwind colour (which looks correct until the theme flips).
 *
 * Usage:
 *   node scripts/audit-markup.mjs <file.vue> [more.vue ...]
 *   node scripts/audit-markup.mjs src/            # walks the directory
 *
 * Exits non-zero when anything is found.
 */
import fs from 'node:fs'
import path from 'node:path'
import url from 'node:url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const REFERENCE = path.join(__dirname, '../references/components.md')

const targets = process.argv.slice(2)
if (!targets.length) {
  console.error('usage: node audit-markup.mjs <file.vue|dir> [...]')
  process.exit(1)
}

/* ---------- load the component contract from the reference ---------- */

/**
 * Parse `references/components.md` back into a lookup. The reference is
 * generated, so its shape is stable: `### Name`, an optional `Axes:` line, a
 * props table, and a `Slots:` line.
 */
function loadContract() {
  if (!fs.existsSync(REFERENCE)) {
    console.error(`missing ${REFERENCE} — run build-reference.mjs first`)
    process.exit(1)
  }
  const text = fs.readFileSync(REFERENCE, 'utf8')
  const components = {}
  let current = null

  for (const line of text.split('\n')) {
    const heading = line.match(/^### (\w+)/)
    if (heading) {
      current = { props: new Set(), values: {}, slots: new Set() }
      components[heading[1]] = current
      continue
    }
    if (!current) continue

    // `Axes: \`theme\` = \`gray\` | \`blue\`` — the enumerable values.
    if (line.startsWith('Axes: ')) {
      for (const axis of line.slice(6).split('·')) {
        const m = axis.match(/`(\w+)`\s*=\s*(.+)/)
        if (!m) continue
        current.values[m[1]] = [...m[2].matchAll(/`([^`]+)`/g)].map((x) => x[1])
      }
      continue
    }
    if (line.startsWith('Slots: ')) {
      for (const s of line.slice(7).matchAll(/`([^`]+)`/g)) current.slots.add(s[1])
      continue
    }
    // Props table row: | `name` | `type` | `default` | values |
    // A required prop is written `` `name` * ``, so the marker is optional and
    // may be preceded by a space.
    const row = line.match(/^\| `(\w+)`\s*\*? \|/)
    if (row) current.props.add(row[1])
  }
  return components
}

const contract = loadContract()

/* ---------- colour rules ---------- */

const HUES =
  'slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose'
/** Any utility prefix against a raw palette hue, plus the absolute -white/-black. */
const RAW_PALETTE = new RegExp(
  String.raw`\b[a-z]+(?:-[a-z]+)*-(?:(?:${HUES})-\d{2,3}|white|black)\b(?!-)`,
  'g',
)
const ARBITRARY_COLOR = /\b[a-z-]+-\[#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})[^\]]*\]/g
const HEX = /(?<![\w#])#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})\b(?![\w-])/g
const DARK_VARIANT = /\bdark:[a-z-]/g
/** `bg-surface-white` is a frappe-ui token, not Tailwind's `bg-white`. */
const SEMANTIC = /^(?:bg|text|border|ring|divide|fill|stroke|outline|placeholder)-(?:surface|ink|outline)-/

/* ---------- the audit ---------- */

/**
 * Components that forward every unrecognised attribute to a child.
 * `FormControl` is a dispatcher: it resolves a child from `type` and passes the
 * rest through (`inheritAttrs: false` + `useAttrs()`), so `options` on a
 * `type="select"` is correct even though `FormControl` does not declare it.
 * Reporting those would train the reader to ignore the tool.
 */
const FORWARDS_ATTRS = new Set(['FormControl'])

const findings = []
const report = (file, line, kind, msg) => findings.push({ file, line, kind, msg })

/** Line number of a character offset, for a citable location. */
const lineOf = (text, index) => text.slice(0, index).split('\n').length

/**
 * Split a tag's attribute text into `{ name, value, bound }` records.
 *
 * A naive `\w+="..."` regex also matches words INSIDE a quoted value, so
 * `title="SLA timer has started"` reports phantom props named `SLA`, `timer`
 * and `has`. Walk the string instead and skip over each quoted region.
 */
function parseAttrs(attrs) {
  const out = []
  let i = 0
  while (i < attrs.length) {
    // An attribute name, optionally prefixed by a binding sigil. A dynamic
    // argument (`:[expr]="…"`) names its prop at runtime, so capture the
    // bracket form and skip it rather than reading `[state]` as a prop name.
    const m = /^\s*((?::|v-bind:|@|v-on:|#|v-)?(?:\[[^\]]*\]|[a-zA-Z][\w.:-]*))/.exec(attrs.slice(i))
    if (!m) {
      i++
      continue
    }
    const rawName = m[1]
    i += m[0].length

    let value = null
    const eq = /^\s*=\s*/.exec(attrs.slice(i))
    if (eq) {
      i += eq[0].length
      const quote = attrs[i]
      if (quote === '"' || quote === "'") {
        const end = attrs.indexOf(quote, i + 1)
        value = end === -1 ? attrs.slice(i + 1) : attrs.slice(i + 1, end)
        i = end === -1 ? attrs.length : end + 1
      } else {
        const sp = /\s/.exec(attrs.slice(i))
        value = sp ? attrs.slice(i, i + sp.index) : attrs.slice(i)
        i += value.length
      }
    }
    const dynamic = /\[/.test(rawName)
    out.push({ rawName, value, bound: /^(:|v-bind:)/.test(rawName), dynamic })
  }
  return out
}

/** `icon-left` and `iconLeft` are the same prop; compare in one canonical form. */
const canonical = (s) => s.replace(/-([a-zA-Z])/g, (_, c) => c.toUpperCase())

function auditFile(file) {
  const rawFile = fs.readFileSync(file, 'utf8')

  /**
   * Strip markup that is documentation rather than live UI: `<pre>`, `<code>`
   * and any prop carrying a code sample. Those hold entity-escaped tags
   * (`title=&quot;…&quot;`) which parse as real attributes and produce
   * confident nonsense like "Button has no prop `quot`".
   */
  const raw = rawFile
    .replace(/<pre[\s\S]*?<\/pre>/g, '')
    .replace(/<code[\s\S]*?<\/code>/g, '')
    .replace(/:code="`[\s\S]*?`"/g, ':code=""')
    .replace(/:?code="[^"]*"/g, 'code=""')

  /**
   * Colour rules apply to markup, not to prose or data. A `<FormControl
   * type="color">` legitimately models a hex string, and a comment may cite an
   * upstream issue like `#998`, which is indistinguishable from a 3-digit hex
   * by shape. Scan with comments and script-block string literals removed.
   */
  const scriptEnd = raw.indexOf('</script>')
  const script = scriptEnd === -1 ? '' : raw.slice(0, scriptEnd)
  const template = scriptEnd === -1 ? raw : raw.slice(scriptEnd)
  const scanned =
    script
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\/\/[^\n]*/g, '')
      .replace(/'[^'\n]*'|"[^"\n]*"|`[^`]*`/g, "''") +
    template.replace(/<!--[\s\S]*?-->/g, '')

  for (const [re, kind] of [
    [RAW_PALETTE, 'raw-palette'],
    [ARBITRARY_COLOR, 'arbitrary-colour'],
    [HEX, 'hex-colour'],
    [DARK_VARIANT, 'dark-variant'],
  ]) {
    for (const m of scanned.matchAll(re)) {
      if (SEMANTIC.test(m[0])) continue
      report(file, lineOf(scanned, m.index), kind, `${m[0]} does not follow the theme`)
    }
  }

  /**
   * Which frappe-ui components this file imports. Auditing props against a
   * component the file never imports would flag unrelated markup.
   */
  const imported = new Set()
  for (const m of raw.matchAll(/import\s*\{([^}]+)\}\s*from\s*['"]frappe-ui(?:\/[\w-]+)?['"]/g)) {
    for (const part of m[1].split(',')) {
      const name = part.replace(/\btype\b/, '').trim().split(/\s+as\s+/)[0].trim()
      if (name) imported.add(name)
    }
  }

  // Each usage of an imported component: check its props and enum values.
  for (const name of imported) {
    const spec = contract[name]
    if (!spec) continue
    // Attributes only: stop at the tag's own `>`, never span into its body.
    const tag = new RegExp(`<${name}(\\s[^>]*?)?/?>`, 'g')
    for (const use of raw.matchAll(tag)) {
      const attrs = use[1] ?? ''
      const at = lineOf(raw, use.index)

      for (const { rawName, value, bound, dynamic } of parseAttrs(attrs)) {
        // A dynamic argument names its prop at runtime; nothing to check.
        if (dynamic) continue
        // Directives, events and slots are not props.
        if (/^(v-|@|#)/.test(rawName)) continue
        const plain = rawName.replace(/^(?::|v-bind:)/, '')
        if (/^(is|key|ref|class|style|id|role|tabindex|title|alt|href|target|rel|type|name|placeholder|disabled|readonly|required|autofocus)$/.test(plain)) {
          // Some of these ARE props on some components; only skip when the
          // component does not declare it, so a real prop is still validated.
          if (!spec.props.has(canonical(plain))) continue
        }
        if (plain.startsWith('data-') || plain.startsWith('aria-')) continue

        if (!spec.props.has(canonical(plain))) {
          // A dispatcher forwards what it does not declare, so an unknown
          // attribute on one is expected rather than a mistake.
          if (FORWARDS_ATTRS.has(name)) continue
          report(file, at, 'unknown-prop', `<${name}> has no prop \`${plain}\``)
          continue
        }
        // A bound value is an expression, so only literals can be checked.
        const allowed = spec.values[canonical(plain)]
        if (allowed && value != null && !bound && !allowed.includes(value)) {
          report(
            file,
            at,
            'unknown-value',
            `<${name}> ${plain}="${value}" — allowed: ${allowed.join(', ')}`,
          )
        }
      }
    }
  }

  /**
   * Slot names are per component, and a typo silently renders nothing. A slot
   * is acceptable when ANY imported component declares it: the file may nest
   * several, and this script does not track which tag a template sits inside.
   * `default` is always valid.
   */
  const declared = new Set(['default'])
  for (const n of imported) for (const s of contract[n]?.slots ?? []) declared.add(s)
  if (declared.size > 1) {
    for (const s of raw.matchAll(/<template\s+#([\w-]+)/g)) {
      if (!declared.has(s[1])) {
        report(
          file,
          lineOf(raw, s.index),
          'unknown-slot',
          `no imported component declares slot \`${s[1]}\``,
        )
      }
    }
  }
}

/** Walk a directory for .vue files, skipping dependency and build output. */
function collect(target, acc = []) {
  const stat = fs.statSync(target)
  if (stat.isFile()) {
    if (target.endsWith('.vue')) acc.push(target)
    return acc
  }
  for (const entry of fs.readdirSync(target, { withFileTypes: true })) {
    if (/^(node_modules|dist|\.git)$/.test(entry.name)) continue
    collect(path.join(target, entry.name), acc)
  }
  return acc
}

const files = targets.flatMap((t) => collect(t))
for (const f of files) auditFile(f)

console.log(`audited ${files.length} file(s) against ${Object.keys(contract).length} components`)

if (!findings.length) {
  console.log('clean')
  process.exit(0)
}

const byKind = {}
for (const f of findings) (byKind[f.kind] ||= []).push(f)
for (const [kind, list] of Object.entries(byKind)) {
  console.log(`\n${kind} (${list.length}):`)
  for (const f of list.slice(0, 20)) {
    console.log(`  ${path.relative(process.cwd(), f.file)}:${f.line}  ${f.msg}`)
  }
}
process.exit(1)
