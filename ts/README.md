# Openwhyd TypeScript SDK



The TypeScript SDK for the Openwhyd API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Authentication()` — each with a small set of operations (`list`, `load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to npm. Install it from the GitHub
release tag (`ts/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/openwhyd-sdk/releases](https://github.com/voxgig-sdk/openwhyd-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { OpenwhydSDK } from '@voxgig-sdk/openwhyd'

const client = new OpenwhydSDK({
  apikey: process.env.OPENWHYD_APIKEY,
})
```

### 3. Load an authentication

`load()` returns the entity directly and throws on failure:

```ts
try {
  const authentication = await client.Authentication().load()
  console.log(authentication)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Authentication
const created = await client.Authentication().create({
  error: 'example_error',
  ok: 'example_ok',
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const authentication = await client.Authentication().load()
  console.log(authentication)
} catch (err) {
  console.error('load failed:', err)
}
```

The low-level `direct()` method does **not** throw — it returns the
value or an `Error`, so check the result before using it:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example_id' },
})

if (result instanceof Error) {
  throw result
}
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})

if (result instanceof Error) {
  throw result
}
if (result.ok) {
  console.log(result.status)  // 200
  console.log(result.data)    // response body
}
```

### Prepare a request without sending it

```ts
const fetchdef = await client.prepare({
  path: '/api/resource/{id}',
  method: 'DELETE',
  params: { id: 'example' },
})

// Inspect before sending
console.log(fetchdef.url)
console.log(fetchdef.method)
console.log(fetchdef.headers)
```

### Use test mode

Create a mock client for unit testing — no server required:

```ts
const client = OpenwhydSDK.test()

const authentication = await client.Authentication().load()
// authentication is a bare entity populated with mock response data
console.log(authentication)
```

You can also use the instance method:

```ts
const client = new OpenwhydSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Authentication()

// First call runs the operation and stores its result
await entity.load()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data)
```

### Add custom middleware

Pass features via the `extend` option:

```ts
const logger = {
  hooks: {
    PreRequest: (ctx: any) => {
      console.log('Requesting:', ctx.spec.method, ctx.spec.path)
    },
    PreResponse: (ctx: any) => {
      console.log('Status:', ctx.out.request?.status)
    },
  },
}

const client = new OpenwhydSDK({
  apikey: '...',
  extend: [logger],
})
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPENWHYD_TEST_LIVE=TRUE
OPENWHYD_APIKEY=<your-key>
```

Then run:

```bash
cd ts && npm test
```


## Reference

### OpenwhydSDK

#### Constructor

```ts
new OpenwhydSDK(options?: {
  apikey?: string
  base?: string
  prefix?: string
  suffix?: string
  feature?: Record<string, { active: boolean }>
  extend?: Feature[]
})
```

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `object` | Feature activation flags (e.g. `{ test: { active: true } }`). |
| `extend` | `Feature[]` | Additional feature instances to load. |

#### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `options()` | `object` | Deep copy of current SDK options. |
| `utility()` | `Utility` | Deep copy of the SDK utility object. |
| `prepare(fetchargs?)` | `Promise<FetchDef>` | Build an HTTP request definition without sending it. |
| `direct(fetchargs?)` | `Promise<DirectResult>` | Build and send an HTTP request. |
| `Authentication(data?)` | `AuthenticationEntity` | Create an Authentication entity instance. |
| `GetUserPost(data?)` | `GetUserPostEntity` | Create a GetUserPost entity instance. |
| `Playlist(data?)` | `PlaylistEntity` | Create a Playlist entity instance. |
| `Post(data?)` | `PostEntity` | Create a Post entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `Subscription(data?)` | `SubscriptionEntity` | Create a Subscription entity instance. |
| `User(data?)` | `UserEntity` | Create an User entity instance. |
| `tester(testopts?, sdkopts?)` | `OpenwhydSDK` | Create a test-mode client instance. |

#### Static methods

| Method | Returns | Description |
| --- | --- | --- |
| `OpenwhydSDK.test(testopts?, sdkopts?)` | `OpenwhydSDK` | Create a test-mode client. |

### Entity interface

All entities share the same interface.

#### Methods

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `load(reqmatch?, ctrl?): Promise<Entity>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Entity[]>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Entity>` | Create a new entity. |
| `data` | `data(data?: Partial<Entity>): Entity` | Get or set entity data. |
| `match` | `match(match?: Partial<Entity>): Partial<Entity>` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): OpenwhydSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Return values

Entity operations resolve to the entity data directly — there is no
result envelope:

- `load` and `create` resolve to a single entity object.
- `list` resolves to an **array** of entity objects (iterate it directly;
  there is no `.data` and no `.ok`).

On a failed request these methods **throw**, so wrap calls in
`try`/`catch` to handle errors. Only `direct()` returns the result
envelope described below.

### DirectResult shape

The `direct()` method returns:

```ts
{
  ok: boolean
  status: number
  headers: object
  data: any
}
```

On error, `ok` is `false` and an `err` property contains the error.

### FetchDef shape

The `prepare()` method returns:

```ts
{
  url: string
  method: string
  headers: Record<string, string>
  body?: any
}
```

### Entities

#### Authentication

| Field | Description |
| --- | --- |
| `error` |  |
| `ok` |  |
| `redirect` |  |
| `u_id` |  |
| `user` |  |
| `wrong_password` |  |

Operations: create, load.

API path: `/login`

#### GetUserPost

| Field | Description |
| --- | --- |
| `ctx` |  |
| `e_id` |  |
| `id` |  |
| `img` |  |
| `lov` |  |
| `name` |  |
| `nb_p` |  |
| `nb_r` |  |
| `score` |  |
| `src` |  |
| `text` |  |
| `u_id` |  |
| `u_nm` |  |
| `url` |  |

Operations: list.

API path: `/{username}`

#### Playlist

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |
| `nb_track` |  |
| `url` |  |

Operations: list.

API path: `/{username}/playlists`

#### Post

| Field | Description |
| --- | --- |
| `ctx` |  |
| `e_id` |  |
| `id` |  |
| `img` |  |
| `lov` |  |
| `name` |  |
| `nb_p` |  |
| `nb_r` |  |
| `score` |  |
| `src` |  |
| `text` |  |
| `u_id` |  |
| `u_nm` |  |
| `url` |  |

Operations: load.

API path: `/{username}/playlist/{playlistId}`

#### Search

| Field | Description |
| --- | --- |
| `q` |  |
| `result` |  |

Operations: list.

API path: `/search`

#### Subscription

| Field | Description |
| --- | --- |
| `is_subscribing` |  |
| `u_id` |  |
| `u_nm` |  |

Operations: load.

API path: `/api/follow/fetchFollowers/{id}`

#### User

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |
| `nb_track` |  |
| `url` |  |

Operations: create, list.

API path: `/api/user`



## Entities


### Authentication

Create an instance: `const authentication = client.Authentication()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `error` | `string` |  |
| `ok` | `string` |  |
| `redirect` | `string` |  |
| `u_id` | `string` |  |
| `user` | `Record<string, any>` |  |
| `wrong_password` | `number` |  |

