-- Openwhyd SDK error

local OpenwhydError = {}
OpenwhydError.__index = OpenwhydError


function OpenwhydError.new(code, msg, ctx)
  local self = setmetatable({}, OpenwhydError)
  self.is_sdk_error = true
  self.sdk = "Openwhyd"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function OpenwhydError:error()
  return self.msg
end


function OpenwhydError:__tostring()
  return self.msg
end


return OpenwhydError
