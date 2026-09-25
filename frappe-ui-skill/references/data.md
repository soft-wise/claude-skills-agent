# Data fetching

frappe-ui talks to a Frappe backend through composables, all exported from
`'frappe-ui'`. Do not hand-roll `fetch` against `/api/method/...`: the
composables handle CSRF, the response envelope, the error classes and Vue
reactivity.

Everything below is taken from the library's own docs
(`docs/content/docs/data-fetching/`) and its `types.ts`, not from memory.

## Setup

```js
import { FrappeUI, setConfig, frappeRequest } from 'frappe-ui'

app.use(FrappeUI)
setConfig('resourceFetcher', frappeRequest)
```

## Which composable

| You need | Use |
|---|---|
| one whitelisted method | `useCall` |
| a page of documents | `useList` |
| a single document, with writes | `useDoc` |
| a doctype's meta | `useDoctype` |
| a document that does not exist yet | `useNewDoc` |

Their return shapes differ. Read the table for the one you are using before
destructuring.

## useCall

```vue
<script setup>
import { useCall } from 'frappe-ui'

const ping = useCall({ url: 'frappe.ping' })

// A method you call on demand, rather than on mount:
const renameTodo = useCall({
  url: 'frappe.client.rename_doc',
  immediate: false,
})
async function rename() {
  await renameTodo.submit({ doctype: 'ToDo', old_name: 'todo-1', new_name: 'todo-2' })
}
</script>

<template>
  <Button :loading="ping.loading" @click="ping.reload()">Ping</Button>
</template>
```

`reload()` refetches. `submit(params)` sends a call with parameters and
**rejects** on failure, so wrap it in `try`/`catch`.

## useList

```js
import { useList } from 'frappe-ui'

const todos = useList({
  doctype: 'ToDo',
  fields: ['name', 'description', 'status'],
  orderBy: 'creation desc',
  limit: 20,           // NOT `pageLength`
})
```

| Member | What it does |
|---|---|
| `data` | the rows |
| `loading` | fetch in flight |
| `error` | last error |
| `hasNextPage` | another page exists |
| `next()` | fetch the next page and append to `data` |
| `reload()` | refetch |
| `setValue.submit(...)` | update a row |

Options: `doctype`, `fields`, `filters`, `orderBy`, `start`, `limit`,
`groupBy`, `parent`, `cacheKey`, `initialData`, `immediate`, `transform`,
`onSuccess`, `onError`.

Filters take a value to match or an `[operator, value]` pair, and re-fetch when
a `ref` inside them changes:

```js
const status = ref('Open')
const todos = useList({
  doctype: 'ToDo',
  filters: {
    status,
    priority: ['in', ['High', 'Urgent']],
    description: ['like', 'deploy'],
  },
})
```

Always name the `fields` you need. Fetching everything on a wide doctype is the
usual cause of a slow Frappe list.

## useDoc

```vue
<script setup>
import { useDoc } from 'frappe-ui'

const todo = useDoc({ doctype: 'ToDo', name: 'todo-1' })
</script>

<template>
  <p>{{ todo.doc?.description }}</p>
  <Button @click="todo.setValue.submit({ status: 'Closed' })">Close</Button>
</template>
```

| Member | What it does |
|---|---|
| `doc` | the document, `null` until loaded |
| `loading` | fetch in flight (also `isFetching`) |
| `error` | last fetch error |
| `reload()` | refetch; resolves even on failure, so check `error` |
| `setValue.submit(values)` | save those fields; **rejects** on failure |
| `delete.submit()` | delete the document; **rejects** on failure |
| `onSuccess(cb)` | run after each successful fetch |

Declared `methods` become members: `todo.markDone.submit()`.

Note the split: `reload()` resolves and sets `error`, while `setValue.submit()`
and `delete.submit()` reject. Catch the latter.

## useNewDoc

Takes positional arguments, not an options object.

```vue
<script setup>
import { useNewDoc } from 'frappe-ui'

const todo = useNewDoc('ToDo', { status: 'Open' })

async function save() {
  const created = await todo.submit()   // resolves with the created document
  router.push({ name: 'Todo', params: { name: created.name } })
}
</script>

<template>
  <TextInput v-model="todo.doc.description" label="Description" />
  <Button :loading="todo.loading" @click="save">Create</Button>
</template>
```

Bind form fields straight to `todo.doc.*` before the document exists.

## Errors

Render the error rather than swallowing it:

```vue
<ErrorMessage :message="todos.error?.message" />
```

or surface it:

```js
import { toast } from 'frappe-ui'
try {
  await todo.setValue.submit({ status: 'Closed' })
} catch (e) {
  toast.error(e.message)
}
```

## Loading states

Where the result's shape is known, a skeleton beats a spinner:

```vue
<div v-if="todos.loading" class="space-y-2">
  <Skeleton v-for="n in 5" :key="n" class="h-10 w-full" />
</div>
```

## The v1 resource API

`createResource`, `createListResource` and `createDocumentResource` still ship
and are supported through 1.x. Prefer the `use*` composables in new code.
