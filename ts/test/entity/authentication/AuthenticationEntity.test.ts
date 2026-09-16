

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { OpenwhydSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
loadEnvLocal(__dirname + '/../../../.env.local')


describe('AuthenticationEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENWHYD_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENWHYD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenwhydSDK.test()
    const ent = testsdk.Authentication()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENWHYD_TEST_LIVE
    for (const op of ['create', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'authentication.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"bio","req":false,"short":"User biography","type":"`$STRING`","index$":0},{"active":true,"name":"cvrImg","req":false,"short":"Cover image URL","type":"`$STRING`","index$":1},{"active":true,"name":"email","req":false,"short":"Email address","type":"`$STRING`","index$":2},{"active":true,"name":"error","req":false,"short":"Error message if any","type":"`$STRING`","index$":3},{"active":true,"name":"handle","req":false,"short":"Username/handle","type":"`$STRING`","index$":4},{"active":true,"name":"id","req":false,"short":"User ID","type":"`$STRING`","index$":5},{"active":true,"name":"img","req":false,"short":"Avatar URL","type":"`$STRING`","index$":6},{"active":true,"name":"isSubscribing","req":false,"short":"Whether logged in user subscribes to this user","type":"`$BOOLEAN`","index$":7},{"active":true,"name":"lastArtists","req":false,"short":"Recently posted artists","type":"`$ARRAY`","index$":8},{"active":true,"name":"lastFm","req":false,"type":"`$OBJECT`","index$":9},{"active":true,"name":"lnk","req":false,"type":"`$OBJECT`","index$":10},{"active":true,"name":"loc","req":false,"short":"User location","type":"`$STRING`","index$":11},{"active":true,"name":"name","req":false,"short":"Full name","type":"`$STRING`","index$":12},{"active":true,"name":"nbLikes","req":false,"short":"Number of likes","type":"`$INTEGER`","index$":13},{"active":true,"name":"nbPosts","req":false,"short":"Number of posts","type":"`$INTEGER`","index$":14},{"active":true,"name":"nbSubscribers","req":false,"short":"Number of subscribers","type":"`$INTEGER`","index$":15},{"active":true,"name":"nbSubscriptions","req":false,"short":"Number of subscriptions","type":"`$INTEGER`","index$":16},{"active":true,"name":"pl","req":false,"short":"User playlists","type":"`$ARRAY`","index$":17},{"active":true,"name":"redirect","req":false,"short":"URL to redirect to","type":"`$STRING`","index$":18},{"active":true,"name":"twId","req":false,"short":"Twitter handle","type":"`$STRING`","index$":19},{"active":true,"name":"twSec","req":false,"short":"Twitter session secret","type":"`$STRING`","index$":20},{"active":true,"name":"twTok","req":false,"short":"Twitter session token","type":"`$STRING`","index$":21},{"active":true,"name":"uId","req":false,"short":"ID of new user if successful","type":"`$STRING`","index$":22}],"id":{"field":"id","name":"id"},"name":"authentication","op":{"create":{"input":"data","name":"create","points":[{"active":true,"args":{},"contract":{"id":"POST /login","json":"{\"operationId\":\"loginPost\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"action\":{\"enum\":[\"login\",\"forgot\"],\"type\":\"string\"},\"ajax\":{\"type\":\"boolean\"},\"email\":{\"type\":\"string\"},\"includeUser\":{\"type\":\"boolean\"},\"md5\":{\"type\":\"string\"}},\"required\":[\"action\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"type\":\"string\"},\"redirect\":{\"type\":\"string\"},\"user\":{\"properties\":{\"_id\":{\"description\":\"User ID\",\"type\":\"string\"},\"bio\":{\"description\":\"User biography\",\"type\":\"string\"},\"cvrImg\":{\"description\":\"Cover image URL\",\"type\":\"string\"},\"email\":{\"description\":\"Email address\",\"type\":\"string\"},\"handle\":{\"description\":\"Username/handle\",\"type\":\"string\"},\"img\":{\"description\":\"Avatar URL\",\"type\":\"string\"},\"isSubscribing\":{\"description\":\"Whether logged in user subscribes to this user\",\"type\":\"boolean\"},\"lastArtists\":{\"description\":\"Recently posted artists\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"lastFm\":{\"properties\":{\"name\":{\"description\":\"Last.fm username\",\"type\":\"string\"},\"sk\":{\"description\":\"Last.fm session key\",\"type\":\"string\"}},\"type\":\"object\"},\"lnk\":{\"properties\":{\"fb\":{\"description\":\"Facebook URL\",\"type\":\"string\"},\"home\":{\"description\":\"Home page URL\",\"type\":\"string\"},\"igrm\":{\"description\":\"Instagram handle\",\"type\":\"string\"},\"sc\":{\"description\":\"SoundCloud handle\",\"type\":\"string\"},\"tw\":{\"description\":\"Twitter handle\",\"type\":\"string\"},\"yt\":{\"description\":\"YouTube handle\",\"type\":\"string\"}},\"type\":\"object\"},\"loc\":{\"description\":\"User location\",\"type\":\"string\"},\"name\":{\"description\":\"Full name\",\"type\":\"string\"},\"nbLikes\":{\"description\":\"Number of likes\",\"type\":\"integer\"},\"nbPosts\":{\"description\":\"Number of posts\",\"type\":\"integer\"},\"nbSubscribers\":{\"description\":\"Number of subscribers\",\"type\":\"integer\"},\"nbSubscriptions\":{\"description\":\"Number of subscriptions\",\"type\":\"integer\"},\"pl\":{\"description\":\"User playlists\",\"items\":{\"properties\":{\"id\":{\"description\":\"Playlist number\",\"type\":\"integer\"},\"name\":{\"description\":\"Playlist name\",\"type\":\"string\"},\"nbTracks\":{\"description\":\"Number of tracks in playlist\",\"type\":\"integer\"},\"url\":{\"description\":\"Playlist URL\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"twId\":{\"description\":\"Twitter handle\",\"type\":\"string\"},\"twSec\":{\"description\":\"Twitter session secret\",\"type\":\"string\"},\"twTok\":{\"description\":\"Twitter session token\",\"type\":\"string\"}},\"type\":\"object\"},\"wrongPassword\":{\"type\":\"integer\"}},\"type\":\"object\"}}},\"description\":\"Successful response\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie obtained after successful login\",\"in\":\"cookie\",\"name\":\"whydSid\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/login","segments":[{"lit":"login"}],"select":{},"transform":{"req":"`reqdata`","res":"`body.user`"},"index$":0},{"active":true,"args":{},"contract":{"id":"POST /register","json":"{\"operationId\":\"register\",\"parameters\":[],\"protocol\":\"http\",\"requestBody\":{\"content\":{\"application/x-www-form-urlencoded\":{\"schema\":{\"properties\":{\"ajax\":{\"description\":\"Set to 'true' for JSON response\",\"type\":\"string\"},\"email\":{\"description\":\"Email address\",\"type\":\"string\"},\"iBy\":{\"description\":\"ID of user who invited this user\",\"type\":\"string\"},\"iPg\":{\"description\":\"URL of sign up page\",\"type\":\"string\"},\"iPo\":{\"description\":\"Post ID from invitation (deprecated)\",\"type\":\"string\"},\"iRf\":{\"description\":\"Referrer of sign up page\",\"type\":\"string\"},\"inviteCode\":{\"description\":\"Invite code (deprecated)\",\"type\":\"string\"},\"name\":{\"description\":\"Full name of the user\",\"type\":\"string\"},\"password\":{\"description\":\"Password\",\"type\":\"string\"},\"redirect\":{\"description\":\"URL to redirect to after successful signup\",\"type\":\"string\"}},\"required\":[\"name\",\"email\",\"password\"],\"type\":\"object\"}}},\"required\":true},\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message if any\",\"type\":\"string\"},\"redirect\":{\"description\":\"URL to redirect to\",\"type\":\"string\"},\"uId\":{\"description\":\"ID of new user if successful\",\"type\":\"string\"}},\"type\":\"object\"}}},\"description\":\"Successful registration\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie obtained after successful login\",\"in\":\"cookie\",\"name\":\"whydSid\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"POST","orig":"/register","segments":[{"lit":"register"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"action","orig":"action","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"ajax","orig":"ajax","reqd":false,"type":"`$BOOLEAN`","index$":1},{"active":true,"kind":"query","name":"email","orig":"email","reqd":false,"type":"`$STRING`","index$":2},{"active":true,"kind":"query","name":"include_user","orig":"include_user","reqd":false,"type":"`$BOOLEAN`","index$":3},{"active":true,"kind":"query","name":"md5","orig":"md5","reqd":false,"type":"`$STRING`","index$":4}]},"contract":{"id":"GET /login","json":"{\"operationId\":\"login\",\"parameters\":[{\"description\":\"Action to perform: login or forgot password\",\"in\":\"query\",\"name\":\"action\",\"required\":true,\"schema\":{\"enum\":[\"login\",\"forgot\"],\"type\":\"string\"}},{\"description\":\"Email address or username\",\"in\":\"query\",\"name\":\"email\",\"schema\":{\"type\":\"string\"}},{\"description\":\"MD5-hashed password (for login action)\",\"in\":\"query\",\"name\":\"md5\",\"schema\":{\"type\":\"string\"}},{\"description\":\"Return JSON response instead of HTML\",\"in\":\"query\",\"name\":\"ajax\",\"schema\":{\"type\":\"boolean\"}},{\"description\":\"Include user object in response (for login action)\",\"in\":\"query\",\"name\":\"includeUser\",\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"properties\":{\"error\":{\"description\":\"Error message if any\",\"type\":\"string\"},\"ok\":{\"description\":\"Success message for forgot password\",\"type\":\"string\"},\"redirect\":{\"description\":\"URL to redirect to after successful login\",\"type\":\"string\"},\"user\":{\"properties\":{\"_id\":{\"description\":\"User ID\",\"type\":\"string\"},\"bio\":{\"description\":\"User biography\",\"type\":\"string\"},\"cvrImg\":{\"description\":\"Cover image URL\",\"type\":\"string\"},\"email\":{\"description\":\"Email address\",\"type\":\"string\"},\"handle\":{\"description\":\"Username/handle\",\"type\":\"string\"},\"img\":{\"description\":\"Avatar URL\",\"type\":\"string\"},\"isSubscribing\":{\"description\":\"Whether logged in user subscribes to this user\",\"type\":\"boolean\"},\"lastArtists\":{\"description\":\"Recently posted artists\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"lastFm\":{\"properties\":{\"name\":{\"description\":\"Last.fm username\",\"type\":\"string\"},\"sk\":{\"description\":\"Last.fm session key\",\"type\":\"string\"}},\"type\":\"object\"},\"lnk\":{\"properties\":{\"fb\":{\"description\":\"Facebook URL\",\"type\":\"string\"},\"home\":{\"description\":\"Home page URL\",\"type\":\"string\"},\"igrm\":{\"description\":\"Instagram handle\",\"type\":\"string\"},\"sc\":{\"description\":\"SoundCloud handle\",\"type\":\"string\"},\"tw\":{\"description\":\"Twitter handle\",\"type\":\"string\"},\"yt\":{\"description\":\"YouTube handle\",\"type\":\"string\"}},\"type\":\"object\"},\"loc\":{\"description\":\"User location\",\"type\":\"string\"},\"name\":{\"description\":\"Full name\",\"type\":\"string\"},\"nbLikes\":{\"description\":\"Number of likes\",\"type\":\"integer\"},\"nbPosts\":{\"description\":\"Number of posts\",\"type\":\"integer\"},\"nbSubscribers\":{\"description\":\"Number of subscribers\",\"type\":\"integer\"},\"nbSubscriptions\":{\"description\":\"Number of subscriptions\",\"type\":\"integer\"},\"pl\":{\"description\":\"User playlists\",\"items\":{\"properties\":{\"id\":{\"description\":\"Playlist number\",\"type\":\"integer\"},\"name\":{\"description\":\"Playlist name\",\"type\":\"string\"},\"nbTracks\":{\"description\":\"Number of tracks in playlist\",\"type\":\"integer\"},\"url\":{\"description\":\"Playlist URL\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"},\"twId\":{\"description\":\"Twitter handle\",\"type\":\"string\"},\"twSec\":{\"description\":\"Twitter session secret\",\"type\":\"string\"},\"twTok\":{\"description\":\"Twitter session token\",\"type\":\"string\"}},\"type\":\"object\"},\"wrongPassword\":{\"description\":\"Set to 1 if password is incorrect\",\"type\":\"integer\"}},\"type\":\"object\"}},\"text/html\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful response\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie obtained after successful login\",\"in\":\"cookie\",\"name\":\"whydSid\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/login","segments":[{"lit":"login"}],"select":{"exist":["action","ajax","email","include_user","md5"]},"transform":{"req":"`reqdata`","res":"`body.user`"},"index$":0},{"active":true,"args":{"query":[{"active":true,"kind":"query","name":"ajax","orig":"ajax","reqd":false,"type":"`$BOOLEAN`","index$":0}]},"contract":{"id":"GET /logout","json":"{\"operationId\":\"logout\",\"parameters\":[{\"description\":\"Return JSON response instead of HTML\",\"in\":\"query\",\"name\":\"ajax\",\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"type\":\"object\"}},\"text/html\":{\"schema\":{\"type\":\"string\"}}},\"description\":\"Successful logout\"}},\"security\":[{\"cookieAuth\":[]}],\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie obtained after successful login\",\"in\":\"cookie\",\"name\":\"whydSid\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/logout","segments":[{"lit":"logout"}],"select":{"exist":["ajax"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"authentication","name__orig":"authentication","Name":"Authentication","name_":"authentication","name-":"authentication","NAME":"AUTHENTICATION","index$":0}, {"active":true,"entity":"authentication","key$":"BasicAuthenticationFlow","kind":"basic","name":"BasicAuthenticationFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"authentication_ref01"},"match":{},"op":"create","spec":[],"valid":[],"index$":0},{"active":true,"data":{},"input":{"ref":"authentication_ref01","srcdatavar":"authentication_ref01_data","suffix":"_dt0"},"match":{},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-authentication_ref01"}}],"index$":1}]}, 'Authentication')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const authentication_ref01_ent = client.Authentication()
    let authentication_ref01_data = setup.data.new.authentication['authentication_ref01']

    authentication_ref01_data = (await authentication_ref01_ent.create(authentication_ref01_data)).data()
    assert(null != authentication_ref01_data.id)


    // LOAD
    const authentication_ref01_match_dt0: any = {}
    authentication_ref01_match_dt0.id = authentication_ref01_data.id
    const authentication_ref01_data_dt0 = (await authentication_ref01_ent.load(authentication_ref01_match_dt0)).data()
    assert(authentication_ref01_data_dt0.id === authentication_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/authentication/AuthenticationTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = OpenwhydSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['authentication01','authentication02','authentication03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENWHYD_TEST_AUTHENTICATION_ENTID': idmap,
    'OPENWHYD_TEST_LIVE': 'FALSE',
    'OPENWHYD_TEST_EXPLAIN': 'FALSE',
    'OPENWHYD_APIKEY': '',
  })

  idmap = env['OPENWHYD_TEST_AUTHENTICATION_ENTID']

  const live = 'TRUE' === env.OPENWHYD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENWHYD_TEST_AUTHENTICATION_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new OpenwhydSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
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
    ]))
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
  }

  return setup
}
  