#### Example: Load

```ts
const authentication = await client.Authentication().load()
```

#### Example: Create

```ts
const authentication = await client.Authentication().create({
})
```


### GetUserPost

Create an instance: `const get_user_post = client.GetUserPost()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ctx` | `string` |  |
| `e_id` | `string` |  |
| `id` | `string` |  |
| `img` | `string` |  |
| `lov` | `any[]` |  |
| `name` | `string` |  |
| `nb_p` | `number` |  |
| `nb_r` | `number` |  |
| `score` | `number` |  |
| `src` | `Record<string, any>` |  |
| `text` | `string` |  |
| `u_id` | `string` |  |
| `u_nm` | `string` |  |
| `url` | `string` |  |

#### Example: List

```ts
const get_user_posts = await client.GetUserPost().list()
```


### Playlist

Create an instance: `const playlist = client.Playlist()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` |  |
| `name` | `string` |  |
| `nb_track` | `number` |  |
| `url` | `string` |  |

#### Example: List

```ts
const playlists = await client.Playlist().list()
```


### Post

Create an instance: `const post = client.Post()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ctx` | `string` |  |
| `e_id` | `string` |  |
| `id` | `string` |  |
| `img` | `string` |  |
| `lov` | `any[]` |  |
| `name` | `string` |  |
| `nb_p` | `number` |  |
| `nb_r` | `number` |  |
| `score` | `number` |  |
| `src` | `Record<string, any>` |  |
| `text` | `string` |  |
| `u_id` | `string` |  |
| `u_nm` | `string` |  |
| `url` | `string` |  |

#### Example: Load

```ts
const post = await client.Post().load()
```


### Search

Create an instance: `const search = client.Search()`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `q` | `string` |  |
| `result` | `any[]` |  |

#### Example: List

```ts
const searchs = await client.Search().list()
```


### Subscription

Create an instance: `const subscription = client.Subscription()`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `is_subscribing` | `boolean` |  |
| `u_id` | `string` |  |
| `u_nm` | `string` |  |

#### Example: Load

```ts
const subscription = await client.Subscription().load({ id: 'subscription_id' })
```


### User

Create an instance: `const user = client.User()`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `number` |  |
| `name` | `string` |  |
| `nb_track` | `number` |  |
| `url` | `string` |  |

#### Example: List

```ts
const users = await client.User().list()
```

#### Example: Create

```ts
const user = await client.User().create({
})
```


## Advanced

> The sections above cover everyday use. The material below explains the
> SDK's internals — useful when extending it with custom features, but not
> needed for normal use.

### The operation pipeline

Every entity operation follows a six-stage pipeline. Each stage fires a
feature hook before executing:

```
PrePoint → PreSpec → PreRequest → PreResponse → PreResult → PreDone
```

- **PrePoint**: Resolves which API endpoint to call based on the
  operation name and entity configuration.
- **PreSpec**: Builds the HTTP spec — URL, method, headers, body —
  from the resolved point and the caller's parameters.
- **PreRequest**: Sends the HTTP request. Features can intercept here
  to replace the transport (as TestFeature does with mocks).
- **PreResponse**: Parses the raw HTTP response.
- **PreResult**: Extracts the business data from the parsed response.
- **PreDone**: Final stage before returning to the caller. Entity
  state (match, data) is updated here.

If any stage errors, the pipeline short-circuits and the error surfaces
to the caller — see [Error handling](#error-handling) for how that looks
in this language.

### Features and hooks

Features are the extension mechanism. A feature is an object with a
`hooks` map. Each hook key is a pipeline stage name, and the value is
a function that receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Module structure

```
openwhyd/
├── src/
│   ├── OpenwhydSDK.ts        # Main SDK class
│   ├── entity/             # Entity implementations
│   ├── feature/            # Built-in features (Base, Test, Log)
│   └── utility/            # Utility functions
├── test/                   # Test suites
└── dist/                   # Compiled output
```

Import the SDK from the package root:

```ts
import { OpenwhydSDK } from '@voxgig-sdk/openwhyd'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const authentication = client.Authentication()
await authentication.load()

// authentication.data() now returns the authentication data from the last `load`
// authentication.match() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

The `direct` method gives full control over the HTTP request. Use it
for non-standard endpoints, bulk operations, or any path not modelled
as an entity. The `prepare` method is useful for debugging — it
shows exactly what `direct` would send.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
