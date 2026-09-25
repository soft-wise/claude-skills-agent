# frappe-ui component API reference

Generated from frappe-ui `1.0.0-rc.1`'s own `*.api.md`
tables and `types.ts` unions. Every enum value listed here was verified to
render in a built gallery of the library.

**Read the row before you write the prop.** A value not in the `Values`
column does not exist. Slot names are per component and never universal.

## Index

| Group | Components |
|---|---|
| Base | `Alert`, `Avatar`, `Badge`, `Breadcrumbs`, `Button`, `Divider`, `Icon`, `LoadingIndicator`, `LoadingText`, `Progress`, `Rating`, `Skeleton`, `Spinner`, `Tooltip` |
| Form controls | `Checkbox`, `Combobox`, `DatePicker`, `Duration`, `ErrorMessage`, `FileUploader`, `FormControl`, `FormLabel`, `MultiSelect`, `Password`, `Radio`, `Select`, `Slider`, `Switch`, `Textarea`, `TextInput`, `TimePicker` |
| Overlays and feedback | `BottomSheet`, `ContextMenu`, `Dialog`, `Dropdown`, `HoverCard`, `Popover`, `Toast` |
| Lists and data | `ItemListRow`, `Tree` |
| Navigation and layout | `DesktopShell`, `MobileNav`, `MobileShell`, `PageHeader`, `ScrollArea`, `SettingsDialog`, `Sidebar`, `SidebarRail`, `TabButtons`, `Tabs` |
| Keyboard | `KeyboardShortcut`, `KeyboardShortcutsDialog` |
| App setup | `FrappeUIProvider` |

## Base

### Alert

Axes: `theme` = `gray` | `blue` | `green` | `amber` | `red`

| Prop | Type | Default | Values |
|---|---|---|---|
| `title` | `string` | — | — |
| `description` | `string` | — | — |
| `theme` | `StatusTheme` | `'gray'` | `gray` \| `blue` \| `green` \| `amber` \| `red` |
| `icon` | `boolean \| string \| Component` | — | — |
| `primaryAction` | `AlertAction` | — | — |
| `secondaryAction` | `AlertAction` | — | — |
| `dismissible` | `boolean` | `false` | `true` \| `false` |

Slots: `prefix`, `title`, `description`, `actions`

Emits: `dismiss`

### Avatar

Axes: `size` = `xs` | `sm` | `md` | `lg` | `xl` | `2xl` | `3xl` · `shape` = `circle` | `square` · `theme` = `gray` | `blue` | `green` | `amber` | `red` | `violet`

| Prop | Type | Default | Values |
|---|---|---|---|
| `image` | `string` | — | — |
| `label` | `string` | — | — |
| `size` | `"xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"…` | `"md"` | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl` \| `3xl` |
| `shape` | `"circle" \| "square"` | `"circle"` | `circle` \| `square` |
| `theme` | `AvatarTheme` | `"gray"` | `gray` \| `blue` \| `green` \| `amber` \| `red` \| `violet` |

Slots: `default`, `indicator`

### Badge

Axes: `theme` = `gray` | `blue` | `green` | `amber` | `red` | `violet` · `size` = `sm` | `md` | `lg` · `variant` = `solid` | `subtle` | `outline` | `ghost`

| Prop | Type | Default | Values |
|---|---|---|---|
| `theme` | `"gray" \| "blue" \| "green" \| "amber" \| "re…` | `"gray"` | `gray` \| `blue` \| `green` \| `amber` \| `red` \| `violet` |
| `size` | `"sm" \| "md" \| "lg"` | `"md"` | `sm` \| `md` \| `lg` |
| `variant` | `"solid" \| "subtle" \| "outline" \| "ghost"` | `"subtle"` | `solid` \| `subtle` \| `outline` \| `ghost` |
| `label` | `string \| number` | — | — |

Slots: `prefix`, `default`, `suffix`

### Breadcrumbs

| Prop | Type | Default | Values |
|---|---|---|---|
| `items` * | `BreadcrumbItem[]` | — | — |

Slots: `prefix`, `suffix`

### Button

Axes: `theme` = `gray` | `blue` | `green` | `red` · `size` = `xs` | `sm` | `md` | `lg` · `variant` = `solid` | `subtle` | `outline` | `ghost` · `type` = `button` | `submit` | `reset`

| Prop | Type | Default | Values |
|---|---|---|---|
| `theme` | `Theme` | `'gray'` | `gray` \| `blue` \| `green` \| `red` |
| `size` | `Size` | `'sm'` | `xs` \| `sm` \| `md` \| `lg` |
| `variant` | `Variant` | `'subtle'` | `solid` \| `subtle` \| `outline` \| `ghost` |
| `label` | `string` | — | — |
| `icon` | `string \| Component` | — | — |
| `iconLeft` | `string \| Component` | — | — |
| `iconRight` | `string \| Component` | — | — |
| `tooltip` | `string` | — | — |
| `loading` | `boolean` | `false` | `true` \| `false` |
| `loadingText` | `string` | — | — |
| `disabled` | `boolean` | `false` | `true` \| `false` |
| `route` | `RouteDestination` | — | — |
| `href` | `string` | — | — |
| `type` | `"button" \| "submit" \| "reset"` | `'button'` | `button` \| `submit` \| `reset` |

