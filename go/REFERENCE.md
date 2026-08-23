# Openwhyd Golang SDK Reference

Complete API reference for the Openwhyd Golang SDK.


## OpenwhydSDK

### Constructor

```go
func NewOpenwhydSDK(options map[string]any) *OpenwhydSDK
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `map[string]any` | SDK configuration options. |
| `options["apikey"]` | `string` | API key for authentication. |
| `options["base"]` | `string` | Base URL for API requests. |
| `options["prefix"]` | `string` | URL prefix appended after base. |
| `options["suffix"]` | `string` | URL suffix appended after path. |
| `options["headers"]` | `map[string]any` | Custom headers for all requests. |
| `options["feature"]` | `map[string]any` | Feature configuration. |
| `options["system"]` | `map[string]any` | System overrides (e.g. custom fetch). |


### Static Methods

#### `Test() *OpenwhydSDK`

No-arg convenience constructor for the common no-options test case.

```go
client := sdk.Test()
```

#### `TestSDK(testopts, sdkopts map[string]any) *OpenwhydSDK`

Test client with options. Both arguments may be `nil`.

```go
client := sdk.TestSDK(testopts, sdkopts)
```


### Instance Methods

#### `Authentication(data map[string]any) OpenwhydEntity`

Create a new `Authentication` entity instance. Pass `nil` for no initial data.

#### `GetUserPost(data map[string]any) OpenwhydEntity`

Create a new `GetUserPost` entity instance. Pass `nil` for no initial data.

#### `Playlist(data map[string]any) OpenwhydEntity`

Create a new `Playlist` entity instance. Pass `nil` for no initial data.

#### `Post(data map[string]any) OpenwhydEntity`

Create a new `Post` entity instance. Pass `nil` for no initial data.

#### `Search(data map[string]any) OpenwhydEntity`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `Subscription(data map[string]any) OpenwhydEntity`

Create a new `Subscription` entity instance. Pass `nil` for no initial data.

#### `User(data map[string]any) OpenwhydEntity`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `OptionsMap() map[string]any`

Return a deep copy of the current SDK options.

#### `GetUtility() *Utility`

Return a copy of the SDK utility object.

#### `Direct(fetchargs map[string]any) (map[string]any, error)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `map[string]any` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `map[string]any` | Query string parameters. |
| `fetchargs["headers"]` | `map[string]any` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (maps are JSON-serialized). |
| `fetchargs["ctrl"]` | `map[string]any` | Control options (e.g. `map[string]any{"explain": true}`). |

**Returns:** `(map[string]any, error)`

#### `Prepare(fetchargs map[string]any) (map[string]any, error)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `Direct()`.

**Returns:** `(map[string]any, error)`


---

## AuthenticationEntity

```go
authentication := client.Authentication(nil)
fmt.Println(authentication.GetName()) // "authentication"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `string` | No | User biography |
| `cvrImg` | `string` | No | Cover image URL |
| `email` | `string` | No | Email address |
| `error` | `string` | No | Error message if any |
| `handle` | `string` | No | Username/handle |
| `id` | `string` | No | User ID |
| `img` | `string` | No | Avatar URL |
| `isSubscribing` | `bool` | No | Whether logged in user subscribes to this user |
| `lastArtists` | `[]any` | No | Recently posted artists |
| `lastFm` | `map[string]any` | No |  |
| `lnk` | `map[string]any` | No |  |
| `loc` | `string` | No | User location |
| `name` | `string` | No | Full name |
| `nbLikes` | `int` | No | Number of likes |
| `nbPosts` | `int` | No | Number of posts |
| `nbSubscribers` | `int` | No | Number of subscribers |
| `nbSubscriptions` | `int` | No | Number of subscriptions |
| `pl` | `[]any` | No | User playlists |
| `redirect` | `string` | No | URL to redirect to |
| `twId` | `string` | No | Twitter handle |
| `twSec` | `string` | No | Twitter session secret |
| `twTok` | `string` | No | Twitter session token |
| `uId` | `string` | No | ID of new user if successful |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Authentication(nil).Load(map[string]any{"id": "authentication_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Authentication(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## GetUserPostEntity

```go
getUserPost := client.GetUserPost(nil)
fmt.Println(getUserPost.GetName()) // "get_user_post"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ctx` | `string` | No | Context |
| `eId` | `string` | No | External ID (platform identifier) |
| `id` | `string` | No | Post ID |
| `img` | `string` | No | Track image URL |
| `lov` | `[]any` | No | User IDs who liked this post |
| `name` | `string` | No | Track name |
| `nbP` | `int` | No | Number of plays |
| `nbR` | `int` | No | Number of reposts |
| `score` | `float64` | No | Search relevance score |
| `src` | `map[string]any` | No |  |
| `text` | `string` | No | Post text/comment |
| `uId` | `string` | No | User ID of poster |
| `uNm` | `string` | No | User name of poster |
| `url` | `string` | No | Direct URL to track |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.GetUserPost(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `GetUserPostEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PlaylistEntity

```go
playlist := client.Playlist(nil)
fmt.Println(playlist.GetName()) // "playlist"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No | Playlist number |
| `name` | `string` | No | Playlist name |
| `nbTracks` | `int` | No | Number of tracks in playlist |
| `url` | `string` | No | Playlist URL |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Playlist(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PlaylistEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## PostEntity

```go
post := client.Post(nil)
fmt.Println(post.GetName()) // "post"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ctx` | `string` | No | Context |
| `eId` | `string` | No | External ID (platform identifier) |
| `id` | `string` | No | Post ID |
| `img` | `string` | No | Track image URL |
| `lov` | `[]any` | No | User IDs who liked this post |
| `name` | `string` | No | Track name |
| `nbP` | `int` | No | Number of plays |
| `nbR` | `int` | No | Number of reposts |
| `score` | `float64` | No | Search relevance score |
| `src` | `map[string]any` | No |  |
| `text` | `string` | No | Post text/comment |
| `uId` | `string` | No | User ID of poster |
| `uNm` | `string` | No | User name of poster |
| `url` | `string` | No | Direct URL to track |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Post(nil).Load(map[string]any{"genre": "genre"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `PostEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SearchEntity

```go
search := client.Search(nil)
fmt.Println(search.GetName()) // "search"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `q` | `string` | No | Search query |
| `results` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Search(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## SubscriptionEntity

```go
subscription := client.Subscription(nil)
fmt.Println(subscription.GetName()) // "subscription"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `isSubscribing` | `bool` | No | Whether logged in user follows this user |
| `uId` | `string` | No | User ID |
| `uNm` | `string` | No | User name |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Subscription(nil).Load(map[string]any{"id": "subscription_id"}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `SubscriptionEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## UserEntity

```go
user := client.User(nil)
fmt.Println(user.GetName()) // "user"
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No | Playlist number |
| `name` | `string` | No | Playlist name |
| `nbTracks` | `int` | No | Number of tracks in playlist |
| `url` | `string` | No | Playlist URL |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.User(nil).List(nil, nil)
if err != nil {
    panic(err)
}
fmt.Println(results)
```

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.User(nil).Create(map[string]any{
}, nil)
if err != nil {
    panic(err)
}
fmt.Println(result)
```

### Common Methods

#### `Data(args ...any) any`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `Match(args ...any) any`

Get or set the entity match criteria. Works the same as `Data()`.

#### `Make() Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `GetName() string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```go
client := sdk.NewOpenwhydSDK(map[string]any{
    "feature": map[string]any{
        "test": map[string]any{"active": true},
    },
})
```

