

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


describe('SearchEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENWHYD_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENWHYD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenwhydSDK.test()
    const ent = testsdk.Search()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENWHYD_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'search.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"q":{"a":true,"h":"Q","n":"q","r":false,"sh":"Search query","t":"`$STRING`","key$":"q","index$":0},"results":{"a":true,"h":"Results","n":"results","r":false,"t":"`$ARRAY`","union":{"branches":3,"count":1,"depth":1},"key$":"results","index$":1}},"name":"search","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /search","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"context","or":"context","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"q","or":"q","r":true,"t":"`$STRING`","index$":2}]},"k":"http","m":"GET","o":"/search","q":{"exist":["context","format","q"]},"r":{},"s":[{"lit":"search"}],"t":{"req":"`reqdata`","res":"`body.results`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"search","name__orig":"search","Name":"Search","name_":"search","name-":"search","NAME":"SEARCH","index$":4}, {"active":true,"entity":"search","key$":"BasicSearchFlow","kind":"basic","name":"BasicSearchFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"search_ref01"}}],"index$":0}]}, 'Search', {"GET /search":{"protocol":"http","operationId":"search","responses":{"200":{"description":"Successful search","content":{"application/json":{"schema":{"type":"object","properties":{"q":{"description":"Search query","key$":"q","type":"string"},"results":{"items":{"oneOf":[{"properties":{"_id":{"description":"Post ID","type":"string"},"ctx":{"description":"Context","type":"string"},"eId":{"description":"External ID (platform identifier)","type":"string"},"img":{"description":"Track image URL","type":"string"},"lov":{"description":"User IDs who liked this post","items":{"type":"string"},"type":"array"},"name":{"description":"Track name","type":"string"},"nbP":{"description":"Number of plays","type":"integer"},"nbR":{"description":"Number of reposts","type":"integer"},"score":{"description":"Search relevance score","type":"number"},"src":{"properties":{"id":{"description":"Source URL","type":"string"},"name":{"description":"Source name","type":"string"}},"type":"object"},"text":{"description":"Post text/comment","type":"string"},"uId":{"description":"User ID of poster","type":"string"},"uNm":{"description":"User name of poster","type":"string"},"url":{"description":"Direct URL to track","type":"string"}},"type":"object","x-ref":"#/components/schemas/Post"},{"properties":{"_id":{"description":"User ID","key$":"_id","type":"string"},"bio":{"description":"User biography","key$":"bio","type":"string"},"cvrImg":{"description":"Cover image URL","key$":"cvrImg","type":"string"},"email":{"description":"Email address","key$":"email","type":"string"},"handle":{"description":"Username/handle","key$":"handle","type":"string"},"img":{"description":"Avatar URL","key$":"img","type":"string"},"isSubscribing":{"description":"Whether logged in user subscribes to this user","key$":"isSubscribing","type":"boolean"},"lastArtists":{"description":"Recently posted artists","items":{"type":"string"},"key$":"lastArtists","type":"array"},"lastFm":{"key$":"lastFm","properties":{"name":{"description":"Last.fm username","type":"string"},"sk":{"description":"Last.fm session key","type":"string"}},"type":"object"},"lnk":{"key$":"lnk","properties":{"fb":{"description":"Facebook URL","type":"string"},"home":{"description":"Home page URL","type":"string"},"igrm":{"description":"Instagram handle","type":"string"},"sc":{"description":"SoundCloud handle","type":"string"},"tw":{"description":"Twitter handle","type":"string"},"yt":{"description":"YouTube handle","type":"string"}},"type":"object"},"loc":{"description":"User location","key$":"loc","type":"string"},"name":{"description":"Full name","key$":"name","type":"string"},"nbLikes":{"description":"Number of likes","key$":"nbLikes","type":"integer"},"nbPosts":{"description":"Number of posts","key$":"nbPosts","type":"integer"},"nbSubscribers":{"description":"Number of subscribers","key$":"nbSubscribers","type":"integer"},"nbSubscriptions":{"description":"Number of subscriptions","key$":"nbSubscriptions","type":"integer"},"pl":{"description":"User playlists","items":{"properties":{"id":{"description":"Playlist number","type":"integer"},"name":{"description":"Playlist name","type":"string"},"nbTracks":{"description":"Number of tracks in playlist","type":"integer"},"url":{"description":"Playlist URL","type":"string"}},"type":"object","x-ref":"#/components/schemas/Playlist"},"key$":"pl","type":"array"},"twId":{"description":"Twitter handle","key$":"twId","type":"string"},"twSec":{"description":"Twitter session secret","key$":"twSec","type":"string"},"twTok":{"description":"Twitter session token","key$":"twTok","type":"string"}},"type":"object","x-ref":"#/components/schemas/User"},{"properties":{"id":{"description":"Playlist number","type":"integer"},"name":{"description":"Playlist name","type":"string"},"nbTracks":{"description":"Number of tracks in playlist","type":"integer"},"url":{"description":"Playlist URL","type":"string"}},"type":"object","x-ref":"#/components/schemas/Playlist"}]},"key$":"results","type":"array"}},"index$":0}},"text/html":{"schema":{"type":"string"}}}}},"parameters":[{"name":"q","in":"query","required":true,"schema":{"type":"string"},"description":"Search query","index$":0},{"name":"context","in":"query","schema":{"type":"string","enum":["addTrack","quick"]},"description":"Search context: addTrack (search others), quick (search own + others)","index$":1},{"name":"format","in":"query","schema":{"type":"string","enum":["json"]},"description":"Response format","index$":2}],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"whydSid","description":"Session cookie obtained after successful login"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let search_ref01_data = Object.values(setup.data.existing.search)[0] as any

    // LIST
    const search_ref01_ent = client.Search()
    const search_ref01_match: any = {}

    const search_ref01_list = (await search_ref01_ent.list(search_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/search/SearchTestData.json')

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
    ['search01','search02','search03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENWHYD_TEST_SEARCH_ENTID': idmap,
    'OPENWHYD_TEST_LIVE': 'FALSE',
    'OPENWHYD_TEST_EXPLAIN': 'FALSE',
    'OPENWHYD_APIKEY': '',
  })

  idmap = env['OPENWHYD_TEST_SEARCH_ENTID']

  const live = 'TRUE' === env.OPENWHYD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENWHYD_TEST_SEARCH_ENTID']
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
  