Slots: `prefix`, `icon`, `default`, `suffix`

### Divider

Axes: `orientation` = `horizontal` | `vertical` · `align` = `start` | `center` | `end`

| Prop | Type | Default | Values |
|---|---|---|---|
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | `horizontal` \| `vertical` |
| `align` | `"start" \| "center" \| "end"` | `"center"` | `start` \| `center` \| `end` |
| `flexItem` | `boolean` | — | `true` \| `false` |
| `action` | `DividerAction` | — | — |

### Icon

| Prop | Type | Default | Values |
|---|---|---|---|
| `icon` | `string \| Component \| null` | — | — |
| `name` | `string \| Component \| null` | — | — |

### LoadingText

| Prop | Type | Default | Values |
|---|---|---|---|
| `text` | `string` | `"Loading..."` | — |

### Progress

Axes: `size` = `sm` | `md` | `lg` | `xl`

| Prop | Type | Default | Values |
|---|---|---|---|
| `value` * | `number` | — | — |
| `size` | `"sm" \| "md" \| "lg" \| "xl"` | `"sm"` | `sm` \| `md` \| `lg` \| `xl` |
| `label` | `string` | `""` | — |
| `hint` | `boolean` | `false` | `true` \| `false` |
| `intervals` | `number` | — | — |

Slots: `hint`

### Rating

Axes: `size` = `xs` | `sm` | `md` | `lg`

| Prop | Type | Default | Values |
|---|---|---|---|
| `modelValue` | `number` | `0` | — |
| `max` | `number` | — | — |
| `step` | `1 \| 0.5` | `1` | — |
| `disabled` | `boolean` | `false` | `true` \| `false` |
| `icon` | `string \| Component` | `RatingStar` | — |
| `size` | `InputSize` | `"sm"` | `xs` \| `sm` \| `md` \| `lg` |
| `label` | `string` | — | — |
| `description` | `string` | — | — |
| `error` | `ErrorMessageValue` | — | — |
| `required` | `boolean` | — | `true` \| `false` |
| `id` | `string` | — | — |

Slots: `label`, `description`, `icon`

Emits: `update:modelValue`

Exposed on a template ref: `focus`

### Skeleton

### Spinner

Axes: `size` = `xs` | `sm` | `md` | `lg` · `theme` = `gray` | `red`

| Prop | Type | Default | Values |
|---|---|---|---|
| `size` | `SpinnerSize` | — | `xs` \| `sm` \| `md` \| `lg` |
| `theme` | `SpinnerTheme` | — | `gray` \| `red` |
| `track` | `boolean` | `false` | `true` \| `false` |

### Tooltip

Axes: `side` = `top` | `right` | `bottom` | `left`

| Prop | Type | Default | Values |
|---|---|---|---|
| `text` | `string` | `""` | — |
| `hoverDelay` | `number` | `500` | — |
| `side` | `TooltipSide` | `"top"` | `top` \| `right` \| `bottom` \| `left` |
| `offset` | `number` | `4` | — |
| `bare` | `boolean` | `false` | `true` \| `false` |
| `disabled` | `boolean` | `false` | `true` \| `false` |

Slots: `default`, `content`

Sub-components (same import):

- `TooltipProvider` — props `hoverDelay`, `skipDelay`, `disableHoverableContent`; slots `default`

## Form controls

### Checkbox

Axes: `size` = `xs` | `sm` | `md`

| Prop | Type | Default | Values |
|---|---|---|---|
| `size` | `ToggleSize` | `"sm"` | `xs` \| `sm` \| `md` |
| `padded` | `boolean` | `false` | `true` \| `false` |
| `disabled` | `boolean` | — | `true` \| `false` |
| `indeterminate` | `boolean` | `false` | `true` \| `false` |
| `label` | `string` | — | — |
| `description` | `string` | — | — |
| `error` | `ErrorMessageValue` | — | — |
| `required` | `boolean` | — | `true` \| `false` |
| `id` | `string` | — | — |
| `modelValue` | `boolean \| 0 \| 1` | — | — |

Slots: `label`, `description`

Emits: `update:modelValue`

Exposed on a template ref: `focus`

### Combobox

Axes: `trigger` = `input` | `button` · `variant` = `subtle` | `outline` | `ghost` · `size` = `xs` | `sm` | `md` | `lg`

