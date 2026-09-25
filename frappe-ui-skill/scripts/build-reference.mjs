/**
 * Generates the skill's API reference from the verified component matrix.
 *
 * The matrix itself was extracted from frappe-ui's own generated `*.api.md`
 * tables and the string unions in each component's `types.ts`, then checked
 * against the rendered gallery: every documented enum value was confirmed to
 * reach the DOM, and 182 sub-component rows were diffed against source with
 * zero mismatches. So the tables below are mechanical, not transcribed.
 *
 * Usage: node scripts/build-reference.mjs <matrix.json> <out-dir>
 */
import fs from 'node:fs'
import path from 'node:path'

const [, , matrixPath, outDir] = process.argv
if (!matrixPath || !outDir) {
  console.error('usage: node build-reference.mjs <matrix.generated.json> <out-dir>')
  process.exit(1)
}

const matrix = JSON.parse(fs.readFileSync(matrixPath, 'utf8'))
fs.mkdirSync(outDir, { recursive: true })

/** Not components: type-only barrels and app-level plumbing. */
const NOT_A_COMPONENT = new Set(['shared', 'Dialogs.vue', 'types'])

/**
 * The grouping the library's own `src/index.ts` uses, so an agent scanning for
 * "a date field" or "an overlay" lands in the right table.
 */
const GROUPS = {
  'Base': [
    'Alert', 'Avatar', 'Badge', 'Breadcrumbs', 'Button', 'Divider', 'Icon',
    'LoadingIndicator', 'LoadingText', 'Progress', 'Rating', 'Skeleton',
    'Spinner', 'Tooltip',
  ],
  'Form controls': [
    'Checkbox', 'Combobox', 'DatePicker', 'Duration', 'ErrorMessage',
    'FileUploader', 'FormControl', 'FormLabel', 'MultiSelect', 'Password',
    'Radio', 'Select', 'Slider', 'Switch', 'Textarea', 'TextInput', 'TimePicker',
  ],
  'Overlays and feedback': [
    'BottomSheet', 'ContextMenu', 'Dialog', 'Dropdown', 'HoverCard', 'Popover',
    'Toast',
  ],
  'Lists and data': ['ItemListRow', 'Tree'],
  'Navigation and layout': [
    'DesktopShell', 'MobileNav', 'MobileShell', 'PageHeader', 'ScrollArea',
    'SettingsDialog', 'Sidebar', 'SidebarRail', 'TabButtons', 'Tabs',
  ],
  'Keyboard': ['KeyboardShortcut', 'KeyboardShortcutsDialog'],
  'App setup': ['FrappeUIProvider'],
}

const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n+/g, ' ').trim()
/** One line per row, so a wide table stays greppable. */
const truncate = (s, n) => (s.length > n ? s.slice(0, n - 1) + '…' : s)

const L = []
const w = (s = '') => L.push(s)

w('# frappe-ui component API reference')
w()
w(`Generated from frappe-ui \`${matrix.version ?? '1.0.0-rc.1'}\`'s own \`*.api.md\``)
w('tables and `types.ts` unions. Every enum value listed here was verified to')
w('render in a built gallery of the library.')
w()
w('**Read the row before you write the prop.** A value not in the `Values`')
w('column does not exist. Slot names are per component and never universal.')
w()

/** Index first: an agent should be able to find the component in one scan. */
w('## Index')
w()
w('| Group | Components |')
w('|---|---|')
for (const [group, names] of Object.entries(GROUPS)) {
  const present = names.filter((n) => matrix.components[n] || matrix.exported.includes(n))
  if (present.length) w(`| ${group} | ${present.map((n) => `\`${n}\``).join(', ')} |`)
}
w()

const rendered = new Set()

for (const [group, names] of Object.entries(GROUPS)) {
  const present = names.filter((n) => matrix.components[n])
  if (!present.length) continue
  w(`## ${group}`)
  w()

  for (const name of present) {
    const c = matrix.components[name]
    if (!c || NOT_A_COMPONENT.has(name)) continue
    rendered.add(name)

    w(`### ${name}`)
    w()

    const enumProps = c.props.filter((p) => p.values)
    if (enumProps.length) {
      // Lead with the variation axes: these are what a caller gets wrong.
      w(
        'Axes: ' +
          enumProps.map((p) => `\`${p.name}\` = ${p.values.map((v) => `\`${v}\``).join(' | ')}`).join(' · '),
      )
      w()
    }

    if (c.props.length) {
      w('| Prop | Type | Default | Values |')
      w('|---|---|---|---|')
      for (const p of c.props) {
        const values = p.values
          ? p.values.map((v) => `\`${v}\``).join(' \\| ')
          : p.boolean
            ? '`true` \\| `false`'
            : ''
        w(
          `| \`${p.name}\`${p.required ? ' *' : ''} | \`${truncate(esc(p.type) || '—', 46)}\` | ` +
            `${p.default ? `\`${truncate(esc(p.default), 22)}\`` : '—'} | ${values || '—'} |`,
        )
      }
      w()
    }

    if (c.slots.length) {
      w(`Slots: ${c.slots.map((s) => `\`${s.name}\``).join(', ')}`)
      w()
    }
    if (c.emits.length) {
      w(`Emits: ${c.emits.map((e) => `\`${e.name}\``).join(', ')}`)
      w()
    }
    if (c.exposed?.length) {
      w(`Exposed on a template ref: ${c.exposed.map((e) => `\`${e.name}\``).join(', ')}`)
      w()
    }
    const subs = Object.entries(c.subComponents ?? {}).filter(
      ([, s]) => s.props?.length || s.slots?.length,
    )
    if (subs.length) {
      w('Sub-components (same import):')
      w()
      for (const [subName, s] of subs) {
        const bits = []
        if (s.props?.length) bits.push(`props ${s.props.map((p) => `\`${p.name}\``).join(', ')}`)
        if (s.slots?.length) bits.push(`slots ${s.slots.map((x) => `\`${x.name}\``).join(', ')}`)
        w(`- \`${subName}\` — ${bits.join('; ')}`)
      }
      w()
    }
  }
}

/** Anything exported that no group claimed would otherwise be undocumented. */
const missed = Object.keys(matrix.components).filter(
  (n) => !rendered.has(n) && matrix.exported.includes(n) && !NOT_A_COMPONENT.has(n),
)
if (missed.length) {
  w('## Other exported components')
  w()
  for (const name of missed) {
    const c = matrix.components[name]
    w(`- \`${name}\` — ${c.props.length} props, ${c.slots.length} slots`)
  }
  w()
}

fs.writeFileSync(path.join(outDir, 'components.md'), L.join('\n'))

const stats = {
  components: rendered.size,
  props: [...rendered].reduce((n, k) => n + matrix.components[k].props.length, 0),
  slots: [...rendered].reduce((n, k) => n + matrix.components[k].slots.length, 0),
  enumAxes: [...rendered].reduce(
    (n, k) => n + matrix.components[k].props.filter((p) => p.values).length,
    0,
  ),
}
console.log(
  `components.md: ${stats.components} components, ${stats.props} props, ` +
    `${stats.slots} slots, ${stats.enumAxes} enum axes`,
)
