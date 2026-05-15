package = "voxgig-sdk-openwhyd"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/openwhyd-sdk.git"
}
description = {
  summary = "Openwhyd SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["openwhyd_sdk"] = "openwhyd_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