| Prop | Type | Default | Values |
|---|---|---|---|
| `modelValue` | `ComboboxOptionValue \| null` | — | — |
| `options` | `ComboboxOption[]` | `[]` | — |
| `trigger` | `"input" \| "button"` | `"input"` | `input` \| `button` |
| `variant` | `InputVariant` | `"subtle"` | `subtle` \| `outline` \| `ghost` |
| `size` | `InputSize` | `"sm"` | `xs` \| `sm` \| `md` \| `lg` |
| `placeholder` | `string` | `"Select option"` | — |
| `disabled` | `boolean` | `false` | `true` \| `false` |
| `open` | `boolean` | `false` | `true` \| `false` |
| `query` | `string` | `""` | — |
| `openOnFocus` | `boolean` | `false` | `true` \| `false` |
| `openOnClick` | `boolean` | `true` | `true` \| `false` |
| `side` | `PopoverSide` | `"bottom"` | — |
| `align` | `PopoverAlign` | `"start"` | — |
| `offset` | `number` | `4` | — |
| `portalTo` | `PortalTarget` | — | — |
| `loading` | `boolean` | `false` | `true` \| `false` |
| `emptyText` | `string` | `"No results"` | — |
| `hideSearch` | `boolean` | `false` | `true` \| `false` |
| `filterable` | `boolean` | `true` | `true` \| `false` |
| `label` | `string` | — | — |
| `description` | `string` | — | — |
| `error` | `ErrorMessageValue` | — | — |
| `required` | `boolean` | — | `true` \| `false` |
| `id` | `string` | — | — |

Slots: `trigger`, `label`, `description`, `prefix`, `suffix`, `search-prefix`, `search-suffix`, `item`, `group-label`, `empty`, `footer`, `item-prefix`, `item-label`, `item-suffix`

Emits: `update:open`, `blur`, `focus`, `update:modelValue`, `update:query`, `update:selectedOption`

Exposed on a template ref: `clear`, `focus`

### DatePicker

Axes: `size` = `xs` | `sm` | `md` | `lg` · `variant` = `subtle` | `outline` | `ghost`

| Prop | Type | Default | Values |
|---|---|---|---|
| `side` | `PopoverSide` | — | — |
| `align` | `PopoverAlign` | — | — |
| `offset` | `number` | — | — |
| `format` | `string` | — | — |
| `size` | `InputSize` | — | `xs` \| `sm` \| `md` \| `lg` |
| `variant` | `InputVariant` | `"subtle"` | `subtle` \| `outline` \| `ghost` |
| `placeholder` | `string` | `"Select date"` | — |
| `open` | `boolean` | — | `true` \| `false` |
| `openOnFocus` | `boolean` | `false` | `true` \| `false` |
| `openOnClick` | `boolean` | `true` | `true` \| `false` |
| `typeable` | `boolean` | `true` | `true` \| `false` |
| `disabled` | `boolean` | `false` | `true` \| `false` |
| `clearable` | `boolean` | `true` | `true` \| `false` |
| `keepOpen` | `boolean` | — | `true` \| `false` |
| `min` | `string` | — | — |
| `max` | `string` | — | — |
| `isDateUnavailable` | `((date: Dayjs) => boolean)` | — | — |
| `modelValue` | `string` | `""` | — |
| `label` | `string` | — | — |
| `description` | `string` | — | — |
| `error` | `ErrorMessageValue` | — | — |
| `required` | `boolean` | — | `true` \| `false` |
| `id` | `string` | — | — |

Slots: `trigger`, `prefix`, `suffix`, `actions`

Emits: `update:open`, `change`, `update:modelValue`

Exposed on a template ref: `open`, `close`, `focus`

Sub-components (same import):

- `DateRangePicker` — props `side`, `align`, `offset`, `format`, `size`, `variant`, `placeholder`, `open`, `openOnFocus`, `openOnClick`, `typeable`, `disabled`, `clearable`, `keepOpen`, `min`, `max`, `isDateUnavailable`, `modelValue`, `dualPane`, `label`, `description`, `error`, `required`, `id`; slots `trigger`, `prefix`, `suffix`, `actions`
- `DateTimePicker` — props `side`, `align`, `offset`, `format`, `size`, `variant`, `placeholder`, `open`, `openOnFocus`, `openOnClick`, `typeable`, `disabled`, `clearable`, `keepOpen`, `min`, `max`, `isDateUnavailable`, `modelValue`, `label`, `description`, `error`, `required`, `id`; slots `trigger`, `prefix`, `suffix`, `actions`

### Duration

Axes: `size` = `xs` | `sm` | `md` | `lg` · `variant` = `subtle` | `outline` | `ghost`

| Prop | Type | Default | Values |
|---|---|---|---|
| `modelValue` | `number \| null` | `null` | — |
| `placeholder` | `string` | `"1h 30m 45s"` | — |
| `format` | `DurationFormat` | `"short"` | — |
| `size` | `InputSize` | — | `xs` \| `sm` \| `md` \| `lg` |
| `variant` | `InputVariant` | — | `subtle` \| `outline` \| `ghost` |
| `disabled` | `boolean` | — | `true` \| `false` |
| `label` | `string` | — | — |
| `description` | `string` | — | — |
| `error` | `ErrorMessageValue` | — | — |
| `required` | `boolean` | — | `true` \| `false` |
| `id` | `string` | — | — |

Slots: `label`, `description`

