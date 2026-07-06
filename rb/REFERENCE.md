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
| `error` | `String` | No |  |
| `ok` | `String` | No |  |
| `redirect` | `String` | No |  |
| `u_id` | `String` | No |  |
| `user` | `Hash` | No |  |
| `wrong_password` | `Integer` | No |  |

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
result = client.Authentication.load()
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
| `ctx` | `String` | No |  |
| `e_id` | `String` | No |  |
| `id` | `String` | No |  |
| `img` | `String` | No |  |
| `lov` | `Array` | No |  |
| `name` | `String` | No |  |
| `nb_p` | `Integer` | No |  |
| `nb_r` | `Integer` | No |  |
| `score` | `Float` | No |  |
| `src` | `Hash` | No |  |
| `text` | `String` | No |  |
| `u_id` | `String` | No |  |
| `u_nm` | `String` | No |  |
| `url` | `String` | No |  |

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
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `nb_track` | `Integer` | No |  |
| `url` | `String` | No |  |

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
| `ctx` | `String` | No |  |
| `e_id` | `String` | No |  |
| `id` | `String` | No |  |
| `img` | `String` | No |  |
| `lov` | `Array` | No |  |
| `name` | `String` | No |  |
| `nb_p` | `Integer` | No |  |
| `nb_r` | `Integer` | No |  |
| `score` | `Float` | No |  |
| `src` | `Hash` | No |  |
| `text` | `String` | No |  |
| `u_id` | `String` | No |  |
| `u_nm` | `String` | No |  |
| `url` | `String` | No |  |

### Operations

#### `load(reqmatch, ctrl = nil) -> result`

Load a single entity matching the given criteria. Raises on error.

```ruby
result = client.Post.load()
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
| `q` | `String` | No |  |
| `result` | `Array` | No |  |

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
| `is_subscribing` | `Boolean` | No |  |
| `u_id` | `String` | No |  |
| `u_nm` | `String` | No |  |

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
| `id` | `Integer` | No |  |
| `name` | `String` | No |  |
| `nb_track` | `Integer` | No |  |
| `url` | `String` | No |  |

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

