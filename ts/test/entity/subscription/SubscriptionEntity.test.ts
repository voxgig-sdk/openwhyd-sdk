

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


describe('SubscriptionEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when OPENWHYD_TEST_LIVE=TRUE.
  afterEach(liveDelay('OPENWHYD_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = OpenwhydSDK.test()
    const ent = testsdk.Subscription()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.OPENWHYD_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'subscription.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":0},{"active":true,"name":"isSubscribing","req":false,"short":"Whether logged in user follows this user","type":"`$BOOLEAN`","index$":1},{"active":true,"name":"uId","req":false,"short":"User ID","type":"`$STRING`","index$":2},{"active":true,"name":"uNm","req":false,"short":"User name","type":"`$STRING`","index$":3}],"id":{"field":"id","name":"id"},"name":"subscription","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"is_subscr","orig":"is_subscr","reqd":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"example":50,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"skip","orig":"skip","reqd":false,"type":"`$INTEGER`","index$":2}]},"contract":{"id":"GET /api/follow/fetchFollowers/{id}","json":"{\"operationId\":\"getFollowers\",\"parameters\":[{\"description\":\"User ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of subscribers to skip (pagination)\",\"in\":\"query\",\"name\":\"skip\",\"schema\":{\"type\":\"integer\"}},{\"description\":\"Number of subscribers to return\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":50,\"type\":\"integer\"}},{\"description\":\"Include subscription status for logged in user\",\"in\":\"query\",\"name\":\"isSubscr\",\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"isSubscribing\":{\"description\":\"Whether logged in user follows this user\",\"type\":\"boolean\"},\"uId\":{\"description\":\"User ID\",\"type\":\"string\"},\"uNm\":{\"description\":\"User name\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"security\":[{\"cookieAuth\":[]}],\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie obtained after successful login\",\"in\":\"cookie\",\"name\":\"whydSid\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/follow/fetchFollowers/{id}","segments":[{"lit":"api"},{"lit":"follow"},{"lit":"fetchFollowers"},{"var":"id"}],"select":{"exist":["id","is_subscr","limit","skip"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0},{"active":true,"args":{"params":[{"active":true,"kind":"param","name":"id","orig":"id","reqd":true,"type":"`$STRING`","index$":0}],"query":[{"active":true,"kind":"query","name":"is_subscr","orig":"is_subscr","reqd":false,"type":"`$BOOLEAN`","index$":0},{"active":true,"example":50,"kind":"query","name":"limit","orig":"limit","reqd":false,"type":"`$INTEGER`","index$":1},{"active":true,"kind":"query","name":"skip","orig":"skip","reqd":false,"type":"`$INTEGER`","index$":2}]},"contract":{"id":"GET /api/follow/fetchFollowing/{id}","json":"{\"operationId\":\"getFollowing\",\"parameters\":[{\"description\":\"User ID\",\"in\":\"path\",\"name\":\"id\",\"required\":true,\"schema\":{\"type\":\"string\"}},{\"description\":\"Number of subscriptions to skip (pagination)\",\"in\":\"query\",\"name\":\"skip\",\"schema\":{\"type\":\"integer\"}},{\"description\":\"Number of subscriptions to return\",\"in\":\"query\",\"name\":\"limit\",\"schema\":{\"default\":50,\"type\":\"integer\"}},{\"description\":\"Include subscription status for logged in user\",\"in\":\"query\",\"name\":\"isSubscr\",\"schema\":{\"type\":\"boolean\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"properties\":{\"isSubscribing\":{\"description\":\"Whether logged in user follows this user\",\"type\":\"boolean\"},\"uId\":{\"description\":\"User ID\",\"type\":\"string\"},\"uNm\":{\"description\":\"User name\",\"type\":\"string\"}},\"type\":\"object\"},\"type\":\"array\"}}},\"description\":\"Successful response\"}},\"security\":[{\"cookieAuth\":[]}],\"securitySchemes\":{\"cookieAuth\":{\"description\":\"Session cookie obtained after successful login\",\"in\":\"cookie\",\"name\":\"whydSid\",\"type\":\"apiKey\"}},\"securitySource\":\"operation\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/api/follow/fetchFollowing/{id}","segments":[{"lit":"api"},{"lit":"follow"},{"lit":"fetchFollowing"},{"var":"id"}],"select":{"exist":["id","is_subscr","limit","skip"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"subscription","name__orig":"subscription","Name":"Subscription","name_":"subscription","name-":"subscription","NAME":"SUBSCRIPTION","index$":5}, {"active":true,"entity":"subscription","key$":"BasicSubscriptionFlow","kind":"basic","name":"BasicSubscriptionFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"subscription_ref01","srcdatavar":"subscription_ref01_data","suffix":"_dt0"},"match":{"id":"subscription01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-subscription_ref01"}}],"index$":0}]}, 'Subscription')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let subscription_ref01_data = Object.values(setup.data.existing.subscription)[0] as any

    // LOAD
    const subscription_ref01_ent = client.Subscription()
    const subscription_ref01_match_dt0: any = {}
    subscription_ref01_match_dt0.id = subscription_ref01_data.id
    const subscription_ref01_data_dt0 = (await subscription_ref01_ent.load(subscription_ref01_match_dt0)).data()
    assert(subscription_ref01_data_dt0.id === subscription_ref01_data.id)


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/subscription/SubscriptionTestData.json')

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
    ['subscription01','subscription02','subscription03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'OPENWHYD_TEST_SUBSCRIPTION_ENTID': idmap,
    'OPENWHYD_TEST_LIVE': 'FALSE',
    'OPENWHYD_TEST_EXPLAIN': 'FALSE',
    'OPENWHYD_APIKEY': '',
  })

  idmap = env['OPENWHYD_TEST_SUBSCRIPTION_ENTID']

  const live = 'TRUE' === env.OPENWHYD_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['OPENWHYD_TEST_SUBSCRIPTION_ENTID']
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
  
