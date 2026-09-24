"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('PlaylistEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPENWHYD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPENWHYD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenwhydSDK.test();
        const ent = testsdk.Playlist();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPENWHYD_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'playlist.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "ctx": { "a": true, "h": "Ctx", "n": "ctx", "r": false, "sh": "Context", "t": "`$STRING`", "key$": "ctx", "index$": 0 }, "eId": { "a": true, "h": "E Id", "n": "eId", "r": false, "sh": "External ID (platform identifier)", "t": "`$STRING`", "key$": "eId", "index$": 1 }, "id": { "a": true, "h": "Id", "n": "id", "r": false, "sh": "Post ID", "t": "`$STRING`", "key$": "id", "index$": 2 }, "img": { "a": true, "h": "Img", "n": "img", "r": false, "sh": "Track image URL", "t": "`$STRING`", "key$": "img", "index$": 3 }, "lov": { "a": true, "h": "Lov", "n": "lov", "r": false, "sh": "User IDs who liked this post", "t": "`$ARRAY`", "key$": "lov", "index$": 4 }, "name": { "a": true, "h": "Name", "n": "name", "r": false, "sh": "Track name", "t": "`$STRING`", "key$": "name", "index$": 5 }, "nbP": { "a": true, "h": "Nb P", "n": "nbP", "r": false, "sh": "Number of plays", "t": "`$INTEGER`", "key$": "nbP", "index$": 6 }, "nbR": { "a": true, "h": "Nb R", "n": "nbR", "r": false, "sh": "Number of reposts", "t": "`$INTEGER`", "key$": "nbR", "index$": 7 }, "nbTracks": { "a": true, "h": "Nb Tracks", "n": "nbTracks", "r": false, "sh": "Number of tracks in playlist", "t": "`$INTEGER`", "key$": "nbTracks", "index$": 8 }, "score": { "a": true, "h": "Score", "n": "score", "r": false, "sh": "Search relevance score", "t": "`$NUMBER`", "key$": "score", "index$": 9 }, "src": { "a": true, "h": "Src", "n": "src", "r": false, "t": "`$OBJECT`", "key$": "src", "index$": 10 }, "text": { "a": true, "h": "Text", "n": "text", "r": false, "sh": "Post text/comment", "t": "`$STRING`", "key$": "text", "index$": 11 }, "uId": { "a": true, "h": "U Id", "n": "uId", "r": false, "sh": "User ID of poster", "t": "`$STRING`", "key$": "uId", "index$": 12 }, "uNm": { "a": true, "h": "U Nm", "n": "uNm", "r": false, "sh": "User name of poster", "t": "`$STRING`", "key$": "uNm", "index$": 13 }, "url": { "a": true, "h": "Url", "n": "url", "r": false, "sh": "Direct URL to track", "t": "`$STRING`", "key$": "url", "index$": 14 } }, "id": { "field": "id", "name": "id" }, "name": "playlist", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /{username}/playlists", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "username", "or": "username", "r": true, "t": "`$STRING`", "index$": 0 }], "query": [{ "a": true, "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/{username}/playlists", "q": { "exist": ["format", "username"] }, "r": {}, "s": [{ "var": "username" }, { "lit": "playlists" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /{username}/playlist/{playlistId}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "k": "param", "n": "id", "or": "playlist_id", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "param", "n": "username", "or": "username", "r": true, "t": "`$STRING`", "index$": 1 }], "query": [{ "a": true, "k": "query", "n": "after", "or": "after", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "format", "or": "format", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 20, "k": "query", "n": "limit", "or": "limit", "r": false, "t": "`$INTEGER`", "index$": 2 }] }, "k": "http", "m": "GET", "o": "/{username}/playlist/{playlistId}", "q": { "exist": ["after", "format", "id", "limit", "username"] }, "r": { "param": { "playlistId": "id" } }, "s": [{ "var": "username" }, { "lit": "playlist" }, { "var": "id" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "playlist", "name__orig": "playlist", "Name": "Playlist", "name_": "playlist", "name-": "playlist", "NAME": "PLAYLIST", "index$": 3 }, { "active": true, "entity": "playlist", "key$": "BasicPlaylistFlow", "kind": "basic", "name": "BasicPlaylistFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": { "username": "username01" }, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "playlist_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "playlist_ref01", "srcdatavar": "playlist_ref01_data", "suffix": "_dt0" }, "m": { "id": "playlist01", "username": "username01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-playlist_ref01" } }], "index$": 1 }] }, 'Playlist', { "GET /{username}/playlists": { "protocol": "http", "operationId": "getUserPlaylists", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "id": { "description": "Playlist number", "type": "integer", "key$": "id" }, "name": { "description": "Playlist name", "type": "string", "key$": "name" }, "url": { "description": "Playlist URL", "type": "string", "key$": "url" }, "nbTracks": { "description": "Number of tracks in playlist", "type": "integer", "key$": "nbTracks" } }, "x-ref": "#/components/schemas/Playlist", "index$": 0 } } } } } }, "parameters": [{ "name": "username", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Username of the user", "index$": 0 }, { "name": "format", "in": "query", "schema": { "type": "string", "enum": ["json", "links"] }, "description": "Response format: json or links", "index$": 1 }], "securitySource": "unspecified", "securitySchemes": { "cookieAuth": { "type": "apiKey", "in": "cookie", "name": "whydSid", "description": "Session cookie obtained after successful login" } } }, "GET /{username}/playlist/{playlistId}": { "protocol": "http", "operationId": "getPlaylistTracks", "responses": { "200": { "description": "Successful response", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "object", "properties": { "_id": { "description": "Post ID", "type": "string", "key$": "_id" }, "uId": { "description": "User ID of poster", "type": "string", "key$": "uId" }, "uNm": { "description": "User name of poster", "type": "string", "key$": "uNm" }, "text": { "description": "Post text/comment", "type": "string", "key$": "text" }, "name": { "description": "Track name", "type": "string", "key$": "name" }, "eId": { "description": "External ID (platform identifier)", "type": "string", "key$": "eId" }, "img": { "description": "Track image URL", "type": "string", "key$": "img" }, "nbP": { "description": "Number of plays", "type": "integer", "key$": "nbP" }, "nbR": { "description": "Number of reposts", "type": "integer", "key$": "nbR" }, "lov": { "description": "User IDs who liked this post", "items": { "type": "string" }, "type": "array", "key$": "lov" }, "ctx": { "description": "Context", "type": "string", "key$": "ctx" }, "src": { "properties": { "id": { "description": "Source URL", "type": "string" }, "name": { "description": "Source name", "type": "string" } }, "type": "object", "key$": "src" }, "url": { "description": "Direct URL to track", "type": "string", "key$": "url" }, "score": { "description": "Search relevance score", "type": "number", "key$": "score" } }, "x-ref": "#/components/schemas/Post", "key$": "items" } } }, "text/plain": { "schema": { "type": "string", "description": "List of URLs, one per line" } } } } }, "parameters": [{ "name": "username", "in": "path", "required": true, "schema": { "type": "string" }, "description": "Username of the user", "index$": 0 }, { "name": "playlistId", "in": "path", "required": true, "schema": { "type": "string" }, "description": "ID of the playlist", "index$": 1 }, { "name": "format", "in": "query", "schema": { "type": "string", "enum": ["json", "links"] }, "description": "Response format: json or links", "index$": 2 }, { "name": "limit", "in": "query", "schema": { "type": "integer", "default": 20 }, "description": "Number of posts to return", "index$": 3 }, { "name": "after", "in": "query", "schema": { "type": "string" }, "description": "Identifier of the post from which entries must be returned (for pagination)", "index$": 4 }], "securitySource": "unspecified", "securitySchemes": { "cookieAuth": { "type": "apiKey", "in": "cookie", "name": "whydSid", "description": "Session cookie obtained after successful login" } } } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let playlist_ref01_data = Object.values(setup.data.existing.playlist)[0];
        // LIST
        const playlist_ref01_ent = client.Playlist();
        const playlist_ref01_match = {};
        playlist_ref01_match['username'] = setup.idmap['username01'];
        const playlist_ref01_list = (await playlist_ref01_ent.list(playlist_ref01_match)).map((e) => e.data());
        // LOAD
        const playlist_ref01_match_dt0 = {};
        playlist_ref01_match_dt0.id = playlist_ref01_data.id;
        const playlist_ref01_data_dt0 = (await playlist_ref01_ent.load(playlist_ref01_match_dt0)).data();
        (0, node_assert_1.default)(playlist_ref01_data_dt0.id === playlist_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/playlist/PlaylistTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenwhydSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['playlist01', 'playlist02', 'playlist03', 'username01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPENWHYD_TEST_PLAYLIST_ENTID': idmap,
        'OPENWHYD_TEST_LIVE': 'FALSE',
        'OPENWHYD_TEST_EXPLAIN': 'FALSE',
        'OPENWHYD_APIKEY': '',
    });
    idmap = env['OPENWHYD_TEST_PLAYLIST_ENTID'];
    const live = 'TRUE' === env.OPENWHYD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPENWHYD_TEST_PLAYLIST_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.OpenwhydSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {
                apikey: env.OPENWHYD_APIKEY,
            },
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
    }
    const setup = {
        idmap,
        env,
        options,
        client,
        struct,
        data: entityData,
        explain: 'TRUE' === env.OPENWHYD_TEST_EXPLAIN,
        live,
        transport,
        now: Date.now(),
    };
    return setup;
}
//# sourceMappingURL=PlaylistEntity.test.js.map