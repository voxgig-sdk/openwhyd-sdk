

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


describe('UserEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENWHYD_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENWHYD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenwhydSDK.test()
    const ent = testsdk.User()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENWHYD_TEST_LIVE
    for (const op of ['create', 'list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'user.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Playlist number","t":"`$INTEGER`","key$":"id","index$":0},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Playlist name","t":"`$STRING`","key$":"name","index$":1},"nbTracks":{"a":true,"h":"Nb Tracks","n":"nbTracks","r":false,"sh":"Number of tracks in playlist","t":"`$INTEGER`","key$":"nbTracks","index$":2},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"Playlist URL","t":"`$STRING`","key$":"url","index$":3}},"id":{"field":"id","name":"id"},"name":"user","op":{"create":{"input":"data","name":"create","points":[{"a":true,"co":{"id":"POST /api/user","source":"openapi3","version":2},"g":{},"k":"http","m":"POST","o":"/api/user","q":{},"r":{},"s":[{"lit":"api"},{"lit":"user"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"create"},"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /api/user","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"count_like","or":"count_like","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"k":"query","n":"count_post","or":"count_post","r":false,"t":"`$BOOLEAN`","index$":1},{"a":true,"k":"query","n":"id","or":"id","r":false,"t":"`$STRING`","index$":2},{"a":true,"k":"query","n":"include_subscr","or":"include_subscr","r":false,"t":"`$BOOLEAN`","index$":3},{"a":true,"k":"query","n":"is_subscr","or":"is_subscr","r":false,"t":"`$BOOLEAN`","index$":4}]},"k":"http","m":"GET","o":"/api/user","q":{"exist":["count_like","count_post","id","include_subscr","is_subscr"]},"r":{},"s":[{"lit":"api"},{"lit":"user"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /{username}/info","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"username","or":"username","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/{username}/info","q":{"exist":["username"]},"r":{},"s":[{"var":"username"},{"lit":"info"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"user","name__orig":"user","Name":"User","name_":"user","name-":"user","NAME":"USER","index$":6}, {"active":true,"entity":"user","key$":"BasicUserFlow","kind":"basic","name":"BasicUserFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"user_ref01"},"m":{"username":"username01"},"o":"create","s":[],"v":[],"index$":0},{"a":true,"d":{},"i":{},"m":{"username":"username01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"user_ref01"}}],"index$":1}]}, 'User', {"POST /api/user":{"protocol":"http","operationId":"updateUser","requestBody":{"required":true,"content":{"application/x-www-form-urlencoded":{"schema":{"type":"object","properties":{"name":{"type":"string","description":"Full user name"},"img":{"type":"string","description":"Avatar URL"},"cvrImg":{"type":"string","description":"Cover image URL"},"pwd":{"type":"string","description":"New password (requires oldPwd)"},"oldPwd":{"type":"string","description":"Old password (required for password change)"},"handle":{"type":"string","description":"Username/handle"},"email":{"type":"string","description":"Email address"},"twId":{"type":"string","description":"Twitter handle"},"twTok":{"type":"string","description":"Twitter session token"},"twSec":{"type":"string","description":"Twitter session secret"},"bio":{"type":"string","description":"User biography"},"loc":{"type":"string","description":"User location"},"lnk_home":{"type":"string","description":"Homepage URL"},"lnk_fb":{"type":"string","description":"Facebook profile URL"},"lnk_tw":{"type":"string","description":"Twitter profile URL"},"lnk_sc":{"type":"string","description":"SoundCloud profile URL"},"lnk_yt":{"type":"string","description":"YouTube profile URL"},"lnk_igrm":{"type":"string","description":"Instagram profile URL"}}}}}},"responses":{"200":{"description":"Successful update","content":{"application/json":{"schema":{"oneOf":[{"type":"object","properties":{"_id":{"description":"User ID","key$":"_id","type":"string"},"name":{"description":"Full name","key$":"name","type":"string"},"handle":{"description":"Username/handle","key$":"handle","type":"string"},"email":{"description":"Email address","key$":"email","type":"string"},"bio":{"description":"User biography","key$":"bio","type":"string"},"loc":{"description":"User location","key$":"loc","type":"string"},"img":{"description":"Avatar URL","key$":"img","type":"string"},"cvrImg":{"description":"Cover image URL","key$":"cvrImg","type":"string"},"isSubscribing":{"description":"Whether logged in user subscribes to this user","key$":"isSubscribing","type":"boolean"},"nbSubscribers":{"description":"Number of subscribers","key$":"nbSubscribers","type":"integer"},"nbPosts":{"description":"Number of posts","key$":"nbPosts","type":"integer"},"nbLikes":{"description":"Number of likes","key$":"nbLikes","type":"integer"},"nbSubscriptions":{"description":"Number of subscriptions","key$":"nbSubscriptions","type":"integer"},"lastArtists":{"description":"Recently posted artists","items":{"type":"string"},"key$":"lastArtists","type":"array"},"twId":{"description":"Twitter handle","key$":"twId","type":"string"},"twTok":{"description":"Twitter session token","key$":"twTok","type":"string"},"twSec":{"description":"Twitter session secret","key$":"twSec","type":"string"},"lastFm":{"key$":"lastFm","properties":{"name":{"description":"Last.fm username","type":"string"},"sk":{"description":"Last.fm session key","type":"string"}},"type":"object"},"lnk":{"key$":"lnk","properties":{"fb":{"description":"Facebook URL","type":"string"},"home":{"description":"Home page URL","type":"string"},"igrm":{"description":"Instagram handle","type":"string"},"sc":{"description":"SoundCloud handle","type":"string"},"tw":{"description":"Twitter handle","type":"string"},"yt":{"description":"YouTube handle","type":"string"}},"type":"object"},"pl":{"description":"User playlists","items":{"properties":{"id":{"description":"Playlist number","type":"integer","key$":"id"},"name":{"description":"Playlist name","type":"string","key$":"name"},"nbTracks":{"description":"Number of tracks in playlist","type":"integer","key$":"nbTracks"},"url":{"description":"Playlist URL","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/Playlist","index$":0},"key$":"pl","type":"array"}},"x-ref":"#/components/schemas/User"},{"type":"object","properties":{"error":{"type":"string"}}}],"index$":0}}}}},"parameters":[],"security":[{"cookieAuth":[]}],"securitySource":"operation","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"whydSid","description":"Session cookie obtained after successful login"}}},"GET /api/user":{"protocol":"http","operationId":"getUser","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"_id":{"description":"User ID","key$":"_id","type":"string"},"name":{"description":"Full name","key$":"name","type":"string"},"handle":{"description":"Username/handle","key$":"handle","type":"string"},"email":{"description":"Email address","key$":"email","type":"string"},"bio":{"description":"User biography","key$":"bio","type":"string"},"loc":{"description":"User location","key$":"loc","type":"string"},"img":{"description":"Avatar URL","key$":"img","type":"string"},"cvrImg":{"description":"Cover image URL","key$":"cvrImg","type":"string"},"isSubscribing":{"description":"Whether logged in user subscribes to this user","key$":"isSubscribing","type":"boolean"},"nbSubscribers":{"description":"Number of subscribers","key$":"nbSubscribers","type":"integer"},"nbPosts":{"description":"Number of posts","key$":"nbPosts","type":"integer"},"nbLikes":{"description":"Number of likes","key$":"nbLikes","type":"integer"},"nbSubscriptions":{"description":"Number of subscriptions","key$":"nbSubscriptions","type":"integer"},"lastArtists":{"description":"Recently posted artists","items":{"type":"string"},"key$":"lastArtists","type":"array"},"twId":{"description":"Twitter handle","key$":"twId","type":"string"},"twTok":{"description":"Twitter session token","key$":"twTok","type":"string"},"twSec":{"description":"Twitter session secret","key$":"twSec","type":"string"},"lastFm":{"key$":"lastFm","properties":{"name":{"description":"Last.fm username","type":"string"},"sk":{"description":"Last.fm session key","type":"string"}},"type":"object"},"lnk":{"key$":"lnk","properties":{"fb":{"description":"Facebook URL","type":"string"},"home":{"description":"Home page URL","type":"string"},"igrm":{"description":"Instagram handle","type":"string"},"sc":{"description":"SoundCloud handle","type":"string"},"tw":{"description":"Twitter handle","type":"string"},"yt":{"description":"YouTube handle","type":"string"}},"type":"object"},"pl":{"description":"User playlists","items":{"properties":{"id":{"description":"Playlist number","type":"integer","key$":"id"},"name":{"description":"Playlist name","type":"string","key$":"name"},"nbTracks":{"description":"Number of tracks in playlist","type":"integer","key$":"nbTracks"},"url":{"description":"Playlist URL","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/Playlist","index$":0},"key$":"pl","type":"array"}},"x-ref":"#/components/schemas/User"}}}}},"parameters":[{"name":"id","in":"query","schema":{"type":"string"},"description":"User ID (logged in user if not provided)","index$":0},{"name":"isSubscr","in":"query","schema":{"type":"boolean"},"description":"Include subscription status","index$":1},{"name":"countPosts","in":"query","schema":{"type":"boolean"},"description":"Include post count","index$":2},{"name":"countLikes","in":"query","schema":{"type":"boolean"},"description":"Include likes count","index$":3},{"name":"includeSubscr","in":"query","schema":{"type":"boolean"},"description":"Include subscriber and subscription counts","index$":4}],"security":[{"cookieAuth":[]}],"securitySource":"operation","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"whydSid","description":"Session cookie obtained after successful login"}}},"GET /{username}/info":{"protocol":"http","operationId":"getUserInfo","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"object","properties":{"_id":{"description":"User ID","key$":"_id","type":"string"},"name":{"description":"Full name","key$":"name","type":"string"},"handle":{"description":"Username/handle","key$":"handle","type":"string"},"email":{"description":"Email address","key$":"email","type":"string"},"bio":{"description":"User biography","key$":"bio","type":"string"},"loc":{"description":"User location","key$":"loc","type":"string"},"img":{"description":"Avatar URL","key$":"img","type":"string"},"cvrImg":{"description":"Cover image URL","key$":"cvrImg","type":"string"},"isSubscribing":{"description":"Whether logged in user subscribes to this user","key$":"isSubscribing","type":"boolean"},"nbSubscribers":{"description":"Number of subscribers","key$":"nbSubscribers","type":"integer"},"nbPosts":{"description":"Number of posts","key$":"nbPosts","type":"integer"},"nbLikes":{"description":"Number of likes","key$":"nbLikes","type":"integer"},"nbSubscriptions":{"description":"Number of subscriptions","key$":"nbSubscriptions","type":"integer"},"lastArtists":{"description":"Recently posted artists","items":{"type":"string"},"key$":"lastArtists","type":"array"},"twId":{"description":"Twitter handle","key$":"twId","type":"string"},"twTok":{"description":"Twitter session token","key$":"twTok","type":"string"},"twSec":{"description":"Twitter session secret","key$":"twSec","type":"string"},"lastFm":{"key$":"lastFm","properties":{"name":{"description":"Last.fm username","type":"string"},"sk":{"description":"Last.fm session key","type":"string"}},"type":"object"},"lnk":{"key$":"lnk","properties":{"fb":{"description":"Facebook URL","type":"string"},"home":{"description":"Home page URL","type":"string"},"igrm":{"description":"Instagram handle","type":"string"},"sc":{"description":"SoundCloud handle","type":"string"},"tw":{"description":"Twitter handle","type":"string"},"yt":{"description":"YouTube handle","type":"string"}},"type":"object"},"pl":{"description":"User playlists","items":{"properties":{"id":{"description":"Playlist number","type":"integer","key$":"id"},"name":{"description":"Playlist name","type":"string","key$":"name"},"nbTracks":{"description":"Number of tracks in playlist","type":"integer","key$":"nbTracks"},"url":{"description":"Playlist URL","type":"string","key$":"url"}},"type":"object","x-ref":"#/components/schemas/Playlist","index$":0},"key$":"pl","type":"array"}},"x-ref":"#/components/schemas/User"}}}}},"parameters":[{"name":"username","in":"path","required":true,"schema":{"type":"string"},"description":"Username of the user","index$":0}],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"whydSid","description":"Session cookie obtained after successful login"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select


    // CREATE
    const user_ref01_ent = client.User()
    let user_ref01_data = setup.data.new.user['user_ref01']
    user_ref01_data['username'] = setup.idmap['username01']

    user_ref01_data = (await user_ref01_ent.create(user_ref01_data)).data()
    assert(null != user_ref01_data.id)


    // LIST
    const user_ref01_match: any = {}
    user_ref01_match['username'] = setup.idmap['username01']

    const user_ref01_list = (await user_ref01_ent.list(user_ref01_match)).map((e: any) => e.data())

    assert(!isempty(select(user_ref01_list, { id: user_ref01_data.id })))


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/user/UserTestData.json')

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
    ['user01','user02','user03','username01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENWHYD_TEST_USER_ENTID': idmap,
    'OPENWHYD_TEST_LIVE': 'FALSE',
    'OPENWHYD_TEST_EXPLAIN': 'FALSE',
    'OPENWHYD_APIKEY': '',
  })

  idmap = env['OPENWHYD_TEST_USER_ENTID']

  const live = 'TRUE' === env.OPENWHYD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENWHYD_TEST_USER_ENTID']
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
  
