-- Typed models for the Openwhyd SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Authentication
---@field error? string
---@field ok? string
---@field redirect? string
---@field u_id? string
---@field user? table
---@field wrong_password? number

---@class AuthenticationLoadMatch
---@field error? string
---@field ok? string
---@field redirect? string
---@field u_id? string
---@field user? table
---@field wrong_password? number

---@class AuthenticationCreateData
---@field error? string
---@field ok? string
---@field redirect? string
---@field u_id? string
---@field user? table
---@field wrong_password? number

---@class GetUserPost
---@field ctx? string
---@field e_id? string
---@field id? string
---@field img? string
---@field lov? table
---@field name? string
---@field nb_p? number
---@field nb_r? number
---@field score? number
---@field src? table
---@field text? string
---@field u_id? string
---@field u_nm? string
---@field url? string

---@class GetUserPostListMatch
---@field id string

---@class Playlist
---@field id? number
---@field name? string
---@field nb_track? number
---@field url? string

---@class PlaylistListMatch
---@field username string

---@class Post
---@field ctx? string
---@field e_id? string
---@field id? string
---@field img? string
---@field lov? table
---@field name? string
---@field nb_p? number
---@field nb_r? number
---@field score? number
---@field src? table
---@field text? string
---@field u_id? string
---@field u_nm? string
---@field url? string

---@class PostLoadMatch
---@field playlist_id string
---@field username string
---@field genre string

---@class Search
---@field q? string
---@field result? table

---@class SearchListMatch
---@field q? string
---@field result? table

---@class Subscription
---@field is_subscribing? boolean
---@field u_id? string
---@field u_nm? string

---@class SubscriptionLoadMatch
---@field id string

---@class User
---@field id? number
---@field name? string
---@field nb_track? number
---@field url? string

---@class UserListMatch
---@field username string

---@class UserCreateData
---@field id? number
---@field name? string
---@field nb_track? number
---@field url? string

local M = {}

return M
