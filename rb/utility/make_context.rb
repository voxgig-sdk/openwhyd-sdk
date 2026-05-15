# Openwhyd SDK utility: make_context
require_relative '../core/context'
module OpenwhydUtilities
  MakeContext = ->(ctxmap, basectx) {
    OpenwhydContext.new(ctxmap, basectx)
  }
end
