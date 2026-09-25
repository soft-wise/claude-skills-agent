/**
 * Generates the skill's design-token reference from frappe-ui's own token
 * export (`tailwind/tokens/*.js`), which the library itself generates from its
 * design file. Nothing here is transcribed by hand.
 *
 * Optimised for an agent writing markup: it needs to know which utility to
 * type, and that semantic tokens follow the theme while raw palette classes do
 * not. Full oklch values are noise for that task, so the ramps are summarised
 * and the semantic layers are listed in full.
 *
 * Usage: node scripts/build-tokens.mjs <tokens.generated.json> <out-dir>
 */
import fs from 'node:fs'
import path from 'node:path'

const [, , tokensPath, outDir] = process.argv
if (!tokensPath || !outDir) {
  console.error('usage: node build-tokens.mjs <tokens.generated.json> <out-dir>')
  process.exit(1)
}

const t = JSON.parse(fs.readFileSync(tokensPath, 'utf8'))
fs.mkdirSync(outDir, { recursive: true })

const L = []
const w = (s = '') => L.push(s)

w('# frappe-ui design tokens')
w()
w(`Generated from frappe-ui \`${t.version}\`'s \`tailwind/tokens/*.js\`.`)
w()
w('## The rule that matters')
w()
w('Write **semantic** utilities, never Tailwind\'s raw palette. `bg-surface-gray-2`')
w('resolves to a different colour per theme; `bg-gray-100` is a fixed light-mode')
w('value that never flips, so it breaks dark mode. Same for `#hex` and `dark:`')
w('variants: the library switches themes through `data-theme` on `<html>`, so a')
w('hard-coded colour simply will not follow.')
w()

/* ---------- semantic layers ---------- */

const semantic = t.colors.themedVariables || {}
const families = new Set()
for (const byFamily of Object.values(semantic)) {
  for (const f of Object.keys(byFamily)) families.add(f)
}

/** What a caller actually types for each semantic family. */
const UTILITIES = {
  surface: '`bg-surface-*`',
  ink: '`text-ink-*`, `fill-ink-*`, `placeholder-ink-*`',
  outline: '`border-outline-*`, `ring-outline-*`, `divide-outline-*`',
}

w('## Semantic colour')
w()
w('| Family | Utilities | Steps |')
w('|---|---|---|')
for (const family of families) {
  const keys = Object.keys(semantic.light?.[family] ?? {})
  if (!keys.length) continue
  // Collapse `gray-1 … gray-10` into a range: the list is otherwise 100+ cells.
  const groups = new Map()
  for (const k of keys) {
    const m = k.match(/^(.*?)-(\d+)$/)
    const base = m ? m[1] : k
    if (!groups.has(base)) groups.set(base, [])
    if (m) groups.get(base).push(Number(m[2]))
  }
  const steps = [...groups.entries()]
    .map(([base, nums]) =>
      nums.length ? `\`${base}-${Math.min(...nums)}..${Math.max(...nums)}\`` : `\`${base}\``,
    )
    .join(', ')
  w(`| \`${family}\` | ${UTILITIES[family] ?? `\`${family}-*\``} | ${steps} |`)
}
w()
w('Higher step = stronger contrast. Steps are NOT interchangeable across')
w('families: `ink-red-5` and `surface-red-5` resolve to different ramp steps.')
w()

/* ---------- typography ---------- */

w('## Typography')
w()
w(`Font: \`${Object.values(t.typography.fontFamily || {}).join(', ')}\`.`)
w()
w('Two parallel scales share pixel sizes and differ in line height:')
w('`text-*` for single-line labels, `text-p-*` for text that wraps.')
w()
w('| Token | Size | Line height | Tracking |')
w('|---|---|---|---|')
for (const [name, def] of Object.entries(t.typography.fontSize || {})) {
  // The paragraph twins are the same sizes; listing both doubles the table.
  if (name.startsWith('p-')) continue
  const [size, meta = {}] = Array.isArray(def) ? def : [def, {}]
  w(`| \`text-${name}\` | ${size} | ${meta.lineHeight ?? '—'} | ${meta.letterSpacing ?? '—'} |`)
}
w()

/**
 * Only the weights the Tailwind plugin actually emits. The token export still
 * carries `black`, but the plugin dropped it (upstream #998), and `regular` is
 * the bare `text-<size>` utility rather than a `-regular` suffix. Writing
 * either produces a class that does not exist and silently falls back.
 */
const EMITTED_WEIGHTS = ['medium', 'semibold', 'bold']
w('Size and weight combine into one utility, which carries tuned tracking:')
w('`text-<size>-<weight>` and `text-p-<size>-<weight>`, where `<weight>` is')
w(`${EMITTED_WEIGHTS.map((x) => `\`${x}\``).join(' | ')}. Prefer \`text-lg-semibold\``)
w('over `text-lg font-semibold`.')
w()
w('`regular` is the bare `text-<size>`; `black` exists in the token export but')
w('the plugin does **not** emit a utility for it, so `text-lg-black` silently')
w('renders at the fallback size.')
w()

/* ---------- radius, elevation, focus ---------- */

w('## Radius')
w()
w('| Utility | Value |')
w('|---|---|')
for (const [k, v] of Object.entries(t.radius)) w(`| \`rounded-${k}\` | ${v} |`)
w()
w('Named aliases (`rounded-md`, `rounded-xl`, …) were removed in 1.0.')
w()

w('## Elevation')
w()
const elevation = Object.keys(t.effects.elevation?.light ?? {})
w(`Shadows: ${elevation.map((s) => `\`shadow-${s}\``).join(', ')}.`)
w('Pair a shadow with a `bg-surface-elevation-*` background.')
w()

const focus = Object.keys(t.effects.focus?.light ?? {})
if (focus.length) {
  w('## Focus ring')
  w()
  w('A global `:focus-visible` outline covers every focusable element, so a')
  w('custom control usually needs nothing. Retheme with `focus-visible:focus-ring-<name>`:')
  w(`${focus.filter((f) => f !== 'default').map((f) => `\`${f}\``).join(', ')}.`)
  w()
  w('Do not pair `focus:outline-none` with `focus-ring`: the reset wins on')
  w('equal specificity and removes the visible indicator.')
  w()
}

fs.writeFileSync(path.join(outDir, 'tokens.md'), L.join('\n'))
console.log(
  `tokens.md: ${families.size} semantic families, ` +
    `${Object.keys(t.typography.fontSize || {}).length} type sizes, ` +
    `${Object.keys(t.radius).length} radii`,
)
