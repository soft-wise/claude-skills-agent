# Setup

Taken from the library's own `docs/content/docs/getting-started/`.

## Fastest path

```bash
npm create frappe-ui@latest
```

That wires the Vite plugin, the Tailwind preset and the content paths for you.
The rest of this file is what it sets up, for when you are adding frappe-ui to
an existing project.

## Vite

```ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import frappeui from 'frappe-ui/vite'

export default defineConfig({
  plugins: [
    // Inside a Frappe app, drop the three flags.
    frappeui({ frappeProxy: false, jinjaBootData: false, buildConfig: false }),
    vue(),
  ],
})
```

**The plugin is required even with no Frappe server.** Without it the dev
server loads two copies of the code behind `toast()`, so `toast()` silently
shows nothing in development while the production build works. That asymmetry
makes it an expensive thing to debug.

Add `lucideIcons: true` only if your own code imports from `~icons/lucide/*`.
frappe-ui's own icons are CSS classes and need nothing.

## Tailwind

frappe-ui ships a **Tailwind v3** preset. It does not work with v4.

```js
import preset, { content } from 'frappe-ui/tailwind'

/** @type {import('tailwindcss').Config} */
export default {
  presets: [preset],
  content: [...content, './index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
}
```

Spreading `content` matters: Tailwind v3 ignores a preset's own content paths,
so without it the library's classes are never generated and components render
unstyled.

The preset enables dark mode via `data-theme="dark"` and adds the forms,
typography and Lucide icon plugins.

### Five theme sections are REPLACED, not extended

Stock Tailwind classes in these families compile to **nothing, with no error**.
This is the most common source of "my class does nothing" in a frappe-ui app.

| Section | You get | You lose |
|---|---|---|
| `colors` | `ink-*`, `surface-*`, `outline-*` | `slate`, `sky`, and the rest of the palette |
| `fontSize` | frappe-ui's scale, same names | Tailwind's sizes and line heights |
| `screens` | `sm` 640, `md` 768, `lg` 1024, `xl` 1280 | `2xl:` |
| `borderRadius` | numbered: `rounded-4`, `rounded-9` | `rounded-sm` … `rounded-3xl` |
| `boxShadow` | elevation: `shadow-sm` … `shadow-2xl` | `shadow-inner` |

Everything else, spacing included, is extended and still works.

### Spacing

Every whole step `1`–`128` and every half step `0.5`–`19.5`, at `0.25rem`.
Stock Tailwind skips values above `12` such as `13`, `15`, `17`; here `h-17`,
`w-17`, `min-w-40` and `size-3.5` all work.

## Mounting the app

```js
import { createApp } from 'vue'
import { FrappeUI } from 'frappe-ui'
import 'frappe-ui/src/style.css'
import App from './App.vue'

createApp(App).use(FrappeUI).mount('#app')
```

Wrap the tree in `FrappeUIProvider`, and mount `ToastProvider` and `Dialogs`
once if you use the imperative `toast()` and `dialog.*` APIs.

## What needs a Frappe server

Only the data layer: `useCall`, `useList`, `useDoc`, `useDoctype`, `useNewDoc`,
`createResource`, `call` and `frappeRequest`. Every component, chart, the
editor, lists and icons work standalone.

`FileUploader` posts to `/api/method/upload_file` by default; point it
elsewhere with its `uploadEndpoint` prop.

## Talking to a Frappe site on another domain

```ts
import { setConfig } from 'frappe-ui'
setConfig('requestBaseUrl', 'https://my-site.frappe.cloud')
```

Requests then use the visitor's session on that site, and the site must send
`Access-Control-Allow-Credentials: true` for your origin.

**Never put an API key and secret in frontend code.** Anyone can read them in
the browser and act with that user's permissions. If the app must call as one
fixed user, make those calls from a server you control.
