# Openwhyd SDK

Curate and discover music playlists drawn from YouTube, SoundCloud, Vimeo, Deezer and Bandcamp

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About Openwhyd API

[Openwhyd](https://openwhyd.org) is a free, open-source music curation service that lets users collect tracks from across the web into shareable playlists and a community feed. It is maintained collaboratively under the MIT License, with source code hosted on [GitHub](https://github.com/openwhyd/openwhyd).

The API exposes:

- User profiles, followers, and following relationships (`/api/follow/...`, `/api/user`)
- Posts (tracks) with like, repost, comment, play-count, and Last.fm scrobble actions (`/api/post?action=...`)
- Playlists you can read, create, rename, reorder, and share (`/api/playlist`, `/api/playlist/<id>`)
- Search across tracks, users, and playlists (`/search?q=...`)
- A public data export for any user's posts, playlists, and profile via `/<user>`, `/<user>/playlists`, `/<user>/playlist/<id>` with `?format=json`

Tracks are identified by a compact `eId` syntax that encodes the source platform, for example `/yt/<id>` for YouTube, `/sc/<uri>` for SoundCloud, `/dz/<id>` for Deezer, `/vi/<id>` for Vimeo, `/bc/<id>` for Bandcamp, and `/dm/<id>` for Dailymotion.

Public export endpoints accept `format`, `limit`, `after` (pagination cursor), and `callback` (JSONP) query parameters. Authenticated calls rely on a session cookie obtained via `/login` or `/register`. CORS is enabled on some endpoints and disabled on others, so server-side calls are the safer default for browser clients.

## Try it

**TypeScript**
```bash
npm install openwhyd
```

**Python**
```bash
pip install openwhyd-sdk
```

**PHP**
```bash
composer require voxgig/openwhyd-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/openwhyd-sdk/go
```

**Ruby**
```bash
gem install openwhyd-sdk
```

**Lua**
```bash
luarocks install openwhyd-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { OpenwhydSDK } from 'openwhyd'

const client = new OpenwhydSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o openwhyd-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "openwhyd": {
      "command": "/abs/path/to/openwhyd-mcp"
    }
  }
}
```

## Entities

The API exposes 7 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Authentication** | Session-based login, logout, registration, and password-reset flows via `/login`, `/logout`, and `/register`. | `/login` |
| **GetUserPost** | Public data export of a user's posted tracks at `/<user>` or `/u/<userId>` with `?format=json` for machine-readable output. | `/{username}` |
| **Playlist** | Read, create, rename, reorder, delete, and share playlists via `/api/playlist` and `/api/playlist/<id>`. | `/{username}/playlists` |
| **Post** | Tracks (posts) and their actions — insert, delete, love/unlove, list lovers and reposts, increment play counter, scrobble to Last.fm, and comment — via `/api/post?action=...` and `/c/<postId>?format=json` for detail. | `/{username}/playlist/{playlistId}` |
| **Search** | Combined and contextual search over posts, users, and playlists via `/search?q=...`, with `context=addTrack` and `context=quick` variants. | `/search` |
| **Subscription** | Follow graph operations — list followers and following, check status, subscribe and unsubscribe — via `/api/follow/fetchFollowers/<id>`, `/api/follow/fetchFollowing/<id>`, and `/api/follow?action=...`. | `/api/follow/fetchFollowers/{id}` |
| **User** | User profile retrieval and updates via `/api/user`, plus public profile info at `/<user>/info`. | `/api/user` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from openwhyd_sdk import OpenwhydSDK

client = OpenwhydSDK({})


# Load a specific authentication
authentication, err = client.Authentication(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'openwhyd_sdk.php';

$client = new OpenwhydSDK([]);


// Load a specific authentication
[$authentication, $err] = $client->Authentication(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/openwhyd-sdk/go"

client := sdk.NewOpenwhydSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "Openwhyd_sdk"

client = OpenwhydSDK.new({})


# Load a specific authentication
authentication, err = client.Authentication(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("openwhyd_sdk")

local client = sdk.new({})


-- Load a specific authentication
local authentication, err = client:Authentication(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = OpenwhydSDK.test()
const result = await client.Authentication().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = OpenwhydSDK.test(None, None)
result, err = client.Authentication(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = OpenwhydSDK::test(null, null);
[$result, $err] = $client->Authentication(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Authentication(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = OpenwhydSDK.test(nil, nil)
result, err = client.Authentication(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Authentication(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the Openwhyd API

- Upstream: [https://openwhyd.org](https://openwhyd.org)
- API docs: [https://openwhyd.github.io/openwhyd/API](https://openwhyd.github.io/openwhyd/API)

- Openwhyd is maintained collaboratively under the MIT License
- Source code and issue tracker live on GitHub at [openwhyd/openwhyd](https://github.com/openwhyd/openwhyd)
- Public data export endpoints can be used without authentication; user-scoped actions require a session cookie
- Music itself is streamed from third-party sources (YouTube, SoundCloud, Deezer, Vimeo, Bandcamp) and remains subject to their respective terms

---

Generated from the Openwhyd API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
