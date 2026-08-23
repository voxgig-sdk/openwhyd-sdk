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
authentication = client.Authentication()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `bio` | `str` | No | User biography |
| `cvrImg` | `str` | No | Cover image URL |
| `email` | `str` | No | Email address |
| `error` | `str` | No | Error message if any |
| `handle` | `str` | No | Username/handle |
| `id` | `str` | No | User ID |
| `img` | `str` | No | Avatar URL |
| `isSubscribing` | `bool` | No | Whether logged in user subscribes to this user |
| `lastArtists` | `list` | No | Recently posted artists |
| `lastFm` | `dict` | No |  |
| `lnk` | `dict` | No |  |
| `loc` | `str` | No | User location |
| `name` | `str` | No | Full name |
| `nbLikes` | `int` | No | Number of likes |
| `nbPosts` | `int` | No | Number of posts |
| `nbSubscribers` | `int` | No | Number of subscribers |
| `nbSubscriptions` | `int` | No | Number of subscriptions |
| `pl` | `list` | No | User playlists |
| `redirect` | `str` | No | URL to redirect to |
| `twId` | `str` | No | Twitter handle |
| `twSec` | `str` | No | Twitter session secret |
| `twTok` | `str` | No | Twitter session token |
| `uId` | `str` | No | ID of new user if successful |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.Authentication().create({
})
```

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Authentication().load({"id": "authentication_id"})
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
get_user_post = client.GetUserPost()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ctx` | `str` | No | Context |
| `eId` | `str` | No | External ID (platform identifier) |
| `id` | `str` | No | Post ID |
| `img` | `str` | No | Track image URL |
| `lov` | `list` | No | User IDs who liked this post |
| `name` | `str` | No | Track name |
| `nbP` | `int` | No | Number of plays |
| `nbR` | `int` | No | Number of reposts |
| `score` | `float` | No | Search relevance score |
| `src` | `dict` | No |  |
| `text` | `str` | No | Post text/comment |
| `uId` | `str` | No | User ID of poster |
| `uNm` | `str` | No | User name of poster |
| `url` | `str` | No | Direct URL to track |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.GetUserPost().list({"id": "example"})
for get_user_post in results:
    print(get_user_post)
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
playlist = client.Playlist()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No | Playlist number |
| `name` | `str` | No | Playlist name |
| `nbTracks` | `int` | No | Number of tracks in playlist |
| `url` | `str` | No | Playlist URL |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Playlist().list({"username": "example"})
for playlist in results:
    print(playlist)
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
post = client.Post()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ctx` | `str` | No | Context |
| `eId` | `str` | No | External ID (platform identifier) |
| `id` | `str` | No | Post ID |
| `img` | `str` | No | Track image URL |
| `lov` | `list` | No | User IDs who liked this post |
| `name` | `str` | No | Track name |
| `nbP` | `int` | No | Number of plays |
| `nbR` | `int` | No | Number of reposts |
| `score` | `float` | No | Search relevance score |
| `src` | `dict` | No |  |
| `text` | `str` | No | Post text/comment |
| `uId` | `str` | No | User ID of poster |
| `uNm` | `str` | No | User name of poster |
| `url` | `str` | No | Direct URL to track |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Post().load({"genre": "genre"})
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
search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `q` | `str` | No | Search query |
| `results` | `list` | No |  |

### Operations

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.Search().list()
for search in results:
    print(search)
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
subscription = client.Subscription()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `isSubscribing` | `bool` | No | Whether logged in user follows this user |
| `uId` | `str` | No | User ID |
| `uNm` | `str` | No | User name |

### Operations

#### `load(reqmatch, ctrl=None) -> dict`

Load a single entity matching the given criteria. Returns the entity data and raises on error.

```python
result = client.Subscription().load({"id": "subscription_id"})
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
user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `int` | No | Playlist number |
| `name` | `str` | No | Playlist name |
| `nbTracks` | `int` | No | Number of tracks in playlist |
| `url` | `str` | No | Playlist URL |

### Operations

#### `create(reqdata, ctrl=None) -> dict`

Create a new entity with the given data. Returns the created entity data and raises on error.

```python
result = client.User().create({
})
```

#### `list(reqmatch=None, ctrl=None) -> list`

List entities matching the given criteria. The match is optional — call `list()` with no argument to list all records. Returns a list and raises on error.

```python
results = client.User().list()
for user in results:
    print(user)
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