Emits: `update:modelValue`

Exposed on a template ref: `focus`

### ErrorMessage

| Prop | Type | Default | Values |
|---|---|---|---|
| `message` | `ErrorMessageValue` | — | — |

### FileUploader

| Prop | Type | Default | Values |
|---|---|---|---|
| `fileTypes` | `string \| string[]` | — | — |
| `private` | `boolean` | `true` | `true` \| `false` |
| `folder` | `string` | — | — |
| `doctype` | `string` | — | — |
| `docname` | `string` | — | — |
| `fieldname` | `string` | — | — |
| `uploadEndpoint` | `string` | — | — |
| `optimize` | `boolean` | — | `true` \| `false` |
| `validateFile` | `((file: File) => FileUploaderValidationResult…` | — | — |

Slots: `default`

Emits: `success`, `failure`

### FormControl

Axes: `size` = `xs` | `sm` | `md` | `lg` · `variant` = `subtle` | `outline`

| Prop | Type | Default | Values |
|---|---|---|---|
| `label` | `string` | — | — |
| `description` | `string` | — | — |
| `error` | `ErrorMessageValue` | — | — |
| `type` | `TextInputTypes \| "textarea" \| "select" \| "…` | `"text"` | — |
| `size` | `InputSize` | `"sm"` | `xs` \| `sm` \| `md` \| `lg` |
| `variant` | `"subtle" \| "outline"` | `"subtle"` | `subtle` \| `outline` |
| `required` | `boolean` | — | `true` \| `false` |

Slots: `prefix`, `suffix`, `description`, `label`, `item-prefix`, `default`

Exposed on a template ref: `focus`

### FormLabel

| Prop | Type | Default | Values |
|---|---|---|---|
| `label` * | `string` | — | — |
| `id` | `string` | — | — |
| `required` | `boolean` | — | `true` \| `false` |

### MultiSelect

Axes: `variant` = `subtle` | `outline` | `ghost` · `size` = `xs` | `sm` | `md` | `lg`

| Prop | Type | Default | Values |
|---|---|---|---|
| `modelValue` | `(string \| number)[]` | `[]` | — |
| `options` | `MultiSelectOptions` | `[]` | — |
| `variant` | `InputVariant` | `"subtle"` | `subtle` \| `outline` \| `ghost` |
| `size` | `InputSize` | `"sm"` | `xs` \| `sm` \| `md` \| `lg` |
| `placeholder` | `string` | `"Select option"` | — |
| `disabled` | `boolean` | `false` | `true` \| `false` |
| `open` | `boolean` | `false` | `true` \| `false` |
| `query` | `string` | `""` | — |
| `hideSearch` | `boolean` | `false` | `true` \| `false` |
| `loading` | `boolean` | `false` | `true` \| `false` |
| `filterable` | `boolean` | `true` | `true` \| `false` |
| `emptyText` | `string` | `"No results"` | — |
| `side` | `PopoverSide` | `"bottom"` | — |
| `align` | `PopoverAlign` | `"start"` | — |
| `offset` | `number` | `4` | — |
| `portalTo` | `PortalTarget` | — | — |
| `label` | `string` | — | — |
| `description` | `string` | — | — |
| `error` | `ErrorMessageValue` | — | — |
| `required` | `boolean` | — | `true` \| `false` |
| `id` | `string` | — | — |

Slots: `trigger`, `prefix`, `summary`, `suffix`, `label`, `description`, `search-prefix`, `search-suffix`, `group-label`, `empty`, `footer`, `item`, `item-prefix`, `item-label`, `item-suffix`

Emits: `update:open`, `update:modelValue`, `update:query`, `update:selectedOptions`

Exposed on a template ref: `clear`, `focus`

### Password

Axes: `size` = `xs` | `sm` | `md` | `lg` · `variant` = `subtle` | `outline` | `ghost`

| Prop | Type | Default | Values |
|---|---|---|---|
| `size` | `InputSize` | `"sm"` | `xs` \| `sm` \| `md` \| `lg` |
| `variant` | `InputVariant` | `"subtle"` | `subtle` \| `outline` \| `ghost` |
| `placeholder` | `string` | — | — |
| `disabled` | `boolean` | — | `true` \| `false` |
| `label` | `string` | — | — |
| `description` | `string` | — | — |
| `error` | `ErrorMessageValue` | — | — |
| `required` | `boolean` | — | `true` \| `false` |
| `id` | `string` | — | — |
| `modelValue` | `string` | — | — |

Slots: `prefix`, `label`, `description`

Emits: `update:modelValue`

Exposed on a template ref: `inputElement`, `focus`

### Radio

| Prop | Type | Default | Values |
|---|---|---|---|
| `value` * | `RadioValue` | — | — |
| `disabled` | `boolean` | `false` | `true` \| `false` |
| `label` | `string` | — | — |
| `description` | `string` | — | — |
| `id` | `string` | — | — |

Slots: `label`, `description`

Sub-components (same import):

