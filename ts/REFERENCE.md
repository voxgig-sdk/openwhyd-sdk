# Openwhyd TypeScript SDK Reference

Complete API reference for the Openwhyd TypeScript SDK.


## OpenwhydSDK

### Constructor

```ts
new OpenwhydSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.apikey` | `string` | API key for authentication. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenwhydSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = OpenwhydSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `OpenwhydSDK` instance in test mode.


### Instance Methods

#### `Authentication(data?: object)`

Create a new `Authentication` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AuthenticationEntity` instance.

#### `GetUserPost(data?: object)`

Create a new `GetUserPost` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `GetUserPostEntity` instance.

#### `Playlist(data?: object)`

Create a new `Playlist` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PlaylistEntity` instance.

#### `Post(data?: object)`

Create a new `Post` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `PostEntity` instance.

#### `Search(data?: object)`

Create a new `Search` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SearchEntity` instance.

#### `Subscription(data?: object)`

Create a new `Subscription` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `SubscriptionEntity` instance.

#### `User(data?: object)`

Create a new `User` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `UserEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `OpenwhydSDK.test()`.

**Returns:** `OpenwhydSDK` instance in test mode.


---

## AuthenticationEntity

```ts
const authentication = client.Authentication()
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
| `isSubscribing` | `boolean` | No | Whether logged in user subscribes to this user |
| `lastArtists` | `any[]` | No | Recently posted artists |
| `lastFm` | `Record<string, any>` | No |  |
| `lnk` | `Record<string, any>` | No |  |
| `loc` | `string` | No | User location |
| `name` | `string` | No | Full name |
| `nbLikes` | `number` | No | Number of likes |
| `nbPosts` | `number` | No | Number of posts |
| `nbSubscribers` | `number` | No | Number of subscribers |
| `nbSubscriptions` | `number` | No | Number of subscriptions |
| `pl` | `any[]` | No | User playlists |
| `redirect` | `string` | No | URL to redirect to |
| `twId` | `string` | No | Twitter handle |
| `twSec` | `string` | No | Twitter session secret |
| `twTok` | `string` | No | Twitter session token |
| `uId` | `string` | No | ID of new user if successful |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.Authentication().create({
})
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Authentication().load({ id: 'authentication_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenwhydSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## GetUserPostEntity

```ts
const get_user_post = client.GetUserPost()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ctx` | `string` | No | Context |
| `eId` | `string` | No | External ID (platform identifier) |
| `id` | `string` | No | Post ID |
| `img` | `string` | No | Track image URL |
| `lov` | `any[]` | No | User IDs who liked this post |
| `name` | `string` | No | Track name |
| `nbP` | `number` | No | Number of plays |
| `nbR` | `number` | No | Number of reposts |
| `score` | `number` | No | Search relevance score |
| `src` | `Record<string, any>` | No |  |
| `text` | `string` | No | Post text/comment |
| `uId` | `string` | No | User ID of poster |
| `uNm` | `string` | No | User name of poster |
| `url` | `string` | No | Direct URL to track |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.GetUserPost().list({ id: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `GetUserPostEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenwhydSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PlaylistEntity

```ts
const playlist = client.Playlist()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | No | Playlist number |
| `name` | `string` | No | Playlist name |
| `nbTracks` | `number` | No | Number of tracks in playlist |
| `url` | `string` | No | Playlist URL |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Playlist().list({ username: "example" })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PlaylistEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenwhydSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## PostEntity

```ts
const post = client.Post()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `ctx` | `string` | No | Context |
| `eId` | `string` | No | External ID (platform identifier) |
| `id` | `string` | No | Post ID |
| `img` | `string` | No | Track image URL |
| `lov` | `any[]` | No | User IDs who liked this post |
| `name` | `string` | No | Track name |
| `nbP` | `number` | No | Number of plays |
| `nbR` | `number` | No | Number of reposts |
| `score` | `number` | No | Search relevance score |
| `src` | `Record<string, any>` | No |  |
| `text` | `string` | No | Post text/comment |
| `uId` | `string` | No | User ID of poster |
| `uNm` | `string` | No | User name of poster |
| `url` | `string` | No | Direct URL to track |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Post().load({ genre: 'genre' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `PostEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenwhydSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SearchEntity

```ts
const search = client.Search()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `q` | `string` | No | Search query |
| `results` | `any[]` | No |  |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.Search().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SearchEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenwhydSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## SubscriptionEntity

```ts
const subscription = client.Subscription()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `isSubscribing` | `boolean` | No | Whether logged in user follows this user |
| `uId` | `string` | No | User ID |
| `uNm` | `string` | No | User name |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.Subscription().load({ id: 'subscription_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `SubscriptionEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenwhydSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## UserEntity

```ts
const user = client.User()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | `number` | No | Playlist number |
| `name` | `string` | No | Playlist name |
| `nbTracks` | `number` | No | Number of tracks in playlist |
| `url` | `string` | No | Playlist URL |

### Operations

#### `create(data: object, ctrl?: object)`

Create a new entity with the given data.

```ts
const result = await client.User().create({
})
```

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.User().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `UserEntity` instance with the same client and
options.

#### `client()`

Return the parent `OpenwhydSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new OpenwhydSDK({
  feature: {
    test: { active: true },
  }
})
```

