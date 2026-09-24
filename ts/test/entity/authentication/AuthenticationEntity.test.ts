

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"bio":{"a":true,"h":"Bio","n":"bio","r":false,"sh":"User biography","t":"`$STRING`","key$":"bio","index$":0},"cvrImg":{"a":true,"h":"Cvr Img","n":"cvrImg","r":false,"sh":"Cover image URL","t":"`$STRING`","key$":"cvrImg","index$":1},"email":{"a":true,"h":"Email","n":"email","r":false,"sh":"Email address","t":"`$STRING`","key$":"email","index$":2},"error":{"a":true,"h":"Error","n":"error","r":false,"sh":"Error message if any","t":"`$STRING`","key$":"error","index$":3},"handle":{"a":true,"h":"Handle","n":"handle","r":false,"sh":"Username/handle","t":"`$STRING`","key$":"handle","index$":4},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"User ID","t":"`$STRING`","key$":"id","index$":5},"img":{"a":true,"h":"Img","n":"img","r":false,"sh":"Avatar URL","t":"`$STRING`","key$":"img","index$":6},"isSubscribing":{"a":true,"h":"Is Subscribing","n":"isSubscribing","r":false,"sh":"Whether logged in user subscribes to this user","t":"`$BOOLEAN`","key$":"isSubscribing","index$":7},"lastArtists":{"a":true,"h":"Last Artists","n":"lastArtists","r":false,"sh":"Recently posted artists","t":"`$ARRAY`","key$":"lastArtists","index$":8},"lastFm":{"a":true,"h":"Last Fm","n":"lastFm","r":false,"t":"`$OBJECT`","key$":"lastFm","index$":9},"lnk":{"a":true,"h":"Lnk","n":"lnk","r":false,"t":"`$OBJECT`","key$":"lnk","index$":10},"loc":{"a":true,"h":"Loc","n":"loc","r":false,"sh":"User location","t":"`$STRING`","key$":"loc","index$":11},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Full name","t":"`$STRING`","key$":"name","index$":12},"nbLikes":{"a":true,"h":"Nb Likes","n":"nbLikes","r":false,"sh":"Number of likes","t":"`$INTEGER`","key$":"nbLikes","index$":13},"nbPosts":{"a":true,"h":"Nb Posts","n":"nbPosts","r":false,"sh":"Number of posts","t":"`$INTEGER`","key$":"nbPosts","index$":14},"nbSubscribers":{"a":true,"h":"Nb Subscribers","n":"nbSubscribers","r":false,"sh":"Number of subscribers","t":"`$INTEGER`","key$":"nbSubscribers","index$":15},"nbSubscriptions":{"a":true,"h":"Nb Subscriptions","n":"nbSubscriptions","r":false,"sh":"Number of subscriptions","t":"`$INTEGER`","key$":"nbSubscriptions","index$":16},"pl":{"a":true,"h":"Pl","n":"pl","r":false,"sh":"User playlists","t":"`$ARRAY`","key$":"pl","index$":17},"redirect":{"a":true,"h":"Redirect","n":"redirect","r":false,"sh":"URL to redirect to","t":"`$STRING`","key$":"redirect","index$":18},"twId":{"a":true,"h":"Tw Id","n":"twId","r":false,"sh":"Twitter handle","t":"`$STRING`","key$":"twId","index$":19},"twSec":{"a":true,"h":"Tw Sec","n":"twSec","r":false,"sh":"Twitter session secret","t":"`$STRING`","key$":"twSec","index$":20},"twTok":{"a":true,"h":"Tw Tok","n":"twTok","r":false,"sh":"Twitter session token","t":"`$STRING`","key$":"twTok","index$":21},"uId":{"a":true,"h":"U Id","n":"uId","r":false,"sh":"ID of new user if successful","t":"`$STRING`","key$":"uId","index$":22}},"id":{"field":"id","name":"id"},"name":"authentication","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /login","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/login","q":{},"r":{},"s":[{"lit":"login"}],"t":{"req":"`reqdata`","res":"`body.user`"},"index$":0},{"a":true,"co":{"id":"POST /register","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/register","q":{},"r":{},"s":[{"lit":"register"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"create"},"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /login","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"action","or":"action","r":true,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"ajax","or":"ajax","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"k":"query","n":"email","or":"email","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"include_user","or":"include_user","r":false,"t":"`$BOOLEAN`","index$":3},{"a":true,"k":"query","n":"md5","or":"md5","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/login","q":{"exist":["action","ajax","email","include_user","md5"]},"r":{},"s":[{"lit":"login"}],"t":{"req":"`reqdata`","res":"`body.user`"},"index$":0},{"a":true,"co":{"id":"GET /logout","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"ajax","or":"ajax","r":false,"t":"`$BOOLEAN`","index$":0}]},"k":"http","m":"GET","o":"/logout","q":{"exist":["ajax"]},"r":{},"s":[{"lit":"logout"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"authentication","name__orig":"authentication","Name":"Authentication","name_":"authentication","name-":"authentication","NAME":"AUTHENTICATION","index$":0}, {"active":true,"entity":"authentication","key$":"BasicAuthenticationFlow","kind":"basic","name":"BasicAuthenticationFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"authentication_ref01"},"m":{},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{"ref":"authentication_ref01","srcdatavar":"authentication_ref01_data","suffix":"_dt0"},"m":{},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-authentication_ref01"}}],"index$":1}]}, 'Authentication', {"POST /login":{"protocol":"http","operationId":"loginPost","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","properties":{"action":{"type":"string","enum":["login","forgot"]},"email":{"type":"string"},"md5":{"type":"string"},"ajax":{"type":"boolean"},"includeUser":{"type":"boolean"}},"required":["action"]}}}},"responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string"},"wrongPassword":{"type":"integer"},"redirect":{"type":"string"},"user":{"type":"object","properties":{"_id":{"description":"User ID","key$":"_id","type":"string"},"name":{"description":"Full name","key$":"name","type":"string"},"handle":{"description":"Username/handle","key$":"handle","type":"string"},"email":{"description":"Email address","key$":"email","type":"string"},"bio":{"description":"User biography","key$":"bio","type":"string"},"loc":{"description":"User location","key$":"loc","type":"string"},"img":{"description":"Avatar URL","key$":"img","type":"string"},"cvrImg":{"description":"Cover image URL","key$":"cvrImg","type":"string"},"isSubscribing":{"description":"Whether logged in user subscribes to this user","key$":"isSubscribing","type":"boolean"},"nbSubscribers":{"description":"Number of subscribers","key$":"nbSubscribers","type":"integer"},"nbPosts":{"description":"Number of posts","key$":"nbPosts","type":"integer"},"nbLikes":{"description":"Number of likes","key$":"nbLikes","type":"integer"},"nbSubscriptions":{"description":"Number of subscriptions","key$":"nbSubscriptions","type":"integer"},"lastArtists":{"description":"Recently posted artists","items":{"type":"string"},"key$":"lastArtists","type":"array"},"twId":{"description":"Twitter handle","key$":"twId","type":"string"},"twTok":{"description":"Twitter session token","key$":"twTok","type":"string"},"twSec":{"description":"Twitter session secret","key$":"twSec","type":"string"},"lastFm":{"key$":"lastFm","properties":{"name":{"description":"Last.fm username","type":"string"},"sk":{"description":"Last.fm session key","type":"string"}},"type":"object"},"lnk":{"key$":"lnk","properties":{"fb":{"description":"Facebook URL","type":"string"},"home":{"description":"Home page URL","type":"string"},"igrm":{"description":"Instagram handle","type":"string"},"sc":{"description":"SoundCloud handle","type":"string"},"tw":{"description":"Twitter handle","type":"string"},"yt":{"description":"YouTube handle","type":"string"}},"type":"object"},"pl":{"description":"User playlists","items":{"properties":{"id":{"description":"Playlist number","type":"integer","key$":"id"},"name":{"description":"Playlist name","type":"string","key$":"name"},"nbTracks":{"description":"Number of tracks in playlist","type":"integer","key$":"nbTracks"},"url":{"description":"Playlist URL","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/Playlist","index$":0},"key$":"pl","type":"array"}},"x-ref":"#/components/schemas/User","index$":0}}}}}}},"parameters":[],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"whydSid","description":"Session cookie obtained after successful login"}}},"POST /register":{"protocol":"http","operationId":"register","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"Full name of the user"},"email":{"type":"string","description":"Email address"},"password":{"type":"string","description":"Password"},"redirect":{"type":"string","description":"URL to redirect to after successful signup"},"ajax":{"type":"string","description":"Set to 'true' for JSON response"},"inviteCode":{"type":"string","description":"Invite code (deprecated)"},"iBy":{"type":"string","description":"ID of user who invited this user"},"iPg":{"type":"string","description":"URL of sign up page"},"iRf":{"type":"string","description":"Referrer of sign up page"},"iPo":{"type":"string","description":"Post ID from invitation (deprecated)"}},"required":["name","email","password"]}}}},"responses":{"200":{"description":"Successful registration","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"type":"string","description":"Error message if any","key$":"error"},"uId":{"type":"string","description":"ID of new user if successful","key$":"uId"},"redirect":{"type":"string","description":"URL to redirect to","key$":"redirect"}},"index$":0}}}}},"parameters":[],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"whydSid","description":"Session cookie obtained after successful login"}}},"GET /login":{"protocol":"http","operationId":"login","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"error":{"description":"Error message if any","key$":"error","type":"string"},"ok":{"description":"Success message for forgot password","key$":"ok","type":"string"},"wrongPassword":{"description":"Set to 1 if password is incorrect","key$":"wrongPassword","type":"integer"},"redirect":{"description":"URL to redirect to after successful login","key$":"redirect","type":"string"},"user":{"key$":"user","properties":{"_id":{"description":"User ID","key$":"_id","type":"string"},"bio":{"description":"User biography","key$":"bio","type":"string"},"cvrImg":{"description":"Cover image URL","key$":"cvrImg","type":"string"},"email":{"description":"Email address","key$":"email","type":"string"},"handle":{"description":"Username/handle","key$":"handle","type":"string"},"img":{"description":"Avatar URL","key$":"img","type":"string"},"isSubscribing":{"description":"Whether logged in user subscribes to this user","key$":"isSubscribing","type":"boolean"},"lastArtists":{"description":"Recently posted artists","items":{"type":"string"},"key$":"lastArtists","type":"array"},"lastFm":{"key$":"lastFm","properties":{"name":{"description":"Last.fm username","type":"string"},"sk":{"description":"Last.fm session key","type":"string"}},"type":"object"},"lnk":{"key$":"lnk","properties":{"fb":{"description":"Facebook URL","type":"string"},"home":{"description":"Home page URL","type":"string"},"igrm":{"description":"Instagram handle","type":"string"},"sc":{"description":"SoundCloud handle","type":"string"},"tw":{"description":"Twitter handle","type":"string"},"yt":{"description":"YouTube handle","type":"string"}},"type":"object"},"loc":{"description":"User location","key$":"loc","type":"string"},"name":{"description":"Full name","key$":"name","type":"string"},"nbLikes":{"description":"Number of likes","key$":"nbLikes","type":"integer"},"nbPosts":{"description":"Number of posts","key$":"nbPosts","type":"integer"},"nbSubscribers":{"description":"Number of subscribers","key$":"nbSubscribers","type":"integer"},"nbSubscriptions":{"description":"Number of subscriptions","key$":"nbSubscriptions","type":"integer"},"pl":{"description":"User playlists","items":{"properties":{"id":{"description":"Playlist number","type":"integer"},"name":{"description":"Playlist name","type":"string"},"nbTracks":{"description":"Number of tracks in playlist","type":"integer"},"url":{"description":"Playlist URL","type":"string"}},"type":"object","x-ref":"#/components/schemas/Playlist"},"key$":"pl","type":"array"},"twId":{"description":"Twitter handle","key$":"twId","type":"string"},"twSec":{"description":"Twitter session secret","key$":"twSec","type":"string"},"twTok":{"description":"Twitter session token","key$":"twTok","type":"string"}},"type":"object","x-ref":"#/components/schemas/User","index$":0}}}},"text/html":{"schema":{"type":"string"}}}}},"parameters":[{"name":"action","in":"query","required":true,"schema":{"type":"string","enum":["login","forgot"]},"description":"Action to perform: login or forgot password","index$":0},{"name":"email","in":"query","schema":{"type":"string"},"description":"Email address or username","index$":1},{"name":"md5","in":"query","schema":{"type":"string"},"description":"MD5-hashed password (for login action)","index$":2},{"name":"ajax","in":"query","schema":{"type":"boolean"},"description":"Return JSON response instead of HTML","index$":3},{"name":"includeUser","in":"query","schema":{"type":"boolean"},"description":"Include user object in response (for login action)","index$":4}],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"whydSid","description":"Session cookie obtained after successful login"}}},"GET /logout":{"protocol":"http","operationId":"logout","responses":{"200":{"description":"Successful logout","content":{"application/json":{"schema":{"type":"object"}},"text/html":{"schema":{"type":"string"}}}}},"parameters":[{"name":"ajax","in":"query","schema":{"type":"boolean"},"description":"Return JSON response instead of HTML","index$":0}],"security":[{"cookieAuth":[]}],"securitySource":"operation","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"whydSid","description":"Session cookie obtained after successful login"}}}})
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
  
