# Openwhyd Lua SDK



The Lua SDK for the Openwhyd API — an entity-oriented client using Lua conventions.

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

### 3. Load an authentication

```lua
local result, err = client:authentication():load({ id = "example_id" })
if err then error(err) end
print(result)
```

### 4. Create, update, and remove

```lua
-- Create
local created, _ = client:authentication():create({ name = "Example" })

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

local result, err = client:authentication():load({ id = "test01" })
-- result contains mock response data
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
| `Authentication` | `(data) -> AuthenticationEntity` | Create a Authentication entity instance. |
| `GetUserPost` | `(data) -> GetUserPostEntity` | Create a GetUserPost entity instance. |
| `Playlist` | `(data) -> PlaylistEntity` | Create a Playlist entity instance. |
| `Post` | `(data) -> PostEntity` | Create a Post entity instance. |
| `Search` | `(data) -> SearchEntity` | Create a Search entity instance. |
| `Subscription` | `(data) -> SubscriptionEntity` | Create a Subscription entity instance. |
| `User` | `(data) -> UserEntity` | Create a User entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `(reqmatch, ctrl) -> any, err` | Load a single entity by match criteria. |
| `list` | `(reqmatch, ctrl) -> any, err` | List entities matching the criteria. |
| `create` | `(reqdata, ctrl) -> any, err` | Create a new entity. |
| `update` | `(reqdata, ctrl) -> any, err` | Update an existing entity. |
| `remove` | `(reqmatch, ctrl) -> any, err` | Remove an entity. |
| `data_get` | `() -> table` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> table` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> string` | Return the entity name. |

### Result shape

Entity operations return `(any, err)`. The first value is a
`table` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `boolean` | `true` if the HTTP status is 2xx. |
| `status` | `number` | HTTP status code. |
| `headers` | `table` | Response headers. |
| `data` | `any` | Parsed JSON response body. |

On error, `ok` is `false` and `err` contains the error value.

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

Operations: Create, Load.

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

Operations: List.

API path: `/{username}`

#### Playlist

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |
| `nb_track` |  |
| `url` |  |

Operations: List.

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

Operations: Load.

API path: `/{username}/playlist/{playlistId}`

#### Search

| Field | Description |
| --- | --- |
| `q` |  |
| `result` |  |

Operations: List.

API path: `/search`

#### Subscription

| Field | Description |
| --- | --- |
| `is_subscribing` |  |
| `u_id` |  |
| `u_nm` |  |

Operations: Load.

API path: `/api/follow/fetchFollowers/{id}`

#### User

| Field | Description |
| --- | --- |
| `id` |  |
| `name` |  |
| `nb_track` |  |
| `url` |  |

Operations: Create, List.

API path: `/api/user`



## Entities


### Authentication

Create an instance: `const authentication = client.authentication`

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
const authentication = await client.authentication.load({ id: 'authentication_id' })
```

#### Example: Create

```ts
const authentication = await client.authentication.create({
})
```


### GetUserPost

Create an instance: `const get_user_post = client.get_user_post`

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
const get_user_posts = await client.get_user_post.list()
```


### Playlist

Create an instance: `const playlist = client.playlist`

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
const playlists = await client.playlist.list()
```


### Post

Create an instance: `const post = client.post`

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
const post = await client.post.load({ id: 'post_id' })
```


### Search

Create an instance: `const search = client.search`

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
const searchs = await client.search.list()
```


### Subscription

Create an instance: `const subscription = client.subscription`

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
const subscription = await client.subscription.load({ id: 'subscription_id' })
```


### User

Create an instance: `const user = client.user`

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
const users = await client.user.list()
```

#### Example: Create

```ts
const user = await client.user.create({
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
error is returned to the caller as a second return value.

### Features and hooks

Features are the extension mechanism. A feature is a Lua table
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

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

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```lua
local authentication = client:authentication()
authentication:load({ id = "example_id" })

-- authentication:data_get() now returns the loaded authentication data
-- authentication:match_get() returns the last match criteria
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
