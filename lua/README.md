# Openwhyd Lua SDK



The Lua SDK for the Openwhyd API — an entity-oriented client using Lua conventions.

It exposes the API as capitalised, semantic **Entities** — e.g. `client:Authentication()` — each with the same small set of operations (`list`, `load`, `create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to LuaRocks. Install it from the
GitHub release tag (`lua/vX.Y.Z`, see [Releases](https://github.com/voxgig-sdk/openwhyd-sdk/releases)),
or add the source directory to your `LUA_PATH`:

```bash
export LUA_PATH="path/to/lua/?.lua;path/to/lua/?/init.lua;;"
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```lua
local sdk = require("openwhyd_sdk")

local client = sdk.new({
  apikey = os.getenv("OPENWHYD_APIKEY"),
})
```

### 3. Load a post

Post is nested under genre, so provide the `genre`.

```lua
local post, err = client:Post():load({ genre = "example_genre" })
if err then error(err) end
print(post)
```

### 4. Create, update, and remove

```lua
-- Create
local created, err = client:Authentication():create({ bio = "example_bio", cvrImg = "example_cvrImg" })
if err then error(err) end

```


## Error handling

Entity operations return `(value, err)`. Check `err` before using
the value:

```lua
local playlists, err = client:Playlist():list()
if err then error(err) end
```

`direct` follows the same `(value, err)` convention:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example_id" },
})
if err then error(err) end
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
if err then error(err) end

if result["ok"] then
  print(result["status"])  -- 200
  print(result["data"])    -- response body
end
```

### Prepare a request without sending it

```lua
local fetchdef, err = client:prepare({
  path = "/api/resource/{id}",
  method = "DELETE",
  params = { id = "example" },
})
if err then error(err) end

