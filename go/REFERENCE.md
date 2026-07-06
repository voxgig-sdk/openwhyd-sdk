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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | `string` | No |  |
| `ok` | `string` | No |  |
| `redirect` | `string` | No |  |
| `u_id` | `string` | No |  |
| `user` | `map[string]any` | No |  |
| `wrong_password` | `int` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.Authentication(nil).Create(map[string]any{
}, nil)
```

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Authentication(nil).Load(nil, nil)
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
get_user_post := client.GetUserPost(nil)
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ctx` | `string` | No |  |
| `e_id` | `string` | No |  |
| `id` | `string` | No |  |
| `img` | `string` | No |  |
| `lov` | `[]any` | No |  |
| `name` | `string` | No |  |
| `nb_p` | `int` | No |  |
| `nb_r` | `int` | No |  |
| `score` | `float64` | No |  |
| `src` | `map[string]any` | No |  |
| `text` | `string` | No |  |
| `u_id` | `string` | No |  |
| `u_nm` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.GetUserPost(nil).List(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `nb_track` | `int` | No |  |
| `url` | `string` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Playlist(nil).List(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ctx` | `string` | No |  |
| `e_id` | `string` | No |  |
| `id` | `string` | No |  |
| `img` | `string` | No |  |
| `lov` | `[]any` | No |  |
| `name` | `string` | No |  |
| `nb_p` | `int` | No |  |
| `nb_r` | `int` | No |  |
| `score` | `float64` | No |  |
| `src` | `map[string]any` | No |  |
| `text` | `string` | No |  |
| `u_id` | `string` | No |  |
| `u_nm` | `string` | No |  |
| `url` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Post(nil).Load(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `q` | `string` | No |  |
| `result` | `[]any` | No |  |

### Operations

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.Search(nil).List(nil, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_subscribing` | `bool` | No |  |
| `u_id` | `string` | No |  |
| `u_nm` | `string` | No |  |

### Operations

#### `Load(reqmatch, ctrl map[string]any) (any, error)`

Load a single entity matching the given criteria.

```go
result, err := client.Subscription(nil).Load(map[string]any{"id": "subscription_id"}, nil)
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
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No |  |
| `name` | `string` | No |  |
| `nb_track` | `int` | No |  |
| `url` | `string` | No |  |

### Operations

#### `Create(reqdata, ctrl map[string]any) (any, error)`

Create a new entity with the given data.

```go
result, err := client.User(nil).Create(map[string]any{
}, nil)
```

#### `List(reqmatch, ctrl map[string]any) (any, error)`

List entities matching the given criteria. Returns an array.

```go
results, err := client.User(nil).List(nil, nil)
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