- `RadioGroup` — props `modelValue`, `size`, `padded`, `disabled`, `orientation`, `loop`, `name`, `label`, `description`, `error`, `required`, `id`; slots `default`, `label`, `description`

### Select

Axes: `size` = `xs` | `sm` | `md` | `lg` · `variant` = `subtle` | `outline` | `ghost`

| Prop | Type | Default | Values |
|---|---|---|---|
| `size` | `InputSize` | `"sm"` | `xs` \| `sm` \| `md` \| `lg` |
| `variant` | `InputVariant` | `"subtle"` | `subtle` \| `outline` \| `ghost` |
| `placeholder` | `string` | `"Select option"` | — |
| `disabled` | `boolean` | — | `true` \| `false` |
| `modelValue` | `SelectOptionValue \| null` | — | — |
| `open` | `boolean` | `false` | `true` \| `false` |
| `options` | `SelectOption[]` | `[]` | — |
| `emptyText` | `string` | `"No options"` | — |
| `side` | `PopoverSide` | — | — |
| `align` | `PopoverAlign` | — | — |
| `offset` | `number` | — | — |
| `portalTo` | `PortalTarget` | — | — |
| `label` | `string` | — | — |
| `description` | `string` | — | — |
| `error` | `ErrorMessageValue` | — | — |
| `required` | `boolean` | — | `true` \| `false` |
| `id` | `string` | — | — |

Slots: `trigger`, `label`, `description`, `prefix`, `suffix`, `item`, `empty`, `footer`, `item-prefix`, `item-label`, `item-suffix`

Emits: `update:open`, `update:modelValue`

Exposed on a template ref: `clear`, `focus`

### Slider

Axes: `size` = `sm` | `md`

| Prop | Type | Default | Values |
|---|---|---|---|
| `step` | `number` | `1` | — |
| `max` | `number` | `100` | — |
| `min` | `number` | `0` | — |
| `size` | `RangeSize` | `"sm"` | `sm` \| `md` |
| `disabled` | `boolean` | `false` | `true` \| `false` |
| `label` | `string` | — | — |
| `description` | `string` | — | — |
| `error` | `ErrorMessageValue` | — | — |
| `required` | `boolean` | — | `true` \| `false` |
| `id` | `string` | — | — |
| `modelValue` | `SliderValue` | — | — |

Slots: `label`, `description`

Emits: `update:modelValue`, `value-commit`

Exposed on a template ref: `focus`

### Switch

Axes: `size` = `xs` | `sm` | `md` · `controlPosition` = `start` | `end`

| Prop | Type | Default | Values |
|---|---|---|---|
| `size` | `ToggleSize` | `"sm"` | `xs` \| `sm` \| `md` |
| `padded` | `boolean` | `false` | `true` \| `false` |
| `controlPosition` | `"start" \| "end"` | — | `start` \| `end` |
| `disabled` | `boolean` | `false` | `true` \| `false` |
| `icon` | `string \| Component` | — | — |
| `label` | `string` | — | — |
| `description` | `string` | — | — |
| `error` | `ErrorMessageValue` | — | — |
| `required` | `boolean` | — | `true` \| `false` |
| `id` | `string` | — | — |
| `modelValue` | `boolean` | `false` | `true` \| `false` |

Slots: `label`, `description`

Emits: `update:modelValue`

Exposed on a template ref: `focus`

### Textarea

Axes: `size` = `xs` | `sm` | `md` | `lg` · `variant` = `subtle` | `outline` | `ghost`

| Prop | Type | Default | Values |
|---|---|---|---|
| `size` | `InputSize` | `"sm"` | `xs` \| `sm` \| `md` \| `lg` |
| `variant` | `InputVariant` | `"subtle"` | `subtle` \| `outline` \| `ghost` |
| `placeholder` | `string` | — | — |
| `disabled` | `boolean` | — | `true` \| `false` |
| `modelValue` | `string` | — | — |
| `debounce` | `number` | — | — |
| `rows` | `number` | `3` | — |
| `label` | `string` | — | — |
| `description` | `string` | — | — |
| `error` | `ErrorMessageValue` | — | — |
| `required` | `boolean` | — | `true` \| `false` |
| `id` | `string` | — | — |

Slots: `label`, `description`

Emits: `update:modelValue`

Exposed on a template ref: `inputElement`, `focus`

### TextInput

Axes: `size` = `xs` | `sm` | `md` | `lg` · `variant` = `subtle` | `outline` | `ghost`

| Prop | Type | Default | Values |
|---|---|---|---|
| `type` | `TextInputTypes` | `"text"` | — |
| `size` | `InputSize` | `"sm"` | `xs` \| `sm` \| `md` \| `lg` |
| `variant` | `InputVariant` | `"subtle"` | `subtle` \| `outline` \| `ghost` |
| `placeholder` | `string` | — | — |
| `disabled` | `boolean` | — | `true` \| `false` |
| `modelValue` | `string \| number` | — | — |
| `debounce` | `number` | — | — |
| `label` | `string` | — | — |
| `description` | `string` | — | — |
| `error` | `ErrorMessageValue` | — | — |
| `required` | `boolean` | — | `true` \| `false` |
| `id` | `string` | — | — |

