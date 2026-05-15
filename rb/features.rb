# Openwhyd SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module OpenwhydFeatures
  def self.make_feature(name)
    case name
    when "base"
      OpenwhydBaseFeature.new
    when "test"
      OpenwhydTestFeature.new
    else
      OpenwhydBaseFeature.new
    end
  end
end
