# Openwhyd TypeScript SDK



The TypeScript SDK for the Openwhyd API — a type-safe, entity-oriented client with full async/await support.

The API is exposed as capitalised, semantic **Entities** — e.g.
`client.Authentication()` — each with a small set of operations (`list`, `load`, `create`)
instead of raw URL paths and query parameters. This keeps the surface
predictable and low-friction for both humans and AI agents.

> Also generated from this model: `go`, `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb` — see
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
import { OpenwhydSDK } from '@voxgig-sdk/openwhyd-sdk'

const client = new OpenwhydSDK({
  apikey: process.env.OPENWHYD_APIKEY,
})
```

### 3. Load a post

Post is nested under genre, so provide the `genre`.
`load()` returns the entity directly and throws on failure:

```ts
try {
  const post = await client.Post().load({
    genre: 'example_genre',
  })
  console.log(post)
} catch (err) {
  console.error('load failed:', err)
}
```

### 4. Create, update, and remove

```ts
// Create — returns the created Authentication ENTITY (.data() for the record)
const created = await client.Authentication().create({
  bio: 'example_bio',
  cvrImg: 'example_cvrImg',
})

```


## Error handling

Entity operations reject on failure, so wrap them in `try` / `catch`:

```ts
try {
  const playlists = await client.Playlist().list()
  console.log(playlists)
} catch (err) {
  console.error('list failed:', err)
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

const playlist = await client.Playlist().list()
// playlist is the entity, populated with mock response data
// — call playlist.data() for the record itself
console.log(playlist)
```

You can also use the instance method:

```ts
const client = new OpenwhydSDK({ apikey: '...' })
const testClient = client.tester()
```

### Retain entity state across calls

Entity instances remember their last match and data:

```ts
const entity = client.Playlist()

// First call runs the operation and stores its result
await entity.list()

// Subsequent calls reuse the stored state
const data = entity.data()
console.log(data.id)
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
| `bio` | User biography |
| `cvrImg` | Cover image URL |
| `email` | Email address |
| `error` | Error message if any |
| `handle` | Username/handle |
| `id` | User ID |
| `img` | Avatar URL |
| `isSubscribing` | Whether logged in user subscribes to this user |
| `lastArtists` | Recently posted artists |
| `lastFm` |  |
| `lnk` |  |
| `loc` | User location |
| `name` | Full name |
| `nbLikes` | Number of likes |
| `nbPosts` | Number of posts |
| `nbSubscribers` | Number of subscribers |
| `nbSubscriptions` | Number of subscriptions |
| `pl` | User playlists |
| `redirect` | URL to redirect to |
| `twId` | Twitter handle |
| `twSec` | Twitter session secret |
| `twTok` | Twitter session token |
| `uId` | ID of new user if successful |

Operations: create, load.

API path: `/login`

#### GetUserPost

| Field | Description |
| --- | --- |
| `ctx` | Context |
| `eId` | External ID (platform identifier) |
| `id` | Post ID |
| `img` | Track image URL |
| `lov` | User IDs who liked this post |
| `name` | Track name |
| `nbP` | Number of plays |
| `nbR` | Number of reposts |
| `score` | Search relevance score |
| `src` |  |
| `text` | Post text/comment |
| `uId` | User ID of poster |
| `uNm` | User name of poster |
| `url` | Direct URL to track |

Operations: list.

API path: `/{username}`

#### Playlist

| Field | Description |
| --- | --- |
| `id` | Playlist number |
| `name` | Playlist name |
| `nbTracks` | Number of tracks in playlist |
| `url` | Playlist URL |

Operations: list.

API path: `/{username}/playlists`

#### Post

| Field | Description |
| --- | --- |
| `ctx` | Context |
| `eId` | External ID (platform identifier) |
| `id` | Post ID |
| `img` | Track image URL |
| `lov` | User IDs who liked this post |
| `name` | Track name |
| `nbP` | Number of plays |
| `nbR` | Number of reposts |
| `score` | Search relevance score |
| `src` |  |
| `text` | Post text/comment |
| `uId` | User ID of poster |
| `uNm` | User name of poster |
| `url` | Direct URL to track |

Operations: load.

API path: `/{username}/playlist/{playlistId}`

#### Search

| Field | Description |
| --- | --- |
| `q` | Search query |
| `results` |  |

Operations: list.

API path: `/search`

#### Subscription

| Field | Description |
| --- | --- |
| `id` |  |
| `isSubscribing` | Whether logged in user follows this user |
| `uId` | User ID |
| `uNm` | User name |

Operations: load.

API path: `/api/follow/fetchFollowers/{id}`

#### User

| Field | Description |
| --- | --- |
| `id` | Playlist number |
| `name` | Playlist name |
| `nbTracks` | Number of tracks in playlist |
| `url` | Playlist URL |

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
| `bio` | `string` | User biography |
| `cvrImg` | `string` | Cover image URL |
| `email` | `string` | Email address |
| `error` | `string` | Error message if any |
| `handle` | `string` | Username/handle |
| `id` | `string` | User ID |
| `img` | `string` | Avatar URL |
| `isSubscribing` | `boolean` | Whether logged in user subscribes to this user |
| `lastArtists` | `any[]` | Recently posted artists |
| `lastFm` | `Record<string, any>` |  |
| `lnk` | `Record<string, any>` |  |
| `loc` | `string` | User location |
| `name` | `string` | Full name |
| `nbLikes` | `number` | Number of likes |
| `nbPosts` | `number` | Number of posts |
| `nbSubscribers` | `number` | Number of subscribers |
| `nbSubscriptions` | `number` | Number of subscriptions |
| `pl` | `any[]` | User playlists |
| `redirect` | `string` | URL to redirect to |
| `twId` | `string` | Twitter handle |
| `twSec` | `string` | Twitter session secret |
| `twTok` | `string` | Twitter session token |
| `uId` | `string` | ID of new user if successful |

#### Example: Load

```ts
const authentication = await client.Authentication().load({ action: 'action' })
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
| `ctx` | `string` | Context |
| `eId` | `string` | External ID (platform identifier) |
| `id` | `string` | Post ID |
| `img` | `string` | Track image URL |
| `lov` | `any[]` | User IDs who liked this post |
| `name` | `string` | Track name |
| `nbP` | `number` | Number of plays |
| `nbR` | `number` | Number of reposts |
| `score` | `number` | Search relevance score |
| `src` | `Record<string, any>` |  |
| `text` | `string` | Post text/comment |
| `uId` | `string` | User ID of poster |
| `uNm` | `string` | User name of poster |
| `url` | `string` | Direct URL to track |

#### Example: List

```ts
const get_user_posts = await client.GetUserPost().list({ id: "example" })
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
| `id` | `number` | Playlist number |
| `name` | `string` | Playlist name |
| `nbTracks` | `number` | Number of tracks in playlist |
| `url` | `string` | Playlist URL |

#### Example: List

```ts
const playlists = await client.Playlist().list({ username: "example" })
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
| `ctx` | `string` | Context |
| `eId` | `string` | External ID (platform identifier) |
| `id` | `string` | Post ID |
| `img` | `string` | Track image URL |
| `lov` | `any[]` | User IDs who liked this post |
| `name` | `string` | Track name |
| `nbP` | `number` | Number of plays |
| `nbR` | `number` | Number of reposts |
| `score` | `number` | Search relevance score |
| `src` | `Record<string, any>` |  |
| `text` | `string` | Post text/comment |
| `uId` | `string` | User ID of poster |
| `uNm` | `string` | User name of poster |
| `url` | `string` | Direct URL to track |

#### Example: Load

```ts
const post = await client.Post().load({ genre: 'genre' })
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
| `q` | `string` | Search query |
| `results` | `any[]` |  |

#### Example: List

```ts
const searchs = await client.Search().list({ q: "example" })
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
| `id` | `string` |  |
| `isSubscribing` | `boolean` | Whether logged in user follows this user |
| `uId` | `string` | User ID |
| `uNm` | `string` | User name |

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
| `id` | `number` | Playlist number |
| `name` | `string` | Playlist name |
| `nbTracks` | `number` | Number of tracks in playlist |
| `url` | `string` | Playlist URL |

#### Example: List

```ts
const users = await client.User().list()
```

#### Example: Create

```ts
const user = await client.User().create({
})
```

## Features

This SDK ships 1 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`test`](#test) | In-memory mock transport for testing without a live server |

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.


## Open types

1 field is carried as open values rather than typed structures.
This follows from the API definition, not from a gap in this SDK: the
definition describes it with untagged unions —
`oneOf`/`anyOf` branches with no `discriminator` — so it never states which
variant a given value is. Nothing can select a branch reliably, so the SDK
passes the value through unchanged rather than assert a shape the API does not
guarantee.

| Entity | Field | Variants | Nesting |
| --- | --- | --- | --- |
| `search` | `results` | 3 | 1 level |

These values round-trip unchanged — read them, modify them, send them back. If
the API adds a `discriminator` to the definition, regenerating will type them.
Every other field is typed normally.

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
import { OpenwhydSDK } from '@voxgig-sdk/openwhyd-sdk'
```

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally. Subsequent
calls on the same instance can rely on this state.

```ts
const playlist = client.Playlist()
await playlist.list()

// playlist.data() now returns the playlist data from the last `list`
// playlist.match() returns the last match criteria
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
