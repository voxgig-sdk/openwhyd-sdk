-- Typed models for the Openwhyd SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Authentication
---@field bio? string
---@field cvrImg? string
---@field email? string
---@field error? string
---@field handle? string
---@field id? string
---@field img? string
---@field isSubscribing? boolean
---@field lastArtists? table
---@field lastFm? table
---@field lnk? table
---@field loc? string
---@field name? string
---@field nbLikes? number
---@field nbPosts? number
---@field nbSubscribers? number
---@field nbSubscriptions? number
---@field pl? table
---@field redirect? string
---@field twId? string
---@field twSec? string
---@field twTok? string
---@field uId? string

---@class AuthenticationLoadMatch
---@field action string
---@field ajax? boolean
---@field email? string
---@field include_user? boolean
---@field md5? string

---@class AuthenticationCreateData
---@field bio? string
---@field cvrImg? string
---@field email? string
---@field error? string
---@field handle? string
---@field id? string
---@field img? string
---@field isSubscribing? boolean
---@field lastArtists? table
---@field lastFm? table
---@field lnk? table
---@field loc? string
---@field name? string
---@field nbLikes? number
---@field nbPosts? number
---@field nbSubscribers? number
---@field nbSubscriptions? number
---@field pl? table
---@field redirect? string
---@field twId? string
---@field twSec? string
---@field twTok? string
---@field uId? string

---@class GetUserPost
---@field ctx? string
---@field eId? string
---@field id? string
---@field img? string
---@field lov? table
---@field name? string
---@field nbP? number
---@field nbR? number
---@field score? number
---@field src? table
---@field text? string
---@field uId? string
---@field uNm? string
---@field url? string

---@class GetUserPostListMatch
---@field id string
---@field after? string
---@field callback? string
---@field format? string
---@field limit? number

---@class Playlist
---@field id? number
---@field name? string
---@field nbTracks? number
---@field url? string

---@class PlaylistListMatch
---@field username string
---@field format? string

---@class Post
---@field ctx? string
---@field eId? string
---@field id? string
---@field img? string
---@field lov? table
---@field name? string
---@field nbP? number
---@field nbR? number
---@field score? number
---@field src? table
---@field text? string
---@field uId? string
---@field uNm? string
---@field url? string

---@class PostLoadMatch
---@field genre string
---@field format? string
---@field limit? number

---@class Search
---@field q? string
---@field results? table

---@class SearchListMatch
---@field context? string
---@field format? string
---@field q string

---@class Subscription
---@field id? string
---@field isSubscribing? boolean
---@field uId? string
---@field uNm? string

---@class SubscriptionLoadMatch
---@field id string
---@field is_subscr? boolean
---@field limit? number
---@field skip? number

---@class User
---@field id? number
---@field name? string
---@field nbTracks? number
---@field url? string

---@class UserListMatch
---@field count_like? boolean
---@field count_post? boolean
---@field id? string
---@field include_subscr? boolean
---@field is_subscr? boolean

---@class UserCreateData
---@field id? number
---@field name? string
---@field nbTracks? number
---@field url? string

local M = {}

return M
