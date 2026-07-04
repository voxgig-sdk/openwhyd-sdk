# Openwhyd Python SDK Reference

Complete API reference for the Openwhyd Python SDK.


## OpenwhydSDK

### Constructor

```python
from openwhyd_sdk import OpenwhydSDK

client = OpenwhydSDK(options)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `dict` | SDK configuration options. |
| `options["apikey"]` | `str` | API key for authentication. |
| `options["base"]` | `str` | Base URL for API requests. |
| `options["prefix"]` | `str` | URL prefix appended after base. |
| `options["suffix"]` | `str` | URL suffix appended after path. |
| `options["headers"]` | `dict` | Custom headers for all requests. |
| `options["feature"]` | `dict` | Feature configuration. |
| `options["system"]` | `dict` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenwhydSDK.test(testopts=None, sdkopts=None)`

Create a test client with mock features active. Both arguments may be `None`.

```python
client = OpenwhydSDK.test()
```


### Instance Methods

#### `Authentication(data=None)`

Create a new `AuthenticationEntity` instance. Pass `None` for no initial data.

#### `GetUserPost(data=None)`

Create a new `GetUserPostEntity` instance. Pass `None` for no initial data.

#### `Playlist(data=None)`

Create a new `PlaylistEntity` instance. Pass `None` for no initial data.

#### `Post(data=None)`

Create a new `PostEntity` instance. Pass `None` for no initial data.

#### `Search(data=None)`

Create a new `SearchEntity` instance. Pass `None` for no initial data.

#### `Subscription(data=None)`

Create a new `SubscriptionEntity` instance. Pass `None` for no initial data.

#### `User(data=None)`

Create a new `UserEntity` instance. Pass `None` for no initial data.

#### `options_map() -> dict`

Return a deep copy of the current SDK options.

#### `get_utility() -> Utility`

Return a copy of the SDK utility object.

#### `direct(fetchargs=None) -> dict`

Make a direct HTTP request to any API endpoint. Returns a result `dict` with `ok`, `status`, `headers`, and `data` (or `err` on failure). This escape hatch never raises — branch on `result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs["path"]` | `str` | URL path with optional `{param}` placeholders. |
| `fetchargs["method"]` | `str` | HTTP method (default: `"GET"`). |
| `fetchargs["params"]` | `dict` | Path parameter values. |
| `fetchargs["query"]` | `dict` | Query string parameters. |
| `fetchargs["headers"]` | `dict` | Request headers (merged with defaults). |
| `fetchargs["body"]` | `any` | Request body (dicts are JSON-serialized). |

**Returns:** `result_dict`

#### `prepare(fetchargs=None) -> dict`

Prepare a fetch definition without sending. Returns the `fetchdef` and raises on error.


---

## AuthenticationEntity

```python
authentication = client.authentication
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `error` | ``$STRING`` | No |  |
| `ok` | ``$STRING`` | No |  |
| `redirect` | ``$STRING`` | No |  |
| `u_id` | ``$STRING`` | No |  |
| `user` | ``$OBJECT`` | No |  |
| `wrong_password` | ``$INTEGER`` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.authentication.create({
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.authentication.load({"id": "authentication_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `AuthenticationEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## GetUserPostEntity

```python
get_user_post = client.get_user_post
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ctx` | ``$STRING`` | No |  |
| `e_id` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `img` | ``$STRING`` | No |  |
| `lov` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | No |  |
| `nb_p` | ``$INTEGER`` | No |  |
| `nb_r` | ``$INTEGER`` | No |  |
| `score` | ``$NUMBER`` | No |  |
| `src` | ``$OBJECT`` | No |  |
| `text` | ``$STRING`` | No |  |
| `u_id` | ``$STRING`` | No |  |
| `u_nm` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.get_user_post.list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `GetUserPostEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PlaylistEntity

```python
playlist = client.playlist
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `nb_track` | ``$INTEGER`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.playlist.list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PlaylistEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## PostEntity

```python
post = client.post
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ctx` | ``$STRING`` | No |  |
| `e_id` | ``$STRING`` | No |  |
| `id` | ``$STRING`` | No |  |
| `img` | ``$STRING`` | No |  |
| `lov` | ``$ARRAY`` | No |  |
| `name` | ``$STRING`` | No |  |
| `nb_p` | ``$INTEGER`` | No |  |
| `nb_r` | ``$INTEGER`` | No |  |
| `score` | ``$NUMBER`` | No |  |
| `src` | ``$OBJECT`` | No |  |
| `text` | ``$STRING`` | No |  |
| `u_id` | ``$STRING`` | No |  |
| `u_nm` | ``$STRING`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.post.load({"id": "post_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `PostEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SearchEntity

```python
search = client.search
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `q` | ``$STRING`` | No |  |
| `result` | ``$ARRAY`` | No |  |

### Operations

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.search.list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SearchEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## SubscriptionEntity

```python
subscription = client.subscription
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_subscribing` | ``$BOOLEAN`` | No |  |
| `u_id` | ``$STRING`` | No |  |
| `u_nm` | ``$STRING`` | No |  |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.subscription.load({"id": "subscription_id"})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `SubscriptionEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## UserEntity

```python
user = client.user
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `nb_track` | ``$INTEGER`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.user.create({
})
```

#### `list(reqmatch, ctrl=None) -> list`

List entities matching the given criteria. Returns a list and raises on error.

```python
results = client.user.list({})
```

### Common Methods

#### `data_get() -> dict`

Get the entity data.

#### `data_set(data)`

Set the entity data.

#### `match_get() -> dict`

Get the entity match criteria.

#### `match_set(match)`

Set the entity match criteria.

#### `make() -> Entity`

Create a new `UserEntity` instance with the same options.

#### `get_name() -> str`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```python
client = OpenwhydSDK({
    "feature": {
        "test": {"active": True},
    },
})
```

