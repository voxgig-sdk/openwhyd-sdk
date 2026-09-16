# Openwhyd SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module OpenwhydFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenwhydBaseFeature.new
    when "ratelimit"
      OpenwhydRatelimitFeature.new
    when "retry"
      OpenwhydRetryFeature.new
    when "test"
      OpenwhydTestFeature.new
    when "timeout"
      OpenwhydTimeoutFeature.new
    else
      OpenwhydBaseFeature.new
    end
  end
end