print(fetchdef["url"])
print(fetchdef["method"])
print(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```lua
local client = sdk.test()

local result, err = client:Playlist():list()
-- result is the returned data; err is set on failure
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```lua
local function mock_fetch(url, init)
  return {
    status = 200,
    statusText = "OK",
    headers = {},
    json = function()
      return { id = "mock01" }
    end,
  }, nil
end

local client = sdk.new({
  base = "http://localhost:8080",
  system = {
    fetch = mock_fetch,
  },
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
cd lua && busted test/
```


## Reference

### OpenwhydSDK

```lua
local sdk = require("openwhyd_sdk")
local client = sdk.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `table` | Feature activation flags. |
| `extend` | `table` | Additional Feature instances to load. |
| `system` | `table` | System overrides (e.g. custom `fetch` function). |

### test

```lua
local client = sdk.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OpenwhydSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> table` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> table, err` | Build an HTTP request definition without sending. |
| `direct` | `(fetchargs) -> table, err` | Build and send an HTTP request. |
| `Authentication` | `(data) -> AuthenticationEntity` | Create an Authentication entity instance. |
| `GetUserPost` | `(data) -> GetUserPostEntity` | Create a GetUserPost entity instance. |
| `Playlist` | `(data) -> PlaylistEntity` | Create a Playlist entity instance. |
| `Post` | `(data) -> PostEntity` | Create a Post entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |
| `Subscription` | `(data) -> SubscriptionEntity` | Create a Subscription entity instance. |
| `User` | `(data) -> UserEntity` | Create an User entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(value, err)`. The `value` is the operation's
data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `load` / `create` | the entity record (a `table`) |
| `list` | an array (`table`) of entity records |

Check `err` first (it is non-`nil` on failure), then use `value`:

    local authentication, err = client:Authentication():load()
    if err then error(err) end
    -- authentication is the loaded record

Only `direct()` returns a response envelope — a `table` with `ok`,
`status`, `headers`, and `data` keys.

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

Operations: Create, Load.

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

Operations: List.

API path: `/{username}`

#### Playlist

| Field | Description |
| --- | --- |
| `id` | Playlist number |
| `name` | Playlist name |
| `nbTracks` | Number of tracks in playlist |
| `url` | Playlist URL |

Operations: List.

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

Operations: Load.

API path: `/{username}/playlist/{playlistId}`

#### Search

| Field | Description |
| --- | --- |
| `q` | Search query |
| `results` |  |

Operations: List.

API path: `/search`

#### Subscription

| Field | Description |
| --- | --- |
| `id` |  |
| `isSubscribing` | Whether logged in user follows this user |
| `uId` | User ID |
| `uNm` | User name |

Operations: Load.

API path: `/api/follow/fetchFollowers/{id}`

#### User

| Field | Description |
| --- | --- |
| `id` | Playlist number |
| `name` | Playlist name |
| `nbTracks` | Number of tracks in playlist |
| `url` | Playlist URL |

Operations: Create, List.

API path: `/api/user`



## Entities


### Authentication

Create an instance: `local authentication = client:Authentication(nil)`

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
| `lastArtists` | `table` | Recently posted artists |
| `lastFm` | `table` |  |
| `lnk` | `table` |  |
| `loc` | `string` | User location |
| `name` | `string` | Full name |
| `nbLikes` | `number` | Number of likes |
| `nbPosts` | `number` | Number of posts |
| `nbSubscribers` | `number` | Number of subscribers |
| `nbSubscriptions` | `number` | Number of subscriptions |
| `pl` | `table` | User playlists |
| `redirect` | `string` | URL to redirect to |
| `twId` | `string` | Twitter handle |
| `twSec` | `string` | Twitter session secret |
| `twTok` | `string` | Twitter session token |
| `uId` | `string` | ID of new user if successful |

#### Example: Load

```lua
local authentication, err = client:Authentication():load({ action = "action" })
```

#### Example: Create

```lua
local authentication, err = client:Authentication():create({
})
```


### GetUserPost

Create an instance: `local get_user_post = client:GetUserPost(nil)`

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
| `lov` | `table` | User IDs who liked this post |
| `name` | `string` | Track name |
| `nbP` | `number` | Number of plays |
| `nbR` | `number` | Number of reposts |
| `score` | `number` | Search relevance score |
| `src` | `table` |  |
| `text` | `string` | Post text/comment |
| `uId` | `string` | User ID of poster |
| `uNm` | `string` | User name of poster |
| `url` | `string` | Direct URL to track |

#### Example: List

```lua
local get_user_posts, err = client:GetUserPost():list()
```


### Playlist

Create an instance: `local playlist = client:Playlist(nil)`

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

```lua
local playlists, err = client:Playlist():list()
```


### Post

Create an instance: `local post = client:Post(nil)`

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
| `lov` | `table` | User IDs who liked this post |
| `name` | `string` | Track name |
| `nbP` | `number` | Number of plays |
| `nbR` | `number` | Number of reposts |
| `score` | `number` | Search relevance score |
| `src` | `table` |  |
| `text` | `string` | Post text/comment |
| `uId` | `string` | User ID of poster |
| `uNm` | `string` | User name of poster |
| `url` | `string` | Direct URL to track |

#### Example: Load

```lua
local post, err = client:Post():load({ genre = "genre" })
```


### Search

Create an instance: `local search = client:Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `q` | `string` | Search query |
| `results` | `table` |  |

#### Example: List

```lua
local searchs, err = client:Search():list()
```


### Subscription

Create an instance: `local subscription = client:Subscription(nil)`

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

```lua
local subscription, err = client:Subscription():load({ id = "subscription_id" })
```


### User

Create an instance: `local user = client:User(nil)`

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

```lua
local users, err = client:User():list()
```

#### Example: Create

```lua
local user, err = client:User():create({
})
```

## Features

This SDK ships 4 optional features. Each is **inactive until you
switch it on**, so an SDK you have not configured behaves exactly as if none of
them existed — no retries, no cache, no logging, no measurable overhead.

Activate a feature by name in the client options, alongside the options shown
above:

| Feature | What it does |
|---|---|
| [`ratelimit`](#ratelimit) | Client-side rate limiting via a token bucket |
| [`retry`](#retry) | Automatic retry of transient failures with exponential backoff |
| [`test`](#test) | In-memory mock transport for testing without a live server |
| [`timeout`](#timeout) | Per-request timeout with transport abort |

> **Order matters for `ratelimit`, `retry`, `timeout`.** These wrap the
> transport, so each one wraps whatever is already installed: the order you
> activate them in IS the nesting order. Activating them as an ordered list
> rather than a map is what fixes that order.

### ratelimit

Client-side rate limiting via a token bucket.

| Option | Default |
|---|---|
| `active` | `false` |
| `burst` | `5` |
| `rate` | `5` |

Set `feature.ratelimit.active` to enable it, then override any of the options above.

`ratelimit` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### retry

Automatic retry of transient failures with exponential backoff.

| Option | Default |
|---|---|
| `active` | `false` |
| `factor` | `2` |
| `maxDelay` | `2000` |
| `minDelay` | `50` |
| `retries` | `2` |
| `statuses` | `[408, 425, 429, 500, 502, 503, 504]` |

Set `feature.retry.active` to enable it, then override any of the options above.

`retry` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.

### test

In-memory mock transport for testing without a live server.

| Option | Default |
|---|---|
| `active` | `false` |

Set `feature.test.active` to enable it, then override any of the options above.

### timeout

Per-request timeout with transport abort.

| Option | Default |
|---|---|
| `active` | `false` |
| `ms` | `30000` |

Set `feature.timeout.active` to enable it, then override any of the options above.

`timeout` wraps the transport, so its position among the other
transport features decides what it sees. A feature activated later wraps one
activated earlier.


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

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **RatelimitFeature**: Client-side rate limiting via a token bucket
- **RetryFeature**: Automatic retry of transient failures with exponential backoff
- **TestFeature**: In-memory mock transport for testing without a live server
- **TimeoutFeature**: Per-request timeout with transport abort

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as tables

The Lua SDK uses plain Lua tables throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `helpers.to_map()` to safely validate that a value is a table.

### Module structure

```
lua/
├── openwhyd_sdk.lua    -- Main SDK module
├── config.lua               -- Configuration
├── features.lua             -- Feature factory
├── core/                    -- Core types and context
├── entity/                  -- Entity implementations
├── feature/                 -- Built-in features (Base, Test, Log)
├── utility/                 -- Utility functions and struct library
└── test/                    -- Test suites
```

The main module (`openwhyd_sdk`) exports the SDK constructor
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```lua
local playlist = client:Playlist()
playlist:list()

-- playlist:data_get() now returns the playlist data from the last list
-- playlist:match_get() returns the last match criteria
```

Call `make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
