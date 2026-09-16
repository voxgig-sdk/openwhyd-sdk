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
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('UserEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when OPENWHYD_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('OPENWHYD_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.OpenwhydSDK.test();
        const ent = testsdk.User();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.OPENWHYD_TEST_LIVE;
        for (const op of ['create', 'list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'user.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "id", "req": false, "short": "Playlist number", "type": "`$INTEGER`", "index$": 0 }, { "active": true, "name": "name", "req": false, "short": "Playlist name", "type": "`$STRING`", "index$": 1 }, { "active": true, "name": "nbTracks", "req": false, "short": "Number of tracks in playlist", "type": "`$INTEGER`", "index$": 2 }, { "active": true, "name": "url", "req": false, "short": "Playlist URL", "type": "`$STRING`", "index$": 3 }], "id": { "field": "id", "name": "id" }, "name": "user", "op": { "create": { "input": "data", "name": "create", "points": [{ "active": true, "args": {}, "contract": { "id": "POST /api/user", "json": "{\"operationId\":\"updateUser\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"bio\":{\"description\":\"User biography\",\"type\":\"string\"},\"cvrImg\":{\"description\":\"Cover image URL\",\"type\":\"string\"},\"email\":{\"description\":\"Email address\",\"type\":\"string\"},\"handle\":{\"description\":\"Username/handle\",\"type\":\"string\"},\"img\":{\"description\":\"Avatar URL\",\"type\":\"string\"},\"lnk_fb\":{\"description\":\"Facebook profile URL\",\"type\":\"string\"},\"lnk_home\":{\"description\":\"Homepage URL\",\"type\":\"string\"},\"lnk_igrm\":{\"description\":\"Instagram profile URL\",\"type\":\"string\"},\"lnk_sc\":{\"description\":\"SoundCloud profile URL\",\"type\":\"string\"},\"lnk_tw\":{\"description\":\"Twitter profile URL\",\"type\":\"string\"},\"lnk_yt\":{\"description\":\"YouTube profile URL\",\"type\":\"string\"},\"loc\":{\"description\":\"User location\",\"type\":\"string\"},\"name\":{\"description\":\"Full user name\",\"type\":\"string\"},\"oldPwd\":{\"description\":\"Old password (required for password change)\",\"type\":\"string\"},\"pwd\":{\"description\":\"New password (requires oldPwd)\",\"type\":\"string\"},\"twId\":{\"description\":\"Twitter handle\",\"type\":\"string\"},\"twSec\":{\"description\":\"Twitter session secret\",\"type\":\"string\"},\"twTok\":{\"description\":\"Twitter session token\",\"type\":\"string\"}},\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"oneOf\":[{\"properties\":{\"_id\":{\"description\":\"User ID\",\"type\":\"string\"},\"bio\":{\"description\":\"User biography\",\"type\":\"string\"},\"cvrImg\":{\"description\":\"Cover image URL\",\"type\":\"string\"},\"email\":{\"description\":\"Email address\",\"type\":\"string\"},\"handle\":{\"description\":\"Username/handle\",\"type\":\"string\"},\"img\":{\"description\":\"Avatar URL\",\"type\":\"string\"},\"isSubscribing\":{\"description\":\"Whether logged in user subscribes to this user\",\"type\":\"boolean\"},\"lastArtists\":{\"description\":\"Recently posted artists\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"lastFm\":{\"properties\":{\"name\":{\"description\":\"Last.fm username\",\"type\":\"string\"},\"sk\":{\"description\":\"Last.fm session key\",\"type\":\"string\"}},\"type\":\"object\"},\"lnk\":{\"properties\":{\"fb\":{\"description\":\"Facebook URL\",\"type\":\"string\"},\"home\":{\"description\":\"Home page URL\",\"type\":\"string\"},\"igrm\":{\"description\":\"Instagram handle\",\"type\":\"string\"},\"sc\":{\"description\":\"SoundCloud handle\",\"type\":\"string\"},\"tw\":{\"description\":\"Twitter handle\",\"type\":\"string\"},\"yt\":{\"description\":\"YouTube handle\",\"type\":\"string\"}},\"type\":\"object\"},\"loc\":{\"description\":\"User location\",\"type\":\"string\"},\"name\":{\"description\":\"Full name\",\"type\":\"string\"},\"nbLikes\":{\"description\":\"Number of likes\",\"type\":\"integer\"},\"nbPosts\":{\"description\":\"Number of posts\",\"type\":\"integer\"},\"nbSubscribers\":{\"description\":\"Number of subscribers\",\"type\":\"integer\"},\"nbSubscriptions\":{\"description\":\"Number of subscriptions\",\"type\":\"integer\"},\"pl\":{\"description\":\"User playlists\",\"items\":{\"properties\":{\"id\":{\"description\":\"Playlist number\",\"type\":\"integer\"},\"name\":{\"description\":\"Playlist name\",\"type\":\"string\"},\"nbTracks\":{\"description\":\"Number of tracks in playlist\",\"type\":\"integer\"},\"url\":{\"description\":\"Playlist URL\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"twId\":{\"description\":\"Twitter handle\",\"type\":\"string\"},\"twSec\":{\"description\":\"Twitter session secret\",\"type\":\"string\"},\"twTok\":{\"description\":\"Twitter session token\",\"type\":\"string\"}},\"type\":\"object\"},{\"properties\":{\"error\":{\"type\":\"string\"}},\"type\":\"object\"}]}}},\"description\":\"Successful update\"}},\"security\":[{\"cookieAuth\":[]}],\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie obtained after successful login\",\"in\":\"cookie\",\"name\":\"whydSid\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "POST", "orig": "/api/user", "segments": [{ "lit": "api" }, { "lit": "user" }], "select": {}, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "create" }, "list": { "input": "data", "name": "list", "points": [{ "active": true, "args": { "query": [{ "active": true, "kind": "query", "name": "count_like", "orig": "count_like", "reqd": false, "type": "`$BOOLEAN`", "index$": 0 }, { "active": true, "kind": "query", "name": "count_post", "orig": "count_post", "reqd": false, "type": "`$BOOLEAN`", "index$": 1 }, { "active": true, "kind": "query", "name": "id", "orig": "id", "reqd": false, "type": "`$STRING`", "index$": 2 }, { "active": true, "kind": "query", "name": "include_subscr", "orig": "include_subscr", "reqd": false, "type": "`$BOOLEAN`", "index$": 3 }, { "active": true, "kind": "query", "name": "is_subscr", "orig": "is_subscr", "reqd": false, "type": "`$BOOLEAN`", "index$": 4 }] }, "contract": { "id": "GET /api/user", "json": "{\"operationId\":\"getUser\",\"parameters\":[{\"description\":\"User ID (logged in user if not provided)\",\"in\":\"query\",\"name\":\"id\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Include subscription status\",\"in\":\"query\",\"name\":\"isSubscr\",\"schema\":{\"type\":\"boolean\"}},{\"description\":\"Include post count\",\"in\":\"query\",\"name\":\"countPosts\",\"schema\":{\"type\":\"boolean\"}},{\"description\":\"Include likes count\",\"in\":\"query\",\"name\":\"countLikes\",\"schema\":{\"type\":\"boolean\"}},{\"description\":\"Include subscriber and subscription counts\",\"in\":\"query\",\"name\":\"includeSubscr\",\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"_id\":{\"description\":\"User ID\",\"type\":\"string\"},\"bio\":{\"description\":\"User biography\",\"type\":\"string\"},\"cvrImg\":{\"description\":\"Cover image URL\",\"type\":\"string\"},\"email\":{\"description\":\"Email address\",\"type\":\"string\"},\"handle\":{\"description\":\"Username/handle\",\"type\":\"string\"},\"img\":{\"description\":\"Avatar URL\",\"type\":\"string\"},\"isSubscribing\":{\"description\":\"Whether logged in user subscribes to this user\",\"type\":\"boolean\"},\"lastArtists\":{\"description\":\"Recently posted artists\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"lastFm\":{\"properties\":{\"name\":{\"description\":\"Last.fm username\",\"type\":\"string\"},\"sk\":{\"description\":\"Last.fm session key\",\"type\":\"string\"}},\"type\":\"object\"},\"lnk\":{\"properties\":{\"fb\":{\"description\":\"Facebook URL\",\"type\":\"string\"},\"home\":{\"description\":\"Home page URL\",\"type\":\"string\"},\"igrm\":{\"description\":\"Instagram handle\",\"type\":\"string\"},\"sc\":{\"description\":\"SoundCloud handle\",\"type\":\"string\"},\"tw\":{\"description\":\"Twitter handle\",\"type\":\"string\"},\"yt\":{\"description\":\"YouTube handle\",\"type\":\"string\"}},\"type\":\"object\"},\"loc\":{\"description\":\"User location\",\"type\":\"string\"},\"name\":{\"description\":\"Full name\",\"type\":\"string\"},\"nbLikes\":{\"description\":\"Number of likes\",\"type\":\"integer\"},\"nbPosts\":{\"description\":\"Number of posts\",\"type\":\"integer\"},\"nbSubscribers\":{\"description\":\"Number of subscribers\",\"type\":\"integer\"},\"nbSubscriptions\":{\"description\":\"Number of subscriptions\",\"type\":\"integer\"},\"pl\":{\"description\":\"User playlists\",\"items\":{\"properties\":{\"id\":{\"description\":\"Playlist number\",\"type\":\"integer\"},\"name\":{\"description\":\"Playlist name\",\"type\":\"string\"},\"nbTracks\":{\"description\":\"Number of tracks in playlist\",\"type\":\"integer\"},\"url\":{\"description\":\"Playlist URL\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"twId\":{\"description\":\"Twitter handle\",\"type\":\"string\"},\"twSec\":{\"description\":\"Twitter session secret\",\"type\":\"string\"},\"twTok\":{\"description\":\"Twitter session token\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"security\":[{\"cookieAuth\":[]}],\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie obtained after successful login\",\"in\":\"cookie\",\"name\":\"whydSid\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/api/user", "segments": [{ "lit": "api" }, { "lit": "user" }], "select": { "exist": ["count_like", "count_post", "id", "include_subscr", "is_subscr"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }, { "active": true, "args": { "params": [{ "active": true, "kind": "param", "name": "username", "orig": "username", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /{username}/info", "json": "{\"operationId\":\"getUserInfo\",\"parameters\":[{\"description\":\"Username of the user\",\"in\":\"path\",\"name\":\"username\",\"required\":true,\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"_id\":{\"description\":\"User ID\",\"type\":\"string\"},\"bio\":{\"description\":\"User biography\",\"type\":\"string\"},\"cvrImg\":{\"description\":\"Cover image URL\",\"type\":\"string\"},\"email\":{\"description\":\"Email address\",\"type\":\"string\"},\"handle\":{\"description\":\"Username/handle\",\"type\":\"string\"},\"img\":{\"description\":\"Avatar URL\",\"type\":\"string\"},\"isSubscribing\":{\"description\":\"Whether logged in user subscribes to this user\",\"type\":\"boolean\"},\"lastArtists\":{\"description\":\"Recently posted artists\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"lastFm\":{\"properties\":{\"name\":{\"description\":\"Last.fm username\",\"type\":\"string\"},\"sk\":{\"description\":\"Last.fm session key\",\"type\":\"string\"}},\"type\":\"object\"},\"lnk\":{\"properties\":{\"fb\":{\"description\":\"Facebook URL\",\"type\":\"string\"},\"home\":{\"description\":\"Home page URL\",\"type\":\"string\"},\"igrm\":{\"description\":\"Instagram handle\",\"type\":\"string\"},\"sc\":{\"description\":\"SoundCloud handle\",\"type\":\"string\"},\"tw\":{\"description\":\"Twitter handle\",\"type\":\"string\"},\"yt\":{\"description\":\"YouTube handle\",\"type\":\"string\"}},\"type\":\"object\"},\"loc\":{\"description\":\"User location\",\"type\":\"string\"},\"name\":{\"description\":\"Full name\",\"type\":\"string\"},\"nbLikes\":{\"description\":\"Number of likes\",\"type\":\"integer\"},\"nbPosts\":{\"description\":\"Number of posts\",\"type\":\"integer\"},\"nbSubscribers\":{\"description\":\"Number of subscribers\",\"type\":\"integer\"},\"nbSubscriptions\":{\"description\":\"Number of subscriptions\",\"type\":\"integer\"},\"pl\":{\"description\":\"User playlists\",\"items\":{\"properties\":{\"id\":{\"description\":\"Playlist number\",\"type\":\"integer\"},\"name\":{\"description\":\"Playlist name\",\"type\":\"string\"},\"nbTracks\":{\"description\":\"Number of tracks in playlist\",\"type\":\"integer\"},\"url\":{\"description\":\"Playlist URL\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"twId\":{\"description\":\"Twitter handle\",\"type\":\"string\"},\"twSec\":{\"description\":\"Twitter session secret\",\"type\":\"string\"},\"twTok\":{\"description\":\"Twitter session token\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie obtained after successful login\",\"in\":\"cookie\",\"name\":\"whydSid\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/{username}/info", "segments": [{ "var": "username" }, { "lit": "info" }], "select": { "exist": ["username"] }, "transform": { "req": "`reqdata`", "res": "`body`" }, "index$": 1 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "user", "name__orig": "user", "Name": "User", "name_": "user", "name-": "user", "NAME": "USER", "index$": 6 }, { "active": true, "entity": "user", "key$": "BasicUserFlow", "kind": "basic", "name": "BasicUserFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "user_ref01" }, "match": { "username": "username01" }, "op": "create", "spec": [], "valid": [], "index$": 0 }, { "active": true, "data": {}, "input": {}, "match": { "username": "username01" }, "op": "list", "spec": [], "valid": [{ "apply": "ItemExists", "def": { "ref": "user_ref01" } }], "index$": 1 }] }, 'User');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        // CREATE
        const user_ref01_ent = client.User();
        let user_ref01_data = setup.data.new.user['user_ref01'];
        user_ref01_data['username'] = setup.idmap['username01'];
        user_ref01_data = (await user_ref01_ent.create(user_ref01_data)).data();
        (0, node_assert_1.default)(null != user_ref01_data.id);
        // LIST
        const user_ref01_match = {};
        user_ref01_match['username'] = setup.idmap['username01'];
        const user_ref01_list = (await user_ref01_ent.list(user_ref01_match)).map((e) => e.data());
        (0, node_assert_1.default)(!isempty(select(user_ref01_list, { id: user_ref01_data.id })));
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/user/UserTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.OpenwhydSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['user01', 'user02', 'user03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'OPENWHYD_TEST_USER_ENTID': idmap,
        'OPENWHYD_TEST_LIVE': 'FALSE',
        'OPENWHYD_TEST_EXPLAIN': 'FALSE',
        'OPENWHYD_APIKEY': '',
    });
    idmap = env['OPENWHYD_TEST_USER_ENTID'];
    const live = 'TRUE' === env.OPENWHYD_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['OPENWHYD_TEST_USER_ENTID'];
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
//# sourceMappingURL=UserEntity.test.js.map