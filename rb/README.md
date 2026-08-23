# Openwhyd Ruby SDK



The Ruby SDK for the Openwhyd API — an entity-oriented client using idiomatic Ruby conventions.

The SDK exposes the API as capitalised, semantic **Entities** — for example `client.Authentication` — with named operations (`list`/`load`/`create`) instead of raw URL paths and query strings. Working with resources and verbs keeps call sites self-describing and reduces cognitive load.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to RubyGems. Install it from the
GitHub release tag (`rb/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/openwhyd-sdk/releases](https://github.com/voxgig-sdk/openwhyd-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```ruby
require_relative "Openwhyd_sdk"

client = OpenwhydSDK.new({
  "apikey" => ENV["OPENWHYD_APIKEY"],
})
```

### 3. Load a post

Post is nested under genre, so provide the `genre`.

```ruby
begin
  # load returns the ENTITY — call data_get for the Post record (raises on error).
  post = client.Post.load({ "genre" => "example_genre" })
  puts post
rescue => err
  warn "load failed: #{err}"
end
```

### 4. Create, update, and remove

```ruby
# create returns the ENTITY — call data_get for the created Authentication record.
created = client.Authentication.create({ "bio" => "example_bio", "cvrImg" => "example_cvrImg" })

```


## Error handling

Entity operations raise on failure, so rescue them:

```ruby
begin
  playlists = client.Playlist.list()
rescue => err
  warn "list failed: #{err}"
end
```

`direct` does **not** raise — it returns the result hash. Branch on
`ok`; on failure `status` holds the HTTP status (for error responses) and
`err` holds a transport error, so read both defensively:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example_id" },
})

warn "request failed: #{result["err"] || "HTTP #{result["status"]}"}" unless result["ok"]
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```ruby
result = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})

if result["ok"]
  puts result["status"]  # 200
  puts result["data"]    # response body
else
  # On an HTTP error status there is no err (only a transport failure sets
  # it), so fall back to the status code.
  warn(result["err"] || "HTTP #{result["status"]}")
end
```

### Prepare a request without sending it

```ruby
begin
  fetchdef = client.prepare({
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => { "id" => "example" },
  })
  puts fetchdef["url"]
  puts fetchdef["method"]
  puts fetchdef["headers"]
rescue => err
  warn "prepare failed: #{err}"
end
```

### Use test mode

Create a mock client for unit testing — no server required:

```ruby
client = OpenwhydSDK.test

# Entity ops return the ENTITY (raises on error);
# call data_get for the mock record.
playlist = client.Playlist.list()
puts playlist
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```ruby
mock_fetch = ->(url, init) {
  return {
    "status" => 200,
    "statusText" => "OK",
    "headers" => {},
    "json" => ->() { { "id" => "mock01" } },
  }, nil
}

client = OpenwhydSDK.new({
  "base" => "http://localhost:8080",
  "system" => {
    "fetch" => mock_fetch,
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
cd rb && ruby -Itest -e "Dir['test/*_test.rb'].each { |f| require_relative f }"
```


## Reference

### OpenwhydSDK

```ruby
require_relative "Openwhyd_sdk"
client = OpenwhydSDK.new(options)
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `String` | API key for authentication. |
| `base` | `String` | Base URL of the API server. |
| `prefix` | `String` | URL path prefix prepended to all requests. |
| `suffix` | `String` | URL path suffix appended to all requests. |
| `feature` | `Hash` | Feature activation flags. |
| `extend` | `Hash` | Additional Feature instances to load. |
| `system` | `Hash` | System overrides (e.g. custom `fetch` lambda). |

### test

```ruby
client = OpenwhydSDK.test(testopts, sdkopts)
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OpenwhydSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `() -> Hash` | Deep copy of current SDK options. |
| `get_utility` | `() -> Utility` | Copy of the SDK utility object. |
| `prepare` | `(fetchargs) -> Hash` | Build an HTTP request definition without sending. Raises on error. |
| `direct` | `(fetchargs) -> Hash` | Build and send an HTTP request. Returns a result hash (`result["ok"]`); does not raise. |
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
| `load` | `(reqmatch, ctrl) -> any` | Load a single entity by match criteria. Raises on error. |
| `list` | `(reqmatch = nil, ctrl) -> Array` | List entities matching the criteria (call with no argument to list all). Raises on error. |
| `create` | `(reqdata, ctrl) -> any` | Create a new entity. Raises on error. |
| `data_get` | `() -> Hash` | Get entity data. |
| `data_set` | `(data)` | Set entity data. |
| `match_get` | `() -> Hash` | Get entity match criteria. |
| `match_set` | `(match)` | Set entity match criteria. |
| `make` | `() -> Entity` | Create a new instance with the same options. |
| `get_name` | `() -> String` | Return the entity name. |

### Result shape

Entity operations return the result data directly. On failure they
raise a `OpenwhydError` (a `StandardError` subclass), so wrap
calls in `begin`/`rescue` where you need to handle errors.

The `direct` escape hatch is the exception: it never raises and instead
returns a result `Hash` with these keys:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `Boolean` | `true` if the HTTP status is 2xx. |
| `status` | `Integer` | HTTP status code. |
| `headers` | `Hash` | Response headers. |
| `data` | `any` | Parsed JSON response body. |
| `err` | `Error` | Present when `ok` is `false`. |

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

