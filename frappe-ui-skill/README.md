# frappe-ui-skill

An agent skill for building Vue 3 UIs with
[frappe-ui](https://github.com/frappe/frappe-ui) — the component library behind
Frappe Cloud, Gameplan, CRM, Helpdesk, Drive and Insights.

Works with Claude Code, Claude.ai, and any agent that can read a folder of
Markdown and run Node scripts.

## What it gives an agent

| | |
|---|---|
| `SKILL.md` | the contract: eight rules, a component chooser, and the traps |
| `references/components.md` | **50 components, 371 props, 150 slots, 60 enum axes** |
| `references/tokens.md` | semantic colour, type, radius, elevation, focus |
| `references/data.md` | `useCall` / `useList` / `useDoc` / `useNewDoc` |
| `references/setup.md` | Vite plugin, Tailwind preset, and what it replaces |
| `scripts/audit-markup.mjs` | checks written markup against the reference |

## Why the references are trustworthy

They are **generated**, not written from memory.

`components.md` comes from frappe-ui's own auto-generated `*.api.md` tables and
the string unions in each component's `types.ts`. That data was then verified
against a built gallery of the whole library: every documented enum value was
confirmed to reach the rendered DOM, and 182 sub-component rows were diffed
against source with zero mismatches.

`tokens.md` comes from `tailwind/tokens/*.js`, which frappe-ui itself generates
from its design file.

So if a prop is not in the table, it does not exist.

## Install

**Claude Code** — copy into your skills directory:

```bash
# project-local
mkdir -p .claude/skills && cp -r frappe-ui-skill .claude/skills/

# or user-wide
mkdir -p ~/.claude/skills && cp -r frappe-ui-skill ~/.claude/skills/
```

**Claude.ai** — zip `frappe-ui-skill/` and upload it under Settings → Capabilities → Skills.

**Any other agent** — point it at `SKILL.md`; the reference files are plain
Markdown and the scripts are dependency-free Node.

## The audit script

The reason this is a skill and not a document: it can check its own output.

```bash
node scripts/audit-markup.mjs src/                 # a directory
node scripts/audit-markup.mjs src/pages/Task.vue   # one file
```

It catches the two failures a passing build does not:

- **an invented prop or enum value**, which silently renders the default
- **a raw Tailwind colour**, which looks right until the theme flips

```
$ node scripts/audit-markup.mjs src/pages/Task.vue
audited 1 file(s) against 50 components

raw-palette (1):
  src/pages/Task.vue:8  bg-gray-100 does not follow the theme

unknown-value (2):
  src/pages/Task.vue:9   <Button> theme="purple" — allowed: gray, blue, green, red
  src/pages/Task.vue:12  <Badge> size="xxl" — allowed: sm, md, lg

unknown-prop (1):
  src/pages/Task.vue:11  <Button> has no prop `colour`
```

Exit code is non-zero when anything is found, so it drops into CI.

It understands Vue's real syntax: dynamic arguments (`:[key]="v"`), kebab and
camel prop names, entity-escaped code samples, and dispatcher components like
`FormControl` that forward unknown attributes on purpose. Run against 51
real-world component files it reports no false positives.

## Regenerating

The skill ships the source data it was generated from, so it rebuilds itself
with no external input:

```bash
cd frappe-ui-skill && npm run build
```

To track a newer frappe-ui, regenerate `data/matrix.json` and `data/tokens.json`
from that version's `*.api.md` tables and `tailwind/tokens/*.js`, then run the
same command.

## Licence

MIT, matching frappe-ui. The reference content is generated from frappe-ui's
published API tables and design tokens, © Frappe Technologies Pvt. Ltd.
Upstream docs: <https://ui.frappe.io>.
