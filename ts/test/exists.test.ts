
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { OpenwhydSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await OpenwhydSDK.test()
    equal(null !== testsdk, true)
  })

})