Create an instance: `authentication = client.Authentication`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `bio` | `String` | User biography |
| `cvrImg` | `String` | Cover image URL |
| `email` | `String` | Email address |
| `error` | `String` | Error message if any |
| `handle` | `String` | Username/handle |
| `id` | `String` | User ID |
| `img` | `String` | Avatar URL |
| `isSubscribing` | `Boolean` | Whether logged in user subscribes to this user |
| `lastArtists` | `Array` | Recently posted artists |
| `lastFm` | `Hash` |  |
| `lnk` | `Hash` |  |
| `loc` | `String` | User location |
| `name` | `String` | Full name |
| `nbLikes` | `Integer` | Number of likes |
| `nbPosts` | `Integer` | Number of posts |
| `nbSubscribers` | `Integer` | Number of subscribers |
| `nbSubscriptions` | `Integer` | Number of subscriptions |
| `pl` | `Array` | User playlists |
| `redirect` | `String` | URL to redirect to |
| `twId` | `String` | Twitter handle |
| `twSec` | `String` | Twitter session secret |
| `twTok` | `String` | Twitter session token |
| `uId` | `String` | ID of new user if successful |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Authentication record (raises on error).
authentication = client.Authentication.load({ "id" => "authentication_id" })
```

#### Example: Create

```ruby
authentication = client.Authentication.create({
})
```


### GetUserPost

Create an instance: `get_user_post = client.GetUserPost`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ctx` | `String` | Context |
| `eId` | `String` | External ID (platform identifier) |
| `id` | `String` | Post ID |
| `img` | `String` | Track image URL |
| `lov` | `Array` | User IDs who liked this post |
| `name` | `String` | Track name |
| `nbP` | `Integer` | Number of plays |
| `nbR` | `Integer` | Number of reposts |
| `score` | `Float` | Search relevance score |
| `src` | `Hash` |  |
| `text` | `String` | Post text/comment |
| `uId` | `String` | User ID of poster |
| `uNm` | `String` | User name of poster |
| `url` | `String` | Direct URL to track |

#### Example: List

```ruby
# list returns an Array of GetUserPost records (raises on error).
get_user_posts = client.GetUserPost.list
```


### Playlist

Create an instance: `playlist = client.Playlist`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `Integer` | Playlist number |
| `name` | `String` | Playlist name |
| `nbTracks` | `Integer` | Number of tracks in playlist |
| `url` | `String` | Playlist URL |

#### Example: List

```ruby
# list returns an Array of Playlist records (raises on error).
playlists = client.Playlist.list
```


### Post

Create an instance: `post = client.Post`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ctx` | `String` | Context |
| `eId` | `String` | External ID (platform identifier) |
| `id` | `String` | Post ID |
| `img` | `String` | Track image URL |
| `lov` | `Array` | User IDs who liked this post |
| `name` | `String` | Track name |
| `nbP` | `Integer` | Number of plays |
| `nbR` | `Integer` | Number of reposts |
| `score` | `Float` | Search relevance score |
| `src` | `Hash` |  |
| `text` | `String` | Post text/comment |
| `uId` | `String` | User ID of poster |
| `uNm` | `String` | User name of poster |
| `url` | `String` | Direct URL to track |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Post record (raises on error).
post = client.Post.load({ "genre" => "genre" })
```


### Search

Create an instance: `search = client.Search`

#### Operations

| Method | Description |
| --- | --- |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `q` | `String` | Search query |
| `results` | `Array` |  |

#### Example: List

```ruby
# list returns an Array of Search records (raises on error).
searchs = client.Search.list
```


### Subscription

Create an instance: `subscription = client.Subscription`

#### Operations

| Method | Description |
| --- | --- |
| `load(match)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `isSubscribing` | `Boolean` | Whether logged in user follows this user |
| `uId` | `String` | User ID |
| `uNm` | `String` | User name |

#### Example: Load

```ruby
# load returns the ENTITY — call data_get for the Subscription record (raises on error).
subscription = client.Subscription.load({ "id" => "subscription_id" })
```


### User

Create an instance: `user = client.User`

#### Operations

| Method | Description |
| --- | --- |
| `create(data)` | Create a new entity with the given data. |
| `list(match)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `Integer` | Playlist number |
| `name` | `String` | Playlist name |
| `nbTracks` | `Integer` | Number of tracks in playlist |
| `url` | `String` | Playlist URL |

#### Example: List

```ruby
# list returns an Array of User records (raises on error).
users = client.User.list
```

#### Example: Create

```ruby
user = client.User.create({
})
```


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

Features are the extension mechanism. A feature is a Ruby class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as hashes

The Ruby SDK uses plain Ruby hashes throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers.to_map()` to safely validate that a value is a hash.

### Module structure

```
rb/
├── Openwhyd_sdk.rb       -- Main SDK module
├── config.rb                  -- Configuration
├── features.rb                -- Feature factory
├── core/                      -- Core types and context
├── entity/                    -- Entity implementations
├── feature/                   -- Built-in features (Base, Test, Log)
├── utility/                   -- Utility functions and struct library
└── test/                      -- Test suites
```

The main module (`Openwhyd_sdk`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `list`, the entity
stores the returned data and match criteria internally.

```ruby
playlist = client.Playlist
playlist.list()

# playlist.data_get now returns the playlist data from the last list
# playlist.match_get returns the last match criteria
```

Call `make` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`direct` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `prepare` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
