# Openwhyd Golang SDK



The Golang SDK for the Openwhyd API — an entity-oriented client using standard Go conventions. No generics required; data flows as `map[string]any`.

It exposes the API as capitalised, semantic **Entities** — e.g. `client.Authentication(nil)` — each with the same small set of operations (`List`, `Load`, `Create`) instead of raw URL paths and query strings. You call meaning, not endpoints, which keeps the cognitive load low.

> Also generated from this model: `go-cli`, `go-mcp`, `lua`, `php`, `py`, `rb`, `ts` — see
> the [top-level README](../README.md).


## Install
```bash
go get github.com/voxgig-sdk/openwhyd-sdk/go@latest
```

The Go module proxy resolves the version from the `go/vX.Y.Z` GitHub
release tag — see [Releases](https://github.com/voxgig-sdk/openwhyd-sdk/releases) for the available versions.

To vendor from a local checkout instead, clone this repo alongside your
project and add a `replace` directive pointing at the checked-out
`go/` directory:

```bash
go mod edit -replace github.com/voxgig-sdk/openwhyd-sdk/go=../openwhyd-sdk/go
```


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### Quickstart

A complete program: create a client, then call the entity operations.
Each operation returns `(value, error)` — the value is the data itself
(there is no `{ok, data}` wrapper), so check `err` and use the value
directly.

```go
package main

import (
    "fmt"
    "os"
    sdk "github.com/voxgig-sdk/openwhyd-sdk/go"
)

func main() {
    client := sdk.NewOpenwhydSDK(map[string]any{
        "apikey": os.Getenv("OPENWHYD_APIKEY"),
    })

    // Load a single authentication — the value is the loaded record.
    authentication, err := client.Authentication(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(authentication)

    // Create a authentication.
    created, err := client.Authentication(nil).Create(map[string]any{"bio": "example_bio", "cvrImg": "example_cvrImg"}, nil)
    if err != nil {
        panic(err)
    }
    fmt.Println(created)
}
```


## Error handling

Every entity operation returns `(value, error)`. Check `err` before
using the value — there is no exception to catch:

```go
playlists, err := client.Playlist(nil).List(nil, nil)
if err != nil {
    // handle err
    return
}
_ = playlists
```

`Direct` follows the same `(value, error)` convention:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example_id"},
})
if err != nil {
    // handle err
}
_ = result
```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

if result["ok"] == true {
    fmt.Println(result["status"]) // 200
    fmt.Println(result["data"])   // response body
}
```

### Prepare a request without sending it

```go
fetchdef, err := client.Prepare(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "DELETE",
    "params": map[string]any{"id": "example"},
})
if err != nil {
    panic(err)
}

fmt.Println(fetchdef["url"])
fmt.Println(fetchdef["method"])
fmt.Println(fetchdef["headers"])
```

### Use test mode

Create a mock client for unit testing — no server required:

```go
client := sdk.Test()

playlist, err := client.Playlist(nil).List(
    nil, nil,
)
if err != nil {
    panic(err)
}
fmt.Println(playlist) // the returned mock data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```go
mockFetch := func(url string, init map[string]any) (map[string]any, error) {
    return map[string]any{
        "status":     200,
        "statusText": "OK",
        "headers":    map[string]any{},
        "json": (func() any)(func() any {
            return map[string]any{"id": "mock01"}
        }),
    }, nil
}

