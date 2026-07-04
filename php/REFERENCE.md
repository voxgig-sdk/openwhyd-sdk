# Openwhyd PHP SDK Reference

Complete API reference for the Openwhyd PHP SDK.


## OpenwhydSDK

### Constructor

```php
require_once __DIR__ . '/openwhyd_sdk.php';

$client = new OpenwhydSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["apikey"]` | `string` | API key for authentication. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `OpenwhydSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = OpenwhydSDK::test();
```


### Instance Methods

#### `Authentication($data = null)`

Create a new `AuthenticationEntity` instance. Pass `null` for no initial data.

#### `GetUserPost($data = null)`

Create a new `GetUserPostEntity` instance. Pass `null` for no initial data.

#### `Playlist($data = null)`

Create a new `PlaylistEntity` instance. Pass `null` for no initial data.

#### `Post($data = null)`

Create a new `PostEntity` instance. Pass `null` for no initial data.

#### `Search($data = null)`

Create a new `SearchEntity` instance. Pass `null` for no initial data.

#### `Subscription($data = null)`

Create a new `SubscriptionEntity` instance. Pass `null` for no initial data.

#### `User($data = null)`

Create a new `UserEntity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## AuthenticationEntity

```php
$authentication = $client->authentication();
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

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->authentication()->create([
]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->authentication()->load(["id" => "authentication_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): AuthenticationEntity`

Create a new `AuthenticationEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## GetUserPostEntity

```php
$get_user_post = $client->get_user_post();
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

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->get_user_post()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): GetUserPostEntity`

Create a new `GetUserPostEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PlaylistEntity

```php
$playlist = $client->playlist();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `nb_track` | ``$INTEGER`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->playlist()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PlaylistEntity`

Create a new `PlaylistEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## PostEntity

```php
$post = $client->post();
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

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->post()->load(["id" => "post_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): PostEntity`

Create a new `PostEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SearchEntity

```php
$search = $client->search();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `q` | ``$STRING`` | No |  |
| `result` | ``$ARRAY`` | No |  |

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->search()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SearchEntity`

Create a new `SearchEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## SubscriptionEntity

```php
$subscription = $client->subscription();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `is_subscribing` | ``$BOOLEAN`` | No |  |
| `u_id` | ``$STRING`` | No |  |
| `u_nm` | ``$STRING`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->subscription()->load(["id" => "subscription_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): SubscriptionEntity`

Create a new `SubscriptionEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## UserEntity

```php
$user = $client->user();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `id` | ``$INTEGER`` | No |  |
| `name` | ``$STRING`` | No |  |
| `nb_track` | ``$INTEGER`` | No |  |
| `url` | ``$STRING`` | No |  |

### Operations

#### `create(array $reqdata, ?array $ctrl = null): mixed`

Create a new entity with the given data. Throws on error.

```php
$result = $client->user()->create([
]);
```

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->user()->list([]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): UserEntity`

Create a new `UserEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new OpenwhydSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

