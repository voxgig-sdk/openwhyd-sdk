# Openwhyd Ruby SDK Reference

Complete API reference for the Openwhyd Ruby SDK.


## OpenwhydSDK

### Constructor

```ruby
require_relative 'Openwhyd_sdk'

client = OpenwhydSDK.new(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `Hash` | SDK configuration options. |
| `options["apikey"]` | `String` | API key for authentication. |
| `options["base"]` | `String` | Base URL for API requests. |
| `options["prefix"]` | `String` | URL prefix appended after base. |
| `options["suffix"]` | `String` | URL suffix appended after path. |
| `options["headers"]` | `Hash` | Custom headers for all requests. |
| `options["feature"]` | `Hash` | Feature configuration. |
| `options["system"]` | `Hash` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenwhydSDK.test(testopts = nil, sdkopts = nil)`

Create a test client with mock features active. Both arguments may be `nil`.

```ruby
client = OpenwhydSDK.test
```


### Instance Methods

#### `Authentication(data = nil)`

Create a new `Authentication` entity instance. Pass `nil` for no initial data.

#### `GetUserPost(data = nil)`

Create a new `GetUserPost` entity instance. Pass `nil` for no initial data.

#### `Playlist(data = nil)`

Create a new `Playlist` entity instance. Pass `nil` for no initial data.

#### `Post(data = nil)`

Create a new `Post` entity instance. Pass `nil` for no initial data.

#### `Search(data = nil)`

Create a new `Search` entity instance. Pass `nil` for no initial data.

#### `Subscription(data = nil)`

Create a new `Subscription` entity instance. Pass `nil` for no initial data.

#### `User(data = nil)`

Create a new `User` entity instance. Pass `nil` for no initial data.

#### `options_map -> Hash`

Return a deep copy of the current SDK options.

#### `get_utility -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs = {}) -> Hash`

Make a direct HTTP request to any API endpoint. Returns a result hash
(`{ "ok" => ..., "status" => ..., "data" => ..., "err" => ... }`); it
does not raise — inspect `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `String` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `String` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `Hash` | Path parameter values for `{param}` substitution. |
| `fetchargs["query"]` | `Hash` | Query string parameters. |
| `fetchargs["headers"]` | `Hash` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (hashes are JSON-serialized). |
| `fetchargs["ctrl"]` | `Hash` | Control options (e.g. `{ "explain" => true }`). |

**Returns:** `Hash`

#### `prepare(fetchargs = {}) -> Hash`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`. Raises on error.

**Returns:** `Hash` (the fetch definition; raises on error)


---

## AuthenticationEntity

```ruby
authentication = client.Authentication
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `String` | No | User biography |
| `cvrImg` | `String` | No | Cover image URL |
| `email` | `String` | No | Email address |
| `error` | `String` | No | Error message if any |
| `handle` | `String` | No | Username/handle |
| `id` | `String` | No | User ID |
| `img` | `String` | No | Avatar URL |
| `isSubscribing` | `Boolean` | No | Whether logged in user subscribes to this user |
| `lastArtists` | `Array` | No | Recently posted artists |
| `lastFm` | `Hash` | No |  |
| `lnk` | `Hash` | No |  |
| `loc` | `String` | No | User location |
| `name` | `String` | No | Full name |
| `nbLikes` | `Integer` | No | Number of likes |
| `nbPosts` | `Integer` | No | Number of posts |
| `nbSubscribers` | `Integer` | No | Number of subscribers |
| `nbSubscriptions` | `Integer` | No | Number of subscriptions |
| `pl` | `Array` | No | User playlists |
| `redirect` | `String` | No | URL to redirect to |
| `twId` | `String` | No | Twitter handle |
| `twSec` | `String` | No | Twitter session secret |
| `twTok` | `String` | No | Twitter session token |
| `uId` | `String` | No | ID of new user if successful |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.Authentication.create({
})
```

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Authentication.load({ "id" => "authentication_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## GetUserPostEntity

```ruby
get_user_post = client.GetUserPost
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ctx` | `String` | No | Context |
| `eId` | `String` | No | External ID (platform identifier) |
| `id` | `String` | No | Post ID |
| `img` | `String` | No | Track image URL |
| `lov` | `Array` | No | User IDs who liked this post |
| `name` | `String` | No | Track name |
| `nbP` | `Integer` | No | Number of plays |
| `nbR` | `Integer` | No | Number of reposts |
| `score` | `Float` | No | Search relevance score |
| `src` | `Hash` | No |  |
| `text` | `String` | No | Post text/comment |
| `uId` | `String` | No | User ID of poster |
| `uNm` | `String` | No | User name of poster |
| `url` | `String` | No | Direct URL to track |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.GetUserPost.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `GetUserPostEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PlaylistEntity

```ruby
playlist = client.Playlist
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `Integer` | No | Playlist number |
| `name` | `String` | No | Playlist name |
| `nbTracks` | `Integer` | No | Number of tracks in playlist |
| `url` | `String` | No | Playlist URL |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Playlist.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PlaylistEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## PostEntity

```ruby
post = client.Post
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ctx` | `String` | No | Context |
| `eId` | `String` | No | External ID (platform identifier) |
| `id` | `String` | No | Post ID |
| `img` | `String` | No | Track image URL |
| `lov` | `Array` | No | User IDs who liked this post |
| `name` | `String` | No | Track name |
| `nbP` | `Integer` | No | Number of plays |
| `nbR` | `Integer` | No | Number of reposts |
| `score` | `Float` | No | Search relevance score |
| `src` | `Hash` | No |  |
| `text` | `String` | No | Post text/comment |
| `uId` | `String` | No | User ID of poster |
| `uNm` | `String` | No | User name of poster |
| `url` | `String` | No | Direct URL to track |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Post.load({ "genre" => "genre" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `PostEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SearchEntity

```ruby
search = client.Search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `q` | `String` | No | Search query |
| `results` | `Array` | No |  |

### Operations

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.Search.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SearchEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## SubscriptionEntity

```ruby
subscription = client.Subscription
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `String` | No |  |
| `isSubscribing` | `Boolean` | No | Whether logged in user follows this user |
| `uId` | `String` | No | User ID |
| `uNm` | `String` | No | User name |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Subscription.load({ "id" => "subscription_id" })
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `SubscriptionEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## UserEntity

```ruby
user = client.User
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `Integer` | No | Playlist number |
| `name` | `String` | No | Playlist name |
| `nbTracks` | `Integer` | No | Number of tracks in playlist |
| `url` | `String` | No | Playlist URL |

### Operations

#### `create(reqdata, ctrl = nil) -> result`

Create a new entity with the given data. Raises on error.

```ruby
result = client.User.create({
})
```

#### `list(reqmatch = nil, ctrl = nil) -> Array`

List entities matching the given criteria (call with no argument to list all). Returns an array. Raises on error.

```ruby
results = client.User.list
```

### Common Methods

#### `data_get -> Hash`

Get the entity data. Returns a copy of the current data.

#### `data_set(data)`

Set the entity data.

#### `match_get -> Hash`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make -> Entity`

Create a new `UserEntity` instance with the same client and
options.

#### `get_name -> String`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ruby
client = OpenwhydSDK.new({
  "feature" => {
    "test" => { "active" => true },
  },
})
```

