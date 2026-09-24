

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
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":0},"isSubscribing":{"a":true,"h":"Is Subscribing","n":"isSubscribing","r":false,"sh":"Whether logged in user follows this user","t":"`$BOOLEAN`","key$":"isSubscribing","index$":1},"uId":{"a":true,"h":"U Id","n":"uId","r":false,"sh":"User ID","t":"`$STRING`","key$":"uId","index$":2},"uNm":{"a":true,"h":"U Nm","n":"uNm","r":false,"sh":"User name","t":"`$STRING`","key$":"uNm","index$":3}},"id":{"field":"id","name":"id"},"name":"subscription","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /api/follow/fetchFollowers/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"is_subscr","or":"is_subscr","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"skip","or":"skip","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/api/follow/fetchFollowers/{id}","q":{"exist":["id","is_subscr","limit","skip"]},"r":{},"s":[{"lit":"api"},{"lit":"follow"},{"lit":"fetchFollowers"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":0},{"a":true,"co":{"id":"GET /api/follow/fetchFollowing/{id}","source":"openapi3","version":2},"g":{"params":[{"a":true,"k":"param","n":"id","or":"id","r":true,"t":"`$STRING`","index$":0}],"query":[{"a":true,"k":"query","n":"is_subscr","or":"is_subscr","r":false,"t":"`$BOOLEAN`","index$":0},{"a":true,"ex":50,"k":"query","n":"limit","or":"limit","r":false,"t":"`$INTEGER`","index$":1},{"a":true,"k":"query","n":"skip","or":"skip","r":false,"t":"`$INTEGER`","index$":2}]},"k":"http","m":"GET","o":"/api/follow/fetchFollowing/{id}","q":{"exist":["id","is_subscr","limit","skip"]},"r":{},"s":[{"lit":"api"},{"lit":"follow"},{"lit":"fetchFollowing"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body`"},"index$":1}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"subscription","name__orig":"subscription","Name":"Subscription","name_":"subscription","name-":"subscription","NAME":"SUBSCRIPTION","index$":5}, {"active":true,"entity":"subscription","key$":"BasicSubscriptionFlow","kind":"basic","name":"BasicSubscriptionFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"subscription_ref01","srcdatavar":"subscription_ref01_data","suffix":"_dt0"},"m":{"id":"subscription01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-subscription_ref01"}}],"index$":0}]}, 'Subscription', {"GET /api/follow/fetchFollowers/{id}":{"protocol":"http","operationId":"getFollowers","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"uId":{"type":"string","description":"User ID","key$":"uId"},"uNm":{"type":"string","description":"User name","key$":"uNm"},"isSubscribing":{"type":"boolean","description":"Whether logged in user follows this user","key$":"isSubscribing"}},"key$":"items"}}}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"description":"User ID","index$":0},{"name":"skip","in":"query","schema":{"type":"integer"},"description":"Number of subscribers to skip (pagination)","index$":1},{"name":"limit","in":"query","schema":{"type":"integer","default":50},"description":"Number of subscribers to return","index$":2},{"name":"isSubscr","in":"query","schema":{"type":"boolean"},"description":"Include subscription status for logged in user","index$":3}],"security":[{"cookieAuth":[]}],"securitySource":"operation","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"whydSid","description":"Session cookie obtained after successful login"}}},"GET /api/follow/fetchFollowing/{id}":{"protocol":"http","operationId":"getFollowing","responses":{"200":{"description":"Successful response","content":{"application/json":{"schema":{"type":"array","items":{"type":"object","properties":{"uId":{"type":"string","description":"User ID","key$":"uId"},"uNm":{"type":"string","description":"User name","key$":"uNm"},"isSubscribing":{"type":"boolean","description":"Whether logged in user follows this user","key$":"isSubscribing"}},"key$":"items"}}}}}},"parameters":[{"name":"id","in":"path","required":true,"schema":{"type":"string"},"description":"User ID","index$":0},{"name":"skip","in":"query","schema":{"type":"integer"},"description":"Number of subscriptions to skip (pagination)","index$":1},{"name":"limit","in":"query","schema":{"type":"integer","default":50},"description":"Number of subscriptions to return","index$":2},{"name":"isSubscr","in":"query","schema":{"type":"boolean"},"description":"Include subscription status for logged in user","index$":3}],"security":[{"cookieAuth":[]}],"securitySource":"operation","securitySchemes":{"cookieAuth":{"type":"apiKey","in":"cookie","name":"whydSid","description":"Session cookie obtained after successful login"}}}})
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
  
