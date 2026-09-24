
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpenwhydSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = OpenwhydSDK.test()
    equal(testsdk instanceof OpenwhydSDK, true,
      'OpenwhydSDK.test() must return a client synchronously')
  })

})
