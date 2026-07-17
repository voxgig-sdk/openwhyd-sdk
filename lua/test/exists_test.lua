-- Openwhyd SDK exists test

local sdk = require("openwhyd_sdk")

describe("OpenwhydSDK", function()
  it("should create test SDK", function()
    local testsdk = sdk.test(nil, nil)
    assert.is_not_nil(testsdk)
  end)
end)
