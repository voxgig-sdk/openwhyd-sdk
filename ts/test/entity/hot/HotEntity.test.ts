

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


describe('HotEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENWHYD_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENWHYD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenwhydSDK.test()
    const ent = testsdk.Hot()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENWHYD_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'hot.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ctx":{"a":true,"h":"Ctx","n":"ctx","r":false,"sh":"Context","t":"`$STRING`","key$":"ctx","index$":0},"eId":{"a":true,"h":"E Id","n":"eId","r":false,"sh":"External ID (platform identifier)","t":"`$STRING`","key$":"eId","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Post ID","t":"`$STRING`","key$":"id","index$":2},"img":{"a":true,"h":"Img","n":"img","r":false,"sh":"Track image URL","t":"`$STRING`","key$":"img","index$":3},"lov":{"a":true,"h":"Lov","n":"lov","r":false,"sh":"User IDs who liked this post","t":"`$ARRAY`","key$":"lov","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Track name","t":"`$STRING`","key$":"name","index$":5},"nbP":{"a":true,"h":"Nb P","n":"nbP","r":false,"sh":"Number of plays","t":"`$INTEGER`","key$":"nbP","index$":6},"nbR":{"a":true,"h":"Nb R","n":"nbR","r":false,"sh":"Number of reposts","t":"`$INTEGER`","key$":"nbR","index$":7},"score":{"a":true,"h":"Score","n":"score","r":false,"sh":"Search relevance score","t":"`$NUMBER`","key$":"score","index$":8},"src":{"a":true,"h":"Src","n":"src","r":false,"t":"`$OBJECT`","key$":"src","index$":9},"text":{"a":true,"h":"Text","n":"text","r":false,"sh":"Post text/comment","t":"`$STRING`","key$":"text","index$":10},"uId":{"a":true,"h":"U Id","n":"uId","r":false,"sh":"User ID of poster","t":"`$STRING`","key$":"uId","index$":11},"uNm":{"a":true,"h":"U Nm","n":"uNm","r":false,"sh":"User name of poster","t":"`$STRING`","key$":"uNm","index$":12},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"Direct URL to track","t":"`$STRING`","key$":"url","index$":13}},"id":{"field":"id","name":"id"},"name":"hot","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /hot/{genre}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"genre","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":0},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1}]},"k":"http","m":"GET","o":"/hot/{genre}","q":{"exist":["format","id","limit"]},"r":{"param":{"genre":"id"}},"s":[{"lit":"hot"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"hot","name__orig":"hot","Name":"Hot","name_":"hot","name-":"hot","NAME":"HOT","index$":2}, {"active":true,"entity":"hot","key$":"BasicHotFlow","kind":"basic","name":"BasicHotFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"hot_ref01","srcdatavar":"hot_ref01_data","suffix":"_dt0"},"m":{"id":"hot01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-hot_ref01"}}],"index$":0}]}, 'Hot', {"GET /hot/{genre}":{"protocol":"http","operationId":"getHotTracks","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"_id":{"description":"Post ID","type":"string","key$":"_id"},"uId":{"description":"User ID of poster","type":"string","key$":"uId"},"uNm":{"description":"User name of poster","type":"string","key$":"uNm"},"text":{"description":"Post text/comment","type":"string","key$":"text"},"name":{"description":"Track name","type":"string","key$":"name"},"eId":{"description":"External ID (platform identifier)","type":"string","key$":"eId"},"img":{"description":"Track image URL","type":"string","key$":"img"},"nbP":{"description":"Number of plays","type":"integer","key$":"nbP"},"nbR":{"description":"Number of reposts","type":"integer","key$":"nbR"},"lov":{"description":"User IDs who liked this post","items":{"type":"string"},"type":"array","key$":"lov"},"ctx":{"description":"Context","type":"string","key$":"ctx"},"src":{"properties":{"id":{"description":"Source URL","type":"string"},"name":{"description":"Source name","type":"string"}},"type":"object","key$":"src"},"url":{"description":"Direct URL to track","type":"string","key$":"url"},"score":{"description":"Search relevance score","type":"number","key$":"score"}},"x-ref":"#/components/schemas/Post","key$":"items"}}}}}},"parameters":[{"name":"genre","in":"path","required":true,"schema":{"type":"string"},"description":"Genre name (e.g., 'electro')","index$":0},{"name":"format","in":"query","schema":{"type":"string","enum":["json","links"]},"description":"Response format: json or links","index$":1},{"name":"limit","in":"query","schema":{"type":"integer","default":20},"description":"Number of posts to return","index$":2}],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"whydSid","description":"Session cookie obtained after successful login"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let hot_ref01_data = Object.values(setup.data.existing.hot)[0] as any

    // LOAD
    const hot_ref01_ent = client.Hot()
    const hot_ref01_match_dt0: any = {}
    hot_ref01_match_dt0.id = hot_ref01_data.id
    const hot_ref01_data_dt0 = (await hot_ref01_ent.load(hot_ref01_match_dt0)).data()
    assert(hot_ref01_data_dt0.id === hot_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/hot/HotTestData.json')

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
    ['hot01','hot02','hot03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENWHYD_TEST_HOT_ENTID': idmap,
    'OPENWHYD_TEST_LIVE': 'FALSE',
    'OPENWHYD_TEST_EXPLAIN': 'FALSE',
    'OPENWHYD_APIKEY': '',
  })

  idmap = env['OPENWHYD_TEST_HOT_ENTID']

  const live = 'TRUE' === env.OPENWHYD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENWHYD_TEST_HOT_ENTID']
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
  
