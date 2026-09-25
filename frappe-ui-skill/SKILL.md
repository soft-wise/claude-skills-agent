---
name: frappe-ui-skill
description: Build Vue 3 interfaces with the frappe-ui component library and its design tokens. Use when writing any UI in a Frappe app (Frappe Cloud, Gameplan, CRM, Helpdesk, Drive, Insights), when the user mentions frappe-ui, or when asked to build a page, form, dialog, table, sidebar or shell that should match Frappe's look. Covers 50 components with verified prop/slot/enum tables, semantic Tailwind tokens, and the data-fetching composables.
license: MIT
---

# frappe-ui

Compose UIs from **frappe-ui** components and style them with the library's
**semantic Tailwind tokens**, so one class works in both light and dark mode.

```vue
<script setup>
import { Button, Dialog, FormControl } from 'frappe-ui'
import { ref } from 'vue'

const open = ref(false)
const title = ref('')
</script>

<template>
  <div class="bg-surface-base p-4 text-ink-gray-8">
    <Button variant="solid" theme="gray" icon-left="lucide-plus" @click="open = true">
      New task
    </Button>

    <Dialog v-model:open="open" title="Create task">
      <FormControl v-model="title" label="Title" placeholder="Ship the thing" required />
    </Dialog>
  </div>
</template>
```

## Look it up, do not guess

Prop names, allowed values, slot names and token names are in the reference
files. They are generated from the library's own API tables, so they are exact.
Open the one you need **before** writing markup.

| Writing this | Read |
|---|---|
| any component: props, enum values, slots, emits | [references/components.md](references/components.md) |
| any colour, type, radius, shadow or focus class | [references/tokens.md](references/tokens.md) |
| anything that reads or writes Frappe data | [references/data.md](references/data.md) |
| a new project, or Tailwind/Vite config | [references/setup.md](references/setup.md) |

If a prop is not in the table, it does not exist. If an enum value is not in the
`Values` column, it does not exist. Inventing either produces markup that looks
right and silently renders the default.

## The eight rules

**1. Import from `'frappe-ui'`.** Four families ship on their own subpaths:
`frappe-ui/list`, `frappe-ui/editor`, `frappe-ui/charts`, `frappe-ui/experimental`.

**2. Colour is two props: `theme` and `variant`.** The value sets differ per
component. `Button` takes `theme` gray|blue|green|red and `variant`
solid|subtle|outline|ghost; `Badge` takes six themes. Check the table.

**3. Never write a raw Tailwind colour.** `bg-gray-100`, `#hex` and `dark:`
variants are fixed light-mode values that do not follow the theme. Use
`bg-surface-*`, `text-ink-*`, `border-outline-*`. This is the single most common
way to break a frappe-ui page.

**4. Two-way state is `v-model`.** Inputs take `v-model`. Overlays take
`v-model:open`. `Combobox` and `MultiSelect` add `v-model:query`. A controlled
input with no model renders empty.

**5. Icons are CSS classes, not components.**
`<span class="lucide-plus size-4" aria-hidden="true" />`, and a prop named
`icon` / `icon-left` / `icon-right` takes the string `"lucide-plus"`.

**6. Slot names are per component.** There is no universal slot set. Read the
component's `Slots:` line before writing `<template #…>`.

**7. Overlays start closed.** Drive `Dialog`, `Popover`, `Dropdown`,
`HoverCard`, `ContextMenu`, `BottomSheet` and `SettingsDialog` from a local
`ref`, opened by a trigger.

**8. Data goes through the composables** — `useCall`, `useList`, `useDoc`,
`useDoctype`, `useNewDoc`. See [references/data.md](references/data.md).

## Picking the component

| You need | Use |
|---|---|
| an action | `Button`, or `Dropdown` for a menu of actions |
| a labelled field | `FormControl` (wraps the input, label and error) |
| free text | `TextInput`, `Textarea`, `Password` |
| one of a fixed list | `Select` (native) or `Combobox` (searchable) |
| several of a list | `MultiSelect` |
| a date or time | `DatePicker`, `TimePicker`, `Duration` |
| on/off | `Switch` (setting), `Checkbox` (form value) |
| status text | `Badge` (inline) or `Alert` (block) |
| a transient message | `toast()` |
| a confirm or prompt | `dialog.confirm`, `dialog.danger`, `dialog.prompt` |
| an app frame | `DesktopShell` + `Sidebar`, `MobileShell` + `MobileNav` |
| a page title row | `PageHeader` (needs a shell, see below) |
| hierarchical data | `Tree` |
| a loading state | `Skeleton` (layout) or `Spinner` / `LoadingIndicator` (inline) |

## Traps

These cost real debugging time.

- **`PageHeader` teleports.** It renders into the nearest shell's
  `PageHeaderTarget`, not where you wrote it. Outside a shell it falls back to a
  module-level last-wins registry, so it can land in a completely different part
  of the page. Put it inside a `DesktopShell` / `MobileShell`, or mount a
  `PageHeaderTarget` in the container you want it in.
- **`text-ink-base` is inverse ink**, white in light mode. It is for text on a
  dark surface (`bg-surface-gray-9`, tooltips, toasts). Body text is
  `text-ink-gray-8`; a heading is `text-ink-gray-9`. Using `ink-base` for a
  heading makes it invisible.
- **`text-<size>-black` does not exist.** Emitted weights are `medium`,
  `semibold`, `bold`. `regular` is the bare `text-<size>`.
- **Do not pair `focus:outline-none` with `focus-ring`.** Same specificity, the
  reset wins, and the focus indicator disappears.
- **Radius aliases were removed in 1.0.** Use the numeric scale, `rounded-0` …
  `rounded-9`, plus `rounded-full`.
- **Shells take the viewport.** To embed one in a page, wrap it in a bounded box
  with `transform-gpu`, which establishes a containing block for its
  `fixed inset-0`.

## Composition

Page background and default ink go on the wrapper once:

```vue
<div class="min-h-screen bg-surface-base text-ink-gray-8">
```

A card is `bg-surface-base` plus `border border-outline-gray-1 rounded-6`. A
dialog panel is `bg-surface-elevation-1 rounded-7 shadow-xl`. A popover or menu
is `bg-surface-elevation-2 rounded-6 shadow-2xl`. Control interaction ladder is
`bg-surface-gray-2 hover:bg-surface-gray-3 active:bg-surface-gray-4`.

## Verifying your work

A frappe-ui page fails in ways that a passing build does not catch: an invented
prop silently renders the default, a raw palette class looks fine until dark
mode, and an overlay that never opens looks identical at rest to one that works.

After writing UI, check:

1. Every prop and enum value you used appears in `references/components.md`.
2. No `bg-gray-*`, no `#hex`, no `dark:` in your markup.
3. Toggle the theme and confirm your surfaces and text both flip.
4. Open every overlay you added at least once.

`scripts/audit-markup.mjs` automates checks 1 and 2:

```bash
node scripts/audit-markup.mjs src/components/MyPage.vue
```

## Regenerating the references

The reference files are generated from `data/matrix.json` and
`data/tokens.json`, which ship with the skill:

```bash
npm run build
```

## Attribution

frappe-ui is MIT licensed, © Frappe Technologies Pvt. Ltd. The reference files
here are generated from its published API tables and design tokens.
Upstream docs: <https://ui.frappe.io>.
