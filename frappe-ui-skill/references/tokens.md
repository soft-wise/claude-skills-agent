# frappe-ui design tokens

Generated from frappe-ui `1.0.0-rc.1`'s `tailwind/tokens/*.js`.

## The rule that matters

Write **semantic** utilities, never Tailwind's raw palette. `bg-surface-gray-2`
resolves to a different colour per theme; `bg-gray-100` is a fixed light-mode
value that never flips, so it breaks dark mode. Same for `#hex` and `dark:`
variants: the library switches themes through `data-theme` on `<html>`, so a
hard-coded colour simply will not follow.

## Semantic colour

| Family | Utilities | Steps |
|---|---|---|
| `surface` | `bg-surface-*` | `base`, `gray-1..10`, `sidebar`, `elevation-1..3`, `red-1..10`, `blue-1..10`, `green-1..10`, `amber-1..10`, `violet-1..10`, `yellow-1..10`, `orange-1..10`, `teal-1..10`, `cyan-1..10`, `purple-1..10`, `pink-1..10` |
| `surface-alpha` | `surface-alpha-*` | `base`, `gray-1..10`, `sidebar`, `elevation-1..3` |
| `ink` | `text-ink-*`, `fill-ink-*`, `placeholder-ink-*` | `base`, `gray-1..9`, `red-1..9`, `blue-1..9`, `green-1..9`, `amber-1..9`, `violet-1..9`, `yellow-1..9`, `orange-1..9`, `teal-1..9`, `cyan-1..9`, `purple-1..9`, `pink-1..9`, `blue-link` |
| `outline` | `border-outline-*`, `ring-outline-*`, `divide-outline-*` | `base`, `gray-1..9`, `red-1..10`, `blue-1..10`, `green-1..10`, `amber-1..10`, `violet-1..10`, `yellow-1..10`, `orange-1..10`, `teal-1..10`, `cyan-1..10`, `purple-1..10`, `pink-1..10`, `elevation-1..2` |
| `outline-alpha` | `outline-alpha-*` | `base`, `gray-1..9`, `elevation-1..2` |

Higher step = stronger contrast. Steps are NOT interchangeable across
families: `ink-red-5` and `surface-red-5` resolve to different ramp steps.

## Typography

Font: `Inter Variable`.

Two parallel scales share pixel sizes and differ in line height:
`text-*` for single-line labels, `text-p-*` for text that wraps.

| Token | Size | Line height | Tracking |
|---|---|---|---|
| `text-2xs` | 11px | 1.35 | 0.01em |
| `text-xs` | 12px | 1.35 | 0.02em |
| `text-sm` | 13px | 1.35 | 0.02em |
| `text-base` | 14px | 1.35 | 0.02em |
| `text-md` | 15px | 1.35 | 0.02em |
| `text-lg` | 16px | 1.35 | 0.02em |
| `text-xl` | 17px | 1.35 | 0.02em |
| `text-2xl` | 18px | 1.35 | 0.01em |
| `text-3xl` | 20px | 1.35 | 0.005em |
| `text-4xl` | 24px | 1.35 | 0.005em |
| `text-5xl` | 26px | 1.6 | 0.01em |
| `text-6xl` | 28px | 1.6 | 0.01em |
| `text-7xl` | 32px | 1.6 | 0.02em |
| `text-8xl` | 40px | 1.4 | 0em |
| `text-9xl` | 44px | 1.4 | 0em |
| `text-10xl` | 48px | 1.4 | 0em |
| `text-11xl` | 52px | 1.4 | 0em |
| `text-12xl` | 56px | 1.4 | 0.005em |

Size and weight combine into one utility, which carries tuned tracking:
`text-<size>-<weight>` and `text-p-<size>-<weight>`, where `<weight>` is
`medium` | `semibold` | `bold`. Prefer `text-lg-semibold`
over `text-lg font-semibold`.

`regular` is the bare `text-<size>`; `black` exists in the token export but
the plugin does **not** emit a utility for it, so `text-lg-black` silently
renders at the fallback size.

## Radius

| Utility | Value |
|---|---|
| `rounded-0` | 0px |
| `rounded-1` | 4px |
| `rounded-2` | 5px |
| `rounded-3` | 6px |
| `rounded-4` | 8px |
| `rounded-5` | 10px |
| `rounded-6` | 12px |
| `rounded-7` | 16px |
| `rounded-8` | 20px |
| `rounded-9` | 100px |
| `rounded-full` | 9999px |
| `rounded-none` | 0px |

Named aliases (`rounded-md`, `rounded-xl`, …) were removed in 1.0.

## Elevation

Shadows: `shadow-sm`, `shadow-base`, `shadow-md`, `shadow-lg`, `shadow-xl`, `shadow-2xl`.
Pair a shadow with a `bg-surface-elevation-*` background.

## Focus ring

A global `:focus-visible` outline covers every focusable element, so a
custom control usually needs nothing. Retheme with `focus-visible:focus-ring-<name>`:
`red`, `green`, `amber`, `blue`, `violet`.

Do not pair `focus:outline-none` with `focus-ring`: the reset wins on
equal specificity and removes the visible indicator.
