# Openwhyd PHP SDK



The PHP SDK for the Openwhyd API — an entity-oriented client using PHP conventions.

> Other languages, the CLI, and MCP server live alongside this one — see
> the [top-level README](../README.md).


## Install
This package is not yet published to Packagist. Install it from the
GitHub release tag (`php/vX.Y.Z`):

- Releases: [https://github.com/voxgig-sdk/openwhyd-sdk/releases](https://github.com/voxgig-sdk/openwhyd-sdk/releases)


## Tutorial: your first API call

This tutorial walks through creating a client, listing entities, and
loading a specific record.

### 1. Create a client

```php
<?php
require_once 'openwhyd_sdk.php';

$client = new OpenwhydSDK([
    "apikey" => getenv("OPENWHYD_APIKEY"),
]);
```

### 3. Load an authentication

```php
try {
    $result = $client->authentication()->load(["id" => "example_id"]);
    print_r($result);
} catch (\Exception $err) {
    echo "Error: " . $err->getMessage();
}
```

### 4. Create, update, and remove

```php
// Create
$created = $client->authentication()->create(["name" => "Example"]);

```


## How-to guides

### Make a direct HTTP request

For endpoints not covered by entity methods:

```php
// direct() is the raw-HTTP escape hatch: it returns a result array
// (it does not throw). Branch on $result["ok"].
$result = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);

if ($result["ok"]) {
    echo $result["status"];  // 200
    print_r($result["data"]);  // response body
} else {
    echo "Error: " . $result["err"]->getMessage();
}
```

### Prepare a request without sending it

```php
// prepare() throws on error and returns the fetch definition.
$fetchdef = $client->prepare([
    "path" => "/api/resource/{id}",
    "method" => "DELETE",
    "params" => ["id" => "example"],
]);

echo $fetchdef["url"];
echo $fetchdef["method"];
print_r($fetchdef["headers"]);
```

### Use test mode

Create a mock client for unit testing — no server required:

```php
$client = OpenwhydSDK::test();

$result = $client->authentication()->load(["id" => "test01"]);
// $result contains mock response data
```

### Use a custom fetch function

Replace the HTTP transport with your own function:

```php
$mock_fetch = function ($url, $init) {
    return [
        [
            "status" => 200,
            "statusText" => "OK",
            "headers" => [],
            "json" => function () { return ["id" => "mock01"]; },
        ],
        null,
    ];
};

$client = new OpenwhydSDK([
    "base" => "http://localhost:8080",
    "system" => [
        "fetch" => $mock_fetch,
    ],
]);
```

### Run live tests

Create a `.env.local` file at the project root:

```
OPENWHYD_TEST_LIVE=TRUE
OPENWHYD_APIKEY=<your-key>
```

Then run:

```bash
cd php && ./vendor/bin/phpunit test/
```


## Reference

### OpenwhydSDK

```php
require_once 'openwhyd_sdk.php';
$client = new OpenwhydSDK($options);
```

Creates a new SDK client.

| Option | Type | Description |
| --- | --- | --- |
| `apikey` | `string` | API key for authentication. |
| `base` | `string` | Base URL of the API server. |
| `prefix` | `string` | URL path prefix prepended to all requests. |
| `suffix` | `string` | URL path suffix appended to all requests. |
| `feature` | `array` | Feature activation flags. |
| `extend` | `array` | Additional Feature instances to load. |
| `system` | `array` | System overrides (e.g. custom `fetch` callable). |

### test

```php
$client = OpenwhydSDK::test($testopts, $sdkopts);
```

Creates a test-mode client with mock transport. Both arguments may be `null`.

### OpenwhydSDK methods

| Method | Signature | Description |
| --- | --- | --- |
| `options_map` | `(): array` | Deep copy of current SDK options. |
| `get_utility` | `(): Utility` | Copy of the SDK utility object. |
| `prepare` | `(array $fetchargs): array` | Build an HTTP request definition without sending. |
| `direct` | `(array $fetchargs): array` | Build and send an HTTP request. |
| `Authentication` | `($data): AuthenticationEntity` | Create a Authentication entity instance. |
| `GetUserPost` | `($data): GetUserPostEntity` | Create a GetUserPost entity instance. |
| `Playlist` | `($data): PlaylistEntity` | Create a Playlist entity instance. |
| `Post` | `($data): PostEntity` | Create a Post entity instance. |
| `Search` | `($data): SearchEntity` | Create a Search entity instance. |
| `Subscription` | `($data): SubscriptionEntity` | Create a Subscription entity instance. |
| `User` | `($data): UserEntity` | Create a User entity instance. |

### Entity interface

All entities share the same interface.

| Method | Signature | Description |
| --- | --- | --- |
| `load` | `($reqmatch, $ctrl): array` | Load a single entity by match criteria. |
| `list` | `($reqmatch, $ctrl): array` | List entities matching the criteria. |
| `create` | `($reqdata, $ctrl): array` | Create a new entity. |
| `update` | `($reqdata, $ctrl): array` | Update an existing entity. |
| `remove` | `($reqmatch, $ctrl): array` | Remove an entity. |
| `data_get` | `(): array` | Get entity data. |
| `data_set` | `($data): void` | Set entity data. |
| `match_get` | `(): array` | Get entity match criteria. |
| `match_set` | `($match): void` | Set entity match criteria. |
| `make` | `(): Entity` | Create a new instance with the same options. |
| `get_name` | `(): string` | Return the entity name. |

### Result shape

Entity operations return the bare result data (an `array` for single-entity
ops, a `list` for `list`) and throw on error. Wrap calls in
`try`/`catch` to handle failures.

The `direct()` escape hatch never throws — it returns a result `array`
you branch on via `$result["ok"]`:

| Key | Type | Description |
| --- | --- | --- |
| `ok` | `bool` | `true` if the HTTP status is 2xx. |
| `status` | `int` | HTTP status code. |
| `headers` | `array` | Response headers. |
| `data` | `mixed` | Parsed JSON response body. |

On error, `ok` is `false` and `$err` contains the error value.

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
error is returned to the caller as the second element in the return array.

### Features and hooks

Features are the extension mechanism. A feature is a PHP class
with hook methods named after pipeline stages (e.g. `PrePoint`,
`PreSpec`). Each method receives the context.

The SDK ships with built-in features:

- **TestFeature**: In-memory mock transport for testing without a live server

Features are initialized in order. Hooks fire in the order features
were added, so later features can override earlier ones.

### Data as arrays

The PHP SDK uses plain PHP associative arrays throughout rather than typed
objects. This mirrors the dynamic nature of the API and keeps the
SDK flexible — no code generation is needed when the API schema
changes.

Use `Helpers::to_map()` to safely validate that a value is an array.

### Directory structure

```
php/
├── openwhyd_sdk.php          -- Main SDK class
├── config.php                     -- Configuration
├── features.php                   -- Feature factory
├── core/                          -- Core types and context
├── entity/                        -- Entity implementations
├── feature/                       -- Built-in features (Base, Test, Log)
├── utility/                       -- Utility functions and struct library
└── test/                          -- Test suites
```

The main class (`openwhyd_sdk.php`) exports the SDK class
and test helper. Import entity or utility modules directly only
when needed.

### Entity state

Entity instances are stateful. After a successful `load`, the entity
stores the returned data and match criteria internally.

```php
$authentication = $client->authentication();
$authentication->load(["id" => "example_id"]);

// $authentication->dataGet() now returns the loaded authentication data
// $authentication->matchGet() returns the last match criteria
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