Slots: `prefix`, `suffix`, `label`, `description`

Emits: `update:modelValue`

Exposed on a template ref: `inputElement`, `focus`

### TimePicker

Axes: `side` = `top` | `right` | `bottom` | `left` · `align` = `start` | `center` | `end` · `variant` = `subtle` | `outline` | `ghost` · `size` = `xs` | `sm` | `md` | `lg`

| Prop | Type | Default | Values |
|---|---|---|---|
| `modelValue` | `string` | `""` | — |
| `interval` | `number` | `15` | — |
| `options` | `{ value: string; label?: string; }[]` | `[]` | — |
| `side` | `PopoverSide` | — | `top` \| `right` \| `bottom` \| `left` |
| `align` | `PopoverAlign` | — | `start` \| `center` \| `end` |
| `offset` | `number` | — | — |
| `placeholder` | `string` | `"Select time"` | — |
| `variant` | `InputVariant` | `"subtle" as Variant` | `subtle` \| `outline` \| `ghost` |
| `size` | `InputSize` | — | `xs` \| `sm` \| `md` \| `lg` |
| `typeable` | `boolean` | `true` | `true` \| `false` |
| `keepOpen` | `boolean` | — | `true` \| `false` |
| `format` | `string` | — | — |
| `disabled` | `boolean` | `false` | `true` \| `false` |
| `open` | `boolean` | — | `true` \| `false` |
| `openOnFocus` | `boolean` | `false` | `true` \| `false` |
| `openOnClick` | `boolean` | `true` | `true` \| `false` |
| `min` | `string` | — | — |
| `max` | `string` | — | — |
| `label` | `string` | — | — |
| `description` | `string` | — | — |
| `error` | `ErrorMessageValue` | — | — |
| `required` | `boolean` | — | `true` \| `false` |
| `id` | `string` | — | — |

Slots: `label`, `description`, `prefix`, `suffix`

Emits: `update:open`, `change`, `update:modelValue`

Exposed on a template ref: `open`, `close`, `focus`

## Overlays and feedback

### BottomSheet

| Prop | Type | Default | Values |
|---|---|---|---|
| `open` | `boolean` | — | `true` \| `false` |
| `title` | `string` | — | — |
| `dismissible` | `boolean` | `true` | `true` \| `false` |

Slots: `default`

Emits: `update:open`, `after-leave`

### ContextMenu

| Prop | Type | Default | Values |
|---|---|---|---|
| `options` | `MenuOptions` | `[]` | — |
| `open` | `boolean` | `false` | `true` \| `false` |
| `portalTo` | `PortalTarget` | — | — |

Slots: `item`, `item-prefix`, `item-label`, `item-suffix`, `group-label`, `empty`, `default`, `trigger`

Emits: `update:open`

### Dialog

Axes: `theme` = `amber` | `blue` | `red` | `green` · `size` = `xs` | `sm` | `md` | `lg` | `xl` | `2xl` | `3xl` | `4xl` | `5xl` | `6xl` | `7xl` · `position` = `center` | `top`

| Prop | Type | Default | Values |
|---|---|---|---|
| `open` | `boolean` | — | `true` \| `false` |
| `modelValue` | `boolean` | — | `true` \| `false` |
| `title` | `string` | — | — |
| `message` | `string` | — | — |
| `icon` | `string \| Component` | — | — |
| `theme` | `DialogTheme` | — | `amber` \| `blue` \| `red` \| `green` |
| `size` | `DialogSize` | `"lg"` | `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl` \| `3xl` \| `4xl` \| `5xl` \| `6xl` \| `7xl` |
| `position` | `DialogPosition` | `"center"` | `center` \| `top` |
| `paddingTop` | `string \| number` | — | — |
| `actions` | `DialogAction[]` | — | — |
| `dismissible` | `boolean` | `true` | `true` \| `false` |
| `showCloseButton` | `boolean` | `true` | `true` \| `false` |
| `bare` | `boolean` | `false` | `true` \| `false` |

Slots: `default`, `title`, `actions`

Emits: `update:open`, `after-leave`, `close`, `update:modelValue`

### Dropdown

Axes: `align` = `start` | `center` | `end` · `side` = `top` | `right` | `bottom` | `left`

| Prop | Type | Default | Values |
|---|---|---|---|
| `button` | `ButtonProps` | — | — |
| `options` | `MenuOptions` | `[]` | — |
| `open` | `boolean` | `false` | `true` \| `false` |
| `align` | `DropdownAlign` | `"start"` | `start` \| `center` \| `end` |
| `side` | `DropdownSide` | `"bottom"` | `top` \| `right` \| `bottom` \| `left` |
| `offset` | `number` | `4` | — |
| `matchTriggerWidth` | `boolean` | — | `true` \| `false` |
| `portalTo` | `PortalTarget` | — | — |

