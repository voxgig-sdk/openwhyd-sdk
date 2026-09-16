

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


describe('PostEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENWHYD_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENWHYD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenwhydSDK.test()
    const ent = testsdk.Post()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENWHYD_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'post.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"ctx","req":false,"short":"Context","type":"`$STRING`","index$":0},{"active":true,"name":"eId","req":false,"short":"External ID (platform identifier)","type":"`$STRING`","index$":1},{"active":true,"name":"id","req":false,"short":"Post ID","type":"`$STRING`","index$":2},{"active":true,"name":"img","req":false,"short":"Track image URL","type":"`$STRING`","index$":3},{"active":true,"name":"lov","req":false,"short":"User IDs who liked this post","type":"`$ARRAY`","index$":4},{"active":true,"name":"name","req":false,"short":"Track name","type":"`$STRING`","index$":5},{"active":true,"name":"nbP","req":false,"short":"Number of plays","type":"`$INTEGER`","index$":6},{"active":true,"name":"nbR","req":false,"short":"Number of reposts","type":"`$INTEGER`","index$":7},{"active":true,"name":"score","req":false,"short":"Search relevance score","type":"`$NUMBER`","index$":8},{"active":true,"name":"src","req":false,"type":"`$OBJECT`","index$":9},{"active":true,"name":"text","req":false,"short":"Post text/comment","type":"`$STRING`","index$":10},{"active":true,"name":"uId","req":false,"short":"User ID of poster","type":"`$STRING`","index$":11},{"active":true,"name":"uNm","req":false,"short":"User name of poster","type":"`$STRING`","index$":12},{"active":true,"name":"url","req":false,"short":"Direct URL to track","type":"`$STRING`","index$":13}],"id":{"field":"id","name":"id"},"name":"post","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"playlist_id","orig":"playlist_id","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"kind":"param","name":"username","orig":"username","reqd":true,"type":"`$STRING`","index$":1}],"query":[{"active":true,"kind":"query","name":"after","orig":"after","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":1},{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":2}]},"contract":{"id":"GET /{username}/playlist/{playlistId}","json":"{\"operationId\":\"getPlaylistTracks\",\"parameters\":[{\"description\":\"Username of the user\",\"in\":\"path\",\"name\":\"username\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"ID of the playlist\",\"in\":\"path\",\"name\":\"playlistId\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Response format: json or links\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"links\"],\"type\":\"string\"}},{\"description\":\"Number of posts to return\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":20,\"type\":\"integer\"}},{\"description\":\"Identifier of the post from which entries must be returned (for pagination)\",\"in\":\"query\",\"name\":\"after\",\"schema\":{\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"_id\":{\"description\":\"Post ID\",\"type\":\"string\"},\"ctx\":{\"description\":\"Context\",\"type\":\"string\"},\"eId\":{\"description\":\"External ID (platform identifier)\",\"type\":\"string\"},\"img\":{\"description\":\"Track image URL\",\"type\":\"string\"},\"lov\":{\"description\":\"User IDs who liked this post\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"description\":\"Track name\",\"type\":\"string\"},\"nbP\":{\"description\":\"Number of plays\",\"type\":\"integer\"},\"nbR\":{\"description\":\"Number of reposts\",\"type\":\"integer\"},\"score\":{\"description\":\"Search relevance score\",\"type\":\"number\"},\"src\":{\"properties\":{\"id\":{\"description\":\"Source URL\",\"type\":\"string\"},\"name\":{\"description\":\"Source name\",\"type\":\"string\"}},\"type\":\"object\"},\"text\":{\"description\":\"Post text/comment\",\"type\":\"string\"},\"uId\":{\"description\":\"User ID of poster\",\"type\":\"string\"},\"uNm\":{\"description\":\"User name of poster\",\"type\":\"string\"},\"url\":{\"description\":\"Direct URL to track\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}},\"text/plain\":{\"schema\":{\"description\":\"List of URLs, one per line\",\"type\":\"string\"}}},\"description\":\"Successful response\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie obtained after successful login\",\"in\":\"cookie\",\"name\":\"whydSid\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/{username}/playlist/{playlistId}","rename":{"param":{"playlistId":"playlist_id"}},"segments":[{"var":"username"},{"lit":"playlist"},{"var":"playlist_id"}],"select":{"exist":["after","format","limit","playlist_id","username"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"genre","orig":"genre","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"format","orig":"format","reqd":false,"type":"`$STRING`","index$":0},{"active":true,"example":20,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1}]},"contract":{"id":"GET /hot/{genre}","json":"{\"operationId\":\"getHotTracks\",\"parameters\":[{\"description\":\"Genre name (e.g., 'electro')\",\"in\":\"path\",\"name\":\"genre\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Response format: json or links\",\"in\":\"query\",\"name\":\"format\",\"schema\":{\"enum\":[\"json\",\"links\"],\"type\":\"string\"}},{\"description\":\"Number of posts to return\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":20,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"_id\":{\"description\":\"Post ID\",\"type\":\"string\"},\"ctx\":{\"description\":\"Context\",\"type\":\"string\"},\"eId\":{\"description\":\"External ID (platform identifier)\",\"type\":\"string\"},\"img\":{\"description\":\"Track image URL\",\"type\":\"string\"},\"lov\":{\"description\":\"User IDs who liked this post\",\"items\":{\"type\":\"string\"},\"type\":\"array\"},\"name\":{\"description\":\"Track name\",\"type\":\"string\"},\"nbP\":{\"description\":\"Number of plays\",\"type\":\"integer\"},\"nbR\":{\"description\":\"Number of reposts\",\"type\":\"integer\"},\"score\":{\"description\":\"Search relevance score\",\"type\":\"number\"},\"src\":{\"properties\":{\"id\":{\"description\":\"Source URL\",\"type\":\"string\"},\"name\":{\"description\":\"Source name\",\"type\":\"string\"}},\"type\":\"object\"},\"text\":{\"description\":\"Post text/comment\",\"type\":\"string\"},\"uId\":{\"description\":\"User ID of poster\",\"type\":\"string\"},\"uNm\":{\"description\":\"User name of poster\",\"type\":\"string\"},\"url\":{\"description\":\"Direct URL to track\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie obtained after successful login\",\"in\":\"cookie\",\"name\":\"whydSid\",\"type\":\"apiKey\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/hot/{genre}","segments":[{"lit":"hot"},{"var":"genre"}],"select":{"exist":["format","genre","limit"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["hot"],["playlist"]]},"key$":"post","name__orig":"post","Name":"Post","name_":"post","name-":"post","NAME":"POST","index$":3}, {"active":true,"entity":"post","key$":"BasicPostFlow","kind":"basic","name":"BasicPostFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"post_ref01","srcdatavar":"post_ref01_data","suffix":"_dt0"},"match":{"id":"post01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-post_ref01"}}],"index$":0}]}, 'Post')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let post_ref01_data = Object.values(setup.data.existing.post)[0] as any

    // LOAD
    const post_ref01_ent = client.Post()
    const post_ref01_match_dt0: any = {}
    post_ref01_match_dt0.id = post_ref01_data.id
    const post_ref01_data_dt0 = (await post_ref01_ent.load(post_ref01_match_dt0)).data()
    assert(post_ref01_data_dt0.id === post_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/post/PostTestData.json')

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
    ['post01','post02','post03','hot01','hot02','hot03','playlist01','playlist02','playlist03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENWHYD_TEST_POST_ENTID': idmap,
    'OPENWHYD_TEST_LIVE': 'FALSE',
    'OPENWHYD_TEST_EXPLAIN': 'FALSE',
    'OPENWHYD_APIKEY': '',
  })

  idmap = env['OPENWHYD_TEST_POST_ENTID']

  const live = 'TRUE' === env.OPENWHYD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENWHYD_TEST_POST_ENTID']
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
  
