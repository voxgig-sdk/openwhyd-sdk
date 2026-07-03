# Openwhyd TypeScript SDK



The TypeScript SDK for the Openwhyd API — a type-safe, entity-oriented client with full async/await support.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
```bash
npm install openwhyd
```
## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ts
import { OpenwhydSDK } from 'openwhyd'

const client = new OpenwhydSDK({
  apikey: process.env.OPENWHYD_APIKEY,
})
```

### 3. Load a authentication

```ts
const result = await client.Authentication().load({ id: 'example_id' })

if (result.ok) {
  console.log(result.data)
}
```

### 4. Create, update, and remove

```ts
// Create
const created = await client.Authentication().create({
  name: 'Example',
})

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

const result = await client.Planet().load({ id: 'test01' })
// result.ok === true
// result.data contains mock response data
```

You can also use the instance method:

```ts
const client = new OpenwhydSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Planet()

// First call sets internal match
await entity.load({ id: 'example' })

// Subsequent calls reuse the stored match
const data = entity.data()
console.log(data.id) // 'example'
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
| `Authentication(data?)` | `AuthenticationEntity` | Create a Authentication entity instance. |
| `GetUserPost(data?)` | `GetUserPostEntity` | Create a GetUserPost entity instance. |
| `Playlist(data?)` | `PlaylistEntity` | Create a Playlist entity instance. |
| `Post(data?)` | `PostEntity` | Create a Post entity instance. |
| `Search(data?)` | `SearchEntity` | Create a Search entity instance. |
| `Subscription(data?)` | `SubscriptionEntity` | Create a Subscription entity instance. |
| `User(data?)` | `UserEntity` | Create a User entity instance. |
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
| `load` | `load(reqmatch?, ctrl?): Promise<Result>` | Load a single entity by match criteria. |
| `list` | `list(reqmatch?, ctrl?): Promise<Result>` | List entities matching the criteria. |
| `create` | `create(reqdata?, ctrl?): Promise<Result>` | Create a new entity. |
| `update` | `update(reqdata?, ctrl?): Promise<Result>` | Update an existing entity. |
| `remove` | `remove(reqmatch?, ctrl?): Promise<Result>` | Remove an entity. |
| `data` | `data(data?): any` | Get or set entity data. |
| `match` | `match(match?): any` | Get or set entity match criteria. |
| `make` | `make(): Entity` | Create a new instance with the same options. |
| `client` | `client(): OpenwhydSDK` | Return the parent SDK client. |
| `entopts` | `entopts(): object` | Return a copy of the entity options. |

#### Result shape

All entity operations return a Result object:

```ts
{
  ok: boolean      // true if the HTTP status is 2xx
  status: number   // HTTP status code
  headers: object  // response headers
  data: any        // parsed JSON response body
}
```

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
| `error` | ``$STRING`` |  |
| `ok` | ``$STRING`` |  |
| `redirect` | ``$STRING`` |  |
| `u_id` | ``$STRING`` |  |
| `user` | ``$OBJECT`` |  |
| `wrong_password` | ``$INTEGER`` |  |

#### Example: Load

```ts
const authentication = await client.Authentication().load({ id: 'authentication_id' })
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
| `ctx` | ``$STRING`` |  |
| `e_id` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `img` | ``$STRING`` |  |
| `lov` | ``$ARRAY`` |  |
| `name` | ``$STRING`` |  |
| `nb_p` | ``$INTEGER`` |  |
| `nb_r` | ``$INTEGER`` |  |
| `score` | ``$NUMBER`` |  |
| `src` | ``$OBJECT`` |  |
| `text` | ``$STRING`` |  |
| `u_id` | ``$STRING`` |  |
| `u_nm` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

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
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `nb_track` | ``$INTEGER`` |  |
| `url` | ``$STRING`` |  |

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
| `ctx` | ``$STRING`` |  |
| `e_id` | ``$STRING`` |  |
| `id` | ``$STRING`` |  |
| `img` | ``$STRING`` |  |
| `lov` | ``$ARRAY`` |  |
| `name` | ``$STRING`` |  |
| `nb_p` | ``$INTEGER`` |  |
| `nb_r` | ``$INTEGER`` |  |
| `score` | ``$NUMBER`` |  |
| `src` | ``$OBJECT`` |  |
| `text` | ``$STRING`` |  |
| `u_id` | ``$STRING`` |  |
| `u_nm` | ``$STRING`` |  |
| `url` | ``$STRING`` |  |

#### Example: Load

```ts
const post = await client.Post().load({ id: 'post_id' })
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
| `q` | ``$STRING`` |  |
| `result` | ``$ARRAY`` |  |

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
| `is_subscribing` | ``$BOOLEAN`` |  |
| `u_id` | ``$STRING`` |  |
| `u_nm` | ``$STRING`` |  |

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
| `id` | ``$INTEGER`` |  |
| `name` | ``$STRING`` |  |
| `nb_track` | ``$INTEGER`` |  |
| `url` | ``$STRING`` |  |

#### Example: List

```ts
const users = await client.User().list()
```

#### Example: Create

```ts
const user = await client.User().create({
})
```


## Explanation

### The operation pipeline

Every entity operation (load, list, create, update, remove) follows a
six-stage pipeline. Each stage fires a feature hook before executing:

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

If any stage returns an error, the pipeline short-circuits and the
error is returned to the caller.

An unexpected exception triggers the `PreUnexpected` hook before
propagating.

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
import { OpenwhydSDK } from 'openwhyd'
```

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const moon = client.Moon()
await moon.load({ planet_id: 'earth', id: 'luna' })

// moon.data() now returns the loaded moon data
// moon.match() returns { planet_id: 'earth', id: 'luna' }
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