client := sdk.NewOpenwhydSDK(map[string]any{
    "base": "http://localhost:8080",
    "system": map[string]any{
        "fetch": (func(string, map[string]any) (map[string]any, error))(mockFetch),
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
cd go && go test ./test/...
```


## Reference

### NewOpenwhydSDK

```go
func NewOpenwhydSDK(options map[string]any) *OpenwhydSDK
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `"apikey"` | `string` | API key for authentication. |
| `"base"` | `string` | Base URL of the API server. |
| `"prefix"` | `string` | URL path prefix prepended to all requests. |
| `"suffix"` | `string` | URL path suffix appended to all requests. |
| `"feature"` | `map[string]any` | Feature activation flags. |
| `"extend"` | `[]any` | Additional Feature instances to load. |
| `"system"` | `map[string]any` | System overrides (e.g. custom `"fetch"` function). |

### TestSDK

```go
func TestSDK(testopts map[string]any, sdkopts map[string]any) *OpenwhydSDK
```

Creates a test-mode client with mock transport. Both arguments may be `nil`.

### OpenwhydSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `OptionsMap` | `() map[string]any` | Deep copy of current SDK options. |
| `GetUtility` | `() *Utility` | Copy of the SDK utility object. |
| `Prepare` | `(fetchargs map[string]any) (map[string]any, error)` | Build an HTTP request definition without sending. |
| `Direct` | `(fetchargs map[string]any) (map[string]any, error)` | Build and send an HTTP request. |
| `Authentication` | `(data map[string]any) OpenwhydEntity` | Create an Authentication entity instance. |
| `GetUserPost` | `(data map[string]any) OpenwhydEntity` | Create a GetUserPost entity instance. |
| `Playlist` | `(data map[string]any) OpenwhydEntity` | Create a Playlist entity instance. |
| `Post` | `(data map[string]any) OpenwhydEntity` | Create a Post entity instance. |
| `Search` | `(data map[string]any) OpenwhydEntity` | Create a Search entity instance. |
| `Subscription` | `(data map[string]any) OpenwhydEntity` | Create a Subscription entity instance. |
| `User` | `(data map[string]any) OpenwhydEntity` | Create an User entity instance. |

### Entity interface (OpenwhydEntity)

All entities implement the `OpenwhydEntity` interface.

| Method | Signature | Description |
| --- | --- | --- |
| `Load` | `(reqmatch, ctrl map[string]any) (any, error)` | Load a single entity by match criteria. |
| `List` | `(reqmatch, ctrl map[string]any) (any, error)` | List entities matching the criteria. |
| `Create` | `(reqdata, ctrl map[string]any) (any, error)` | Create a new entity. |
| `Data` | `(args ...any) any` | Get or set entity data. |
| `Match` | `(args ...any) any` | Get or set entity match criteria. |
| `Make` | `() Entity` | Create a new instance with the same options. |
| `GetName` | `() string` | Return the entity name. |

### Result shape

Entity operations return `(value, error)`. The `value` is the
operation's data **directly** — there is no wrapper:

| Operation | `value` |
| --- | --- |
| `Load` / `Create` | the entity record (`map[string]any`) |
| `List` | a `[]any` of entity records |

Check `err` first, then use the value directly (or the typed
`...Typed` variants, which return the entity's model struct and a typed
slice):

    authentication, err := client.Authentication(nil).Load(map[string]any{"id": "example_id"}, nil)
    if err != nil { /* handle */ }
    // authentication is the returned record

Only `Direct()` returns a response envelope — a `map[string]any` with
`"ok"`, `"status"`, `"headers"`, and `"data"` keys.

### Entities

#### Authentication

| Field | Description |
| --- | --- |
| `"bio"` | User biography |
| `"cvrImg"` | Cover image URL |
| `"email"` | Email address |
| `"error"` | Error message if any |
| `"handle"` | Username/handle |
| `"id"` | User ID |
| `"img"` | Avatar URL |
| `"isSubscribing"` | Whether logged in user subscribes to this user |
| `"lastArtists"` | Recently posted artists |
| `"lastFm"` |  |
| `"lnk"` |  |
| `"loc"` | User location |
| `"name"` | Full name |
| `"nbLikes"` | Number of likes |
| `"nbPosts"` | Number of posts |
| `"nbSubscribers"` | Number of subscribers |
| `"nbSubscriptions"` | Number of subscriptions |
| `"pl"` | User playlists |
| `"redirect"` | URL to redirect to |
| `"twId"` | Twitter handle |
| `"twSec"` | Twitter session secret |
| `"twTok"` | Twitter session token |
| `"uId"` | ID of new user if successful |

Operations: Create, Load.

API path: `/login`

#### GetUserPost

| Field | Description |
| --- | --- |
| `"ctx"` | Context |
| `"eId"` | External ID (platform identifier) |
| `"id"` | Post ID |
| `"img"` | Track image URL |
| `"lov"` | User IDs who liked this post |
| `"name"` | Track name |
| `"nbP"` | Number of plays |
| `"nbR"` | Number of reposts |
| `"score"` | Search relevance score |
| `"src"` |  |
| `"text"` | Post text/comment |
| `"uId"` | User ID of poster |
| `"uNm"` | User name of poster |
| `"url"` | Direct URL to track |

Operations: List.

API path: `/{username}`

#### Playlist

| Field | Description |
| --- | --- |
| `"id"` | Playlist number |
| `"name"` | Playlist name |
| `"nbTracks"` | Number of tracks in playlist |
| `"url"` | Playlist URL |

Operations: List.

API path: `/{username}/playlists`

#### Post

| Field | Description |
| --- | --- |
| `"ctx"` | Context |
| `"eId"` | External ID (platform identifier) |
| `"id"` | Post ID |
| `"img"` | Track image URL |
| `"lov"` | User IDs who liked this post |
| `"name"` | Track name |
| `"nbP"` | Number of plays |
| `"nbR"` | Number of reposts |
| `"score"` | Search relevance score |
| `"src"` |  |
| `"text"` | Post text/comment |
| `"uId"` | User ID of poster |
| `"uNm"` | User name of poster |
| `"url"` | Direct URL to track |

Operations: Load.

API path: `/{username}/playlist/{playlistId}`

#### Search

| Field | Description |
| --- | --- |
| `"q"` | Search query |
| `"results"` |  |

Operations: List.

API path: `/search`

#### Subscription

| Field | Description |
| --- | --- |
| `"isSubscribing"` | Whether logged in user follows this user |
| `"uId"` | User ID |
| `"uNm"` | User name |

Operations: Load.

API path: `/api/follow/fetchFollowers/{id}`

#### User

| Field | Description |
| --- | --- |
| `"id"` | Playlist number |
| `"name"` | Playlist name |
| `"nbTracks"` | Number of tracks in playlist |
| `"url"` | Playlist URL |

Operations: Create, List.

API path: `/api/user`



## Entities


### Authentication

Create an instance: `authentication := client.Authentication(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

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
| `isSubscribing` | `bool` | Whether logged in user subscribes to this user |
| `lastArtists` | `[]any` | Recently posted artists |
| `lastFm` | `map[string]any` |  |
| `lnk` | `map[string]any` |  |
| `loc` | `string` | User location |
| `name` | `string` | Full name |
| `nbLikes` | `int` | Number of likes |
| `nbPosts` | `int` | Number of posts |
| `nbSubscribers` | `int` | Number of subscribers |
| `nbSubscriptions` | `int` | Number of subscriptions |
| `pl` | `[]any` | User playlists |
| `redirect` | `string` | URL to redirect to |
| `twId` | `string` | Twitter handle |
| `twSec` | `string` | Twitter session secret |
| `twTok` | `string` | Twitter session token |
| `uId` | `string` | ID of new user if successful |

#### Example: Load

```go
authentication, err := client.Authentication(nil).Load(map[string]any{"id": "authentication_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(authentication) // the loaded record
```

#### Example: Create

```go
result, err := client.Authentication(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```


### GetUserPost

Create an instance: `getUserPost := client.GetUserPost(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ctx` | `string` | Context |
| `eId` | `string` | External ID (platform identifier) |
| `id` | `string` | Post ID |
| `img` | `string` | Track image URL |
| `lov` | `[]any` | User IDs who liked this post |
| `name` | `string` | Track name |
| `nbP` | `int` | Number of plays |
| `nbR` | `int` | Number of reposts |
| `score` | `float64` | Search relevance score |
| `src` | `map[string]any` |  |
| `text` | `string` | Post text/comment |
| `uId` | `string` | User ID of poster |
| `uNm` | `string` | User name of poster |
| `url` | `string` | Direct URL to track |

#### Example: List

```go
getUserPosts, err := client.GetUserPost(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(getUserPosts) // the array of records
```


### Playlist

Create an instance: `playlist := client.Playlist(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` | Playlist number |
| `name` | `string` | Playlist name |
| `nbTracks` | `int` | Number of tracks in playlist |
| `url` | `string` | Playlist URL |

#### Example: List

```go
playlists, err := client.Playlist(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(playlists) // the array of records
```


### Post

Create an instance: `post := client.Post(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `ctx` | `string` | Context |
| `eId` | `string` | External ID (platform identifier) |
| `id` | `string` | Post ID |
| `img` | `string` | Track image URL |
| `lov` | `[]any` | User IDs who liked this post |
| `name` | `string` | Track name |
| `nbP` | `int` | Number of plays |
| `nbR` | `int` | Number of reposts |
| `score` | `float64` | Search relevance score |
| `src` | `map[string]any` |  |
| `text` | `string` | Post text/comment |
| `uId` | `string` | User ID of poster |
| `uNm` | `string` | User name of poster |
| `url` | `string` | Direct URL to track |

#### Example: Load

```go
post, err := client.Post(nil).Load(map[string]any{"genre": "genre"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(post) // the loaded record
```


### Search

Create an instance: `search := client.Search(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `q` | `string` | Search query |
| `results` | `[]any` |  |

#### Example: List

```go
searchs, err := client.Search(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(searchs) // the array of records
```


### Subscription

Create an instance: `subscription := client.Subscription(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `Load(match, ctrl)` | Load a single entity by match criteria. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `isSubscribing` | `bool` | Whether logged in user follows this user |
| `uId` | `string` | User ID |
| `uNm` | `string` | User name |

#### Example: Load

```go
subscription, err := client.Subscription(nil).Load(map[string]any{"id": "subscription_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(subscription) // the loaded record
```


### User

Create an instance: `user := client.User(nil)`

#### Operations

| Method | Description |
| --- | --- |
| `List(match, ctrl)` | List entities matching the criteria. |
| `Create(data, ctrl)` | Create a new entity with the given data. |

#### Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `int` | Playlist number |
| `name` | `string` | Playlist name |
| `nbTracks` | `int` | Number of tracks in playlist |
| `url` | `string` | Playlist URL |

#### Example: List

```go
users, err := client.User(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(users) // the array of records
```

#### Example: Create

```go
result, err := client.User(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
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

Features are the extension mechanism. A feature implements the
`Feature` interface and provides hooks — functions keyed by pipeline
stage names.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as maps

The Go SDK uses `map[string]any` throughout rather than typed structs.
This mirrors the dynamic nature of the API and keeps the SDK
flexible — no code generation is needed when the API schema changes.

Use `core.ToMapAny()` to safely cast results and nested data.

### Package structure

```
github.com/voxgig-sdk/openwhyd-sdk/go/
├── openwhyd.go        # Root package — type aliases and constructors
├── core/               # SDK core — client, types, pipeline
├── entity/             # Entity implementations
├── feature/            # Built-in features (Base, Test, Log)
├── utility/            # Utility functions and struct library
└── test/               # Test suites
```

The root package (`github.com/voxgig-sdk/openwhyd-sdk/go`) re-exports everything needed
for normal use. Import sub-packages only when you need specific types
like `core.ToMapAny`.

### Entity state

Entity instances are stateful. After a successful `List`, the entity
stores the returned data and match criteria internally.

```go
playlist := client.Playlist(nil)
playlist.List(nil, nil)

// playlist.Data() now returns the playlist data from the last list
// playlist.Match() returns the last match criteria
```

Call `Make()` to create a fresh instance with the same configuration
but no stored state.

### Direct vs entity access

The entity interface handles URL construction, parameter placement,
and response parsing automatically. Use it for standard CRUD operations.

`Direct()` gives full control over the HTTP request. Use it for
non-standard endpoints, bulk operations, or any path not modelled as
an entity. `Prepare()` builds the request without sending it — useful
for debugging or custom transport.


## Full Reference

See [REFERENCE.md](REFERENCE.md) for complete API reference
documentation including all method signatures, entity field schemas,
and detailed usage examples.