Slots: `item`, `item-prefix`, `item-label`, `item-suffix`, `group-label`, `empty`, `default`, `trigger`

Emits: `update:open`

### HoverCard

| Prop | Type | Default | Values |
|---|---|---|---|
| `side` | `PopoverSide` | `"bottom"` | — |
| `align` | `PopoverAlign` | `"start"` | — |
| `offset` | `number` | `4` | — |
| `portalTo` | `PortalTarget` | — | — |
| `collisionPadding` | `number` | `10` | — |
| `hoverDelay` | `number` | `300` | — |
| `leaveDelay` | `number` | `300` | — |
| `arrow` | `boolean` | `false` | `true` \| `false` |
| `open` | `boolean` | `false` | `true` \| `false` |

Slots: `trigger`, `default`

Emits: `update:open`

Exposed on a template ref: `open`, `close`

### Popover

Axes: `side` = `top` | `right` | `bottom` | `left` · `align` = `start` | `center` | `end` · `trigger` = `click` | `manual`

| Prop | Type | Default | Values |
|---|---|---|---|
| `open` | `boolean` | — | `true` \| `false` |
| `side` | `PopoverSide` | `"bottom"` | `top` \| `right` \| `bottom` \| `left` |
| `align` | `PopoverAlign` | `"start"` | `start` \| `center` \| `end` |
| `offset` | `number` | `4` | — |
| `portalTo` | `PortalTarget` | — | — |
| `collisionPadding` | `number` | `10` | — |
| `dismissible` | `boolean` | `true` | `true` \| `false` |
| `autoFocus` | `boolean` | `true` | `true` \| `false` |
| `trigger` | `"click" \| "manual"` | `"click"` | `click` \| `manual` |
| `reference` | `Element` | — | — |
| `matchTriggerWidth` | `boolean` | `false` | `true` \| `false` |
| `bare` | `boolean` | `false` | `true` \| `false` |
| `arrow` | `boolean` | `false` | `true` \| `false` |

Slots: `trigger`, `default`

Emits: `open`, `update:open`, `close`

Exposed on a template ref: `open`, `close`, `contentEl`

## Lists and data

### ItemListRow

Axes: `size` = `xs` | `sm` | `md` | `lg`

| Prop | Type | Default | Values |
|---|---|---|---|
| `as` | `string \| Component` | `"div"` | — |
| `size` | `InputSize` | `"sm"` | `xs` \| `sm` \| `md` \| `lg` |
| `active` | `boolean` | `false` | `true` \| `false` |
| `selected` | `boolean` | `false` | `true` \| `false` |
| `disabled` | `boolean` | `false` | `true` \| `false` |

Slots: `default`, `prefix`, `label`, `suffix`

### Tree

Axes: `guides` = `connectors` | `lines` | `none`

| Prop | Type | Default | Values |
|---|---|---|---|
| `nodes` * | `TreeNode[]` | — | — |
| `nodeKey` | `string` | `"key"` | — |
| `draggable` | `boolean` | `false` | `true` \| `false` |
| `move` | `((ctx: MoveContext) => boolean)` | — | — |
| `guides` | `"connectors" \| "lines" \| "none"` | `"connectors"` | `connectors` \| `lines` \| `none` |
| `disabled` | `boolean` | `false` | `true` \| `false` |
| `expanded` | `TreeKey[]` | `[]` | — |

Slots: `item`, `item-prefix`, `item-label`, `item-suffix`, `empty`

Emits: `update:expanded`, `drag-start`, `drag-end`

Exposed on a template ref: `expand`, `collapse`, `toggle`, `expandAll`, `collapseAll`

## Navigation and layout

### DesktopShell

| Prop | Type | Default | Values |
|---|---|---|---|
| `scroll` | `boolean` | `true` | `true` \| `false` |

Slots: `rail`, `sidebar`, `default`

### MobileShell

Slots: `default`, `nav`

Sub-components (same import):

- `MobileNav` — slots `default`
- `MobileNavItem` — props `label`, `icon`, `route`, `href`, `active`; slots `default`

### PageHeader

Slots: `default`

Sub-components (same import):

- `PageHeaderBase` — slots `default`
- `PageHeaderTitle` — props `title`; slots `default`
- `PageHeaderMobile` — props `title`; slots `prefix`, `default`, `suffix`
- `PageHeaderMobileTitle` — props `title`; slots `prefix`, `default`
- `PageHeaderBackButton` — props `fallbackRoute`, `label`

### ScrollArea

Axes: `orientation` = `vertical` | `horizontal` | `both`

| Prop | Type | Default | Values |
|---|---|---|---|
| `orientation` | `"vertical" \| "horizontal" \| "both"` | `"vertical"` | `vertical` \| `horizontal` \| `both` |
| `scrollHideDelay` | `number` | `600` | — |
| `viewportClass` | `string` | — | — |

Slots: `default`

Exposed on a template ref: `viewportElement`

### SettingsDialog

