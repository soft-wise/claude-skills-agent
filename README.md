# claude-skills-agent

Agent skills for Claude Code, Claude.ai, and any agent that can read a folder
of Markdown and run Node scripts.

## Skills

| Skill | What it does |
|---|---|
| [`frappe-ui-skill`](./frappe-ui-skill) | Build Vue 3 UIs with [frappe-ui](https://github.com/frappe/frappe-ui): 50 components with verified prop/slot/enum tables, semantic design tokens, data-fetching composables, and a markup auditor that catches invented props and theme-breaking colours. |

## Installing a skill

**Claude Code**

```bash
# project-local
mkdir -p .claude/skills && cp -r <skill-name> .claude/skills/

# or user-wide
mkdir -p ~/.claude/skills && cp -r <skill-name> ~/.claude/skills/
```

**Claude.ai** — zip the skill folder and upload it under
Settings → Capabilities → Skills.

**Any other agent** — point it at the skill's `SKILL.md`. The references are
plain Markdown and the scripts are dependency-free Node.

## What makes a skill here

Each skill in this repo aims to be more than a document:

- **Generated references, not recalled ones.** Where an upstream library
  publishes machine-readable API data, the reference is built from it, so a
  value that is not in the table does not exist.
- **An executable check.** A skill should be able to verify the work it
  produced, not just describe how to do it.
- **Honest limits.** Anything the skill cannot verify is written down rather
  than glossed over.
