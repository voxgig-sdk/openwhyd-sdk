# Openwhyd SDK exists test

require "minitest/autorun"
require_relative "../Openwhyd_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = OpenwhydSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
