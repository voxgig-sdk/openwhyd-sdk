

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


describe('GetUserPostEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENWHYD_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENWHYD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenwhydSDK.test()
    const ent = testsdk.GetUserPost()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENWHYD_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'get_user_post.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"ctx":{"a":true,"h":"Ctx","n":"ctx","r":false,"sh":"Context","t":"`$STRING`","key$":"ctx","index$":0},"eId":{"a":true,"h":"E Id","n":"eId","r":false,"sh":"External ID (platform identifier)","t":"`$STRING`","key$":"eId","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"sh":"Post ID","t":"`$STRING`","key$":"id","index$":2},"img":{"a":true,"h":"Img","n":"img","r":false,"sh":"Track image URL","t":"`$STRING`","key$":"img","index$":3},"lov":{"a":true,"h":"Lov","n":"lov","r":false,"sh":"User IDs who liked this post","t":"`$ARRAY`","key$":"lov","index$":4},"name":{"a":true,"h":"Name","n":"name","r":false,"sh":"Track name","t":"`$STRING`","key$":"name","index$":5},"nbP":{"a":true,"h":"Nb P","n":"nbP","r":false,"sh":"Number of plays","t":"`$INTEGER`","key$":"nbP","index$":6},"nbR":{"a":true,"h":"Nb R","n":"nbR","r":false,"sh":"Number of reposts","t":"`$INTEGER`","key$":"nbR","index$":7},"score":{"a":true,"h":"Score","n":"score","r":false,"sh":"Search relevance score","t":"`$NUMBER`","key$":"score","index$":8},"src":{"a":true,"h":"Src","n":"src","r":false,"t":"`$OBJECT`","key$":"src","index$":9},"text":{"a":true,"h":"Text","n":"text","r":false,"sh":"Post text/comment","t":"`$STRING`","key$":"text","index$":10},"uId":{"a":true,"h":"U Id","n":"uId","r":false,"sh":"User ID of poster","t":"`$STRING`","key$":"uId","index$":11},"uNm":{"a":true,"h":"U Nm","n":"uNm","r":false,"sh":"User name of poster","t":"`$STRING`","key$":"uNm","index$":12},"url":{"a":true,"h":"Url","n":"url","r":false,"sh":"Direct URL to track","t":"`$STRING`","key$":"url","index$":13}},"id":{"field":"id","name":"id"},"name":"get_user_post","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /{username}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"username","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"after","or":"after","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"callback","or":"callback","r":false,"t":"`$STRING`","index$":1},{"a":true,"k":"query","n":"format","or":"format","r":false,"t":"`$STRING`","index$":2},{"a":true,"ex":20,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":3}]},"k":"http","m":"GET","o":"/{username}","q":{"exist":["after","callback","format","id","limit"]},"r":{"param":{"username":"id"}},"s":[{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"get_user_post","name__orig":"get_user_post","Name":"GetUserPost","name_":"get_user_post","name-":"get-user-post","NAME":"GET_USER_POST","index$":1}, {"active":true,"entity":"get_user_post","key$":"BasicGetUserPostFlow","kind":"basic","name":"BasicGetUserPostFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{"username":"username01"},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"get_user_post_ref01"}}],"index$":0}]}, 'GetUserPost', {"GET /{username}":{"protocol":"http","operationId":"getUserPosts","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"_id":{"description":"Post ID","type":"string","key$":"_id"},"uId":{"description":"User ID of poster","type":"string","key$":"uId"},"uNm":{"description":"User name of poster","type":"string","key$":"uNm"},"text":{"description":"Post text/comment","type":"string","key$":"text"},"name":{"description":"Track name","type":"string","key$":"name"},"eId":{"description":"External ID (platform identifier)","type":"string","key$":"eId"},"img":{"description":"Track image URL","type":"string","key$":"img"},"nbP":{"description":"Number of plays","type":"integer","key$":"nbP"},"nbR":{"description":"Number of reposts","type":"integer","key$":"nbR"},"lov":{"description":"User IDs who liked this post","items":{"type":"string"},"type":"array","key$":"lov"},"ctx":{"description":"Context","type":"string","key$":"ctx"},"src":{"properties":{"id":{"description":"Source URL","type":"string"},"name":{"description":"Source name","type":"string"}},"type":"object","key$":"src"},"url":{"description":"Direct URL to track","type":"string","key$":"url"},"score":{"description":"Search relevance score","type":"number","key$":"score"}},"x-ref":"#/components/schemas/Post","index$":0}}},"text/plain":{"schema":{"type":"string","description":"List of URLs, one per line"}}}}},"parameters":[{"name":"username","in":"path","required":true,"schema":{"type":"string"},"description":"Username of the user","index$":0},{"name":"format","in":"query","schema":{"type":"string","enum":["json","links"]},"description":"Response format: json or links","index$":1},{"name":"limit","in":"query","schema":{"type":"integer","default":20},"description":"Number of posts to return","index$":2},{"name":"after","in":"query","schema":{"type":"string"},"description":"Identifier of the post from which entries must be returned (for pagination)","index$":3},{"name":"callback","in":"query","schema":{"type":"string"},"description":"JavaScript function name for JSONP access","index$":4}],"securitySource":"unspecified","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"whydSid","description":"Session cookie obtained after successful login"}}}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let get_user_post_ref01_data = Object.values(setup.data.existing.get_user_post)[0] as any

    // LIST
    const get_user_post_ref01_ent = client.GetUserPost()
    const get_user_post_ref01_match: any = {}
    get_user_post_ref01_match['username'] = setup.idmap['username01']

    const get_user_post_ref01_list = (await get_user_post_ref01_ent.list(get_user_post_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/get_user_post/GetUserPostTestData.json')

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
    ['get_user_post01','get_user_post02','get_user_post03','username01'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENWHYD_TEST_GET_USER_POST_ENTID': idmap,
    'OPENWHYD_TEST_LIVE': 'FALSE',
    'OPENWHYD_TEST_EXPLAIN': 'FALSE',
    'OPENWHYD_APIKEY': '',
  })

  idmap = env['OPENWHYD_TEST_GET_USER_POST_ENTID']

  const live = 'TRUE' === env.OPENWHYD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENWHYD_TEST_GET_USER_POST_ENTID']
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
  