| Prop | Type | Default | Values |
|---|---|---|---|
| `size` | `DialogSize` | `"4xl"` | — |
| `keyboardShortcut` | `KeyboardShortcutKey \| "Shift+P" \| "Shift+B"…` | `"Mod+Shift+,"` | — |
| `unmountOnHide` | `boolean` | `true` | `true` \| `false` |
| `open` | `boolean` | `false` | `true` \| `false` |
| `tab` | `string \| number` | — | — |

Slots: `title`, `description`, `default`

Emits: `update:open`, `update:tab`

Sub-components (same import):

- `SettingsSidebar` — slots `default`
- `SettingsNavGroup` — props `label`; slots `label`, `default`
- `SettingsNavItem` — props `value`; slots `default`, `prefix`, `suffix`
- `SettingsContent` — slots `default`
- `SettingsPanel` — props `value`; slots `default`
- `SettingsHeader` — props `title`, `description`; slots `default`, `actions`
- `SettingsBody` — slots `default`
- `SettingsRow` — props `title`, `description`, `labelFor`; slots `default`

### Sidebar

| Prop | Type | Default | Values |
|---|---|---|---|
| `collapsible` | `boolean` | `true` | `true` \| `false` |
| `width` | `string` | `"15rem"` | — |
| `collapsedWidth` | `string` | `"3rem"` | — |
| `ariaLabel` | `string` | `"Main"` | — |
| `collapsed` | `boolean \| null` | `null` | — |

Slots: `default`

Emits: `update:collapsed`

Sub-components (same import):

- `SidebarItem` — props `label`, `accessKey`, `icon`, `suffix`, `route`, `href`, `active`, `onClick`; slots `prefix`, `default`, `suffix`
- `SidebarLabel` — props `divider`; slots `default`
- `SidebarHeader` — props `title`, `subtitle`, `logo`, `showLogo`, `menuItems`; slots `prefix`
- `SidebarSection` — props `label`, `collapsible`, `collapsed`; slots `default`
- `SidebarCard` — props `title`, `description`, `theme`, `icon`, `action`, `dismissible`; slots `prefix`, `title`, `description`, `actions`

### SidebarRail

Slots: `default`

Sub-components (same import):

- `SidebarRailItem` — props `label`, `description`, `icon`, `route`, `href`, `active`, `badge`, `badgeStyle`, `variant`; slots `default`

### TabButtons

| Prop | Type | Default | Values |
|---|---|---|---|
| `options` | `TabButton[]` | — | — |
| `modelValue` | `TabValue` | — | — |
| `variant` | `TabsVariant` | `"subtle"` | — |
| `size` | `TabsSize` | `"sm"` | — |
| `vertical` | `boolean` | `false` | `true` \| `false` |
| `edge` | `TabsEdge` | `"start"` | — |
| `fluid` | `boolean` | `false` | `true` \| `false` |

Slots: `prefix`, `suffix`

Emits: `update:modelValue`

Exposed on a template ref: `focus`

### Tabs

Axes: `dir` = `ltr` | `rtl` · `variant` = `underline` | `subtle` | `ghost` | `browser-tab` · `size` = `sm` | `md` · `edge` = `start` | `end`

| Prop | Type | Default | Values |
|---|---|---|---|
| `modelValue` | `TabValue` | — | — |
| `vertical` | `boolean` | `false` | `true` \| `false` |
| `dir` | `"ltr" \| "rtl"` | — | `ltr` \| `rtl` |
| `tabs` | `TabItem[]` | — | — |
| `variant` | `TabsVariant` | `"underline"` | `underline` \| `subtle` \| `ghost` \| `browser-tab` |
| `size` | `TabsSize` | `"sm"` | `sm` \| `md` |
| `edge` | `TabsEdge` | — | `start` \| `end` |

Slots: `default`, `tab-prefix`, `tab-label`, `tab-suffix`, `tab-panel`

Emits: `update:modelValue`

Sub-components (same import):

- `TabList` — props `variant`, `size`, `edge`; slots `default`
- `TabTrigger` — props `value`, `label`, `icon`, `iconLeft`, `disabled`, `route`; slots `prefix`, `default`, `suffix`
- `TabPanel` — props `value`; slots `default`

## Keyboard

### KeyboardShortcut

| Prop | Type | Default | Values |
|---|---|---|---|
| `bg` | `boolean` | — | `true` \| `false` |
| `combo` | `string` | — | — |
| `showPlus` | `boolean \| "auto"` | `"auto"` | — |
| `altCombos` | `string[]` | `[]` | — |
| `useIcons` | `boolean` | `true` | `true` \| `false` |

Slots: `default`

### KeyboardShortcutsDialog

| Prop | Type | Default | Values |
|---|---|---|---|
| `title` | `string` | `"Keyboard Shortcuts"` | — |
| `paddingTop` | `string \| number` | `"5vh"` | — |
| `searchThreshold` | `number` | `20` | — |
| `open` | `boolean` | `false` | `true` \| `false` |

Slots: `default`

Emits: `update:open`

## App setup

### FrappeUIProvider

Slots: `default`
