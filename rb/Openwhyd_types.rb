# frozen_string_literal: true

# Typed models for the Openwhyd SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Authentication entity data model.
#
# @!attribute [rw] bio
#   @return [String, nil]
#
# @!attribute [rw] cvrImg
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] handle
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] img
#   @return [String, nil]
#
# @!attribute [rw] isSubscribing
#   @return [Boolean, nil]
#
# @!attribute [rw] lastArtists
#   @return [Array, nil]
#
# @!attribute [rw] lastFm
#   @return [Hash, nil]
#
# @!attribute [rw] lnk
#   @return [Hash, nil]
#
# @!attribute [rw] loc
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nbLikes
#   @return [Integer, nil]
#
# @!attribute [rw] nbPosts
#   @return [Integer, nil]
#
# @!attribute [rw] nbSubscribers
#   @return [Integer, nil]
#
# @!attribute [rw] nbSubscriptions
#   @return [Integer, nil]
#
# @!attribute [rw] pl
#   @return [Array, nil]
#
# @!attribute [rw] redirect
#   @return [String, nil]
#
# @!attribute [rw] twId
#   @return [String, nil]
#
# @!attribute [rw] twSec
#   @return [String, nil]
#
# @!attribute [rw] twTok
#   @return [String, nil]
#
# @!attribute [rw] uId
#   @return [String, nil]
Authentication = Struct.new(
  :bio,
  :cvrImg,
  :email,
  :error,
  :handle,
  :id,
  :img,
  :isSubscribing,
  :lastArtists,
  :lastFm,
  :lnk,
  :loc,
  :name,
  :nbLikes,
  :nbPosts,
  :nbSubscribers,
  :nbSubscriptions,
  :pl,
  :redirect,
  :twId,
  :twSec,
  :twTok,
  :uId,
  keyword_init: true
)

# Request payload for Authentication#load.
#
# @!attribute [rw] action
#   @return [String]
#
# @!attribute [rw] ajax
#   @return [Boolean, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] include_user
#   @return [Boolean, nil]
#
# @!attribute [rw] md5
#   @return [String, nil]
AuthenticationLoadMatch = Struct.new(
  :action,
  :ajax,
  :email,
  :include_user,
  :md5,
  keyword_init: true
)

# Request payload for Authentication#create.
#
# @!attribute [rw] bio
#   @return [String, nil]
#
# @!attribute [rw] cvrImg
#   @return [String, nil]
#
# @!attribute [rw] email
#   @return [String, nil]
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] handle
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] img
#   @return [String, nil]
#
# @!attribute [rw] isSubscribing
#   @return [Boolean, nil]
#
# @!attribute [rw] lastArtists
#   @return [Array, nil]
#
# @!attribute [rw] lastFm
#   @return [Hash, nil]
#
# @!attribute [rw] lnk
#   @return [Hash, nil]
#
# @!attribute [rw] loc
#   @return [String, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nbLikes
#   @return [Integer, nil]
#
# @!attribute [rw] nbPosts
#   @return [Integer, nil]
#
# @!attribute [rw] nbSubscribers
#   @return [Integer, nil]
#
# @!attribute [rw] nbSubscriptions
#   @return [Integer, nil]
#
# @!attribute [rw] pl
#   @return [Array, nil]
#
# @!attribute [rw] redirect
#   @return [String, nil]
#
# @!attribute [rw] twId
#   @return [String, nil]
#
# @!attribute [rw] twSec
#   @return [String, nil]
#
# @!attribute [rw] twTok
#   @return [String, nil]
#
# @!attribute [rw] uId
#   @return [String, nil]
AuthenticationCreateData = Struct.new(
  :bio,
  :cvrImg,
  :email,
  :error,
  :handle,
  :id,
  :img,
  :isSubscribing,
  :lastArtists,
  :lastFm,
  :lnk,
  :loc,
  :name,
  :nbLikes,
  :nbPosts,
  :nbSubscribers,
  :nbSubscriptions,
  :pl,
  :redirect,
  :twId,
  :twSec,
  :twTok,
  :uId,
  keyword_init: true
)

# GetUserPost entity data model.
#
# @!attribute [rw] ctx
#   @return [String, nil]
#
# @!attribute [rw] eId
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] img
#   @return [String, nil]
#
# @!attribute [rw] lov
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nbP
#   @return [Integer, nil]
#
# @!attribute [rw] nbR
#   @return [Integer, nil]
#
# @!attribute [rw] score
#   @return [Float, nil]
#
# @!attribute [rw] src
#   @return [Hash, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
#
# @!attribute [rw] uId
#   @return [String, nil]
#
# @!attribute [rw] uNm
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
GetUserPost = Struct.new(
  :ctx,
  :eId,
  :id,
  :img,
  :lov,
  :name,
  :nbP,
  :nbR,
  :score,
  :src,
  :text,
  :uId,
  :uNm,
  :url,
  keyword_init: true
)

# Request payload for GetUserPost#list.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] after
#   @return [String, nil]
#
# @!attribute [rw] callback
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
GetUserPostListMatch = Struct.new(
  :id,
  :after,
  :callback,
  :format,
  :limit,
  keyword_init: true
)

# Playlist entity data model.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nbTracks
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Playlist = Struct.new(
  :id,
  :name,
  :nbTracks,
  :url,
  keyword_init: true
)

# Request payload for Playlist#list.
#
# @!attribute [rw] username
#   @return [String]
#
# @!attribute [rw] format
#   @return [String, nil]
PlaylistListMatch = Struct.new(
  :username,
  :format,
  keyword_init: true
)

# Post entity data model.
#
# @!attribute [rw] ctx
#   @return [String, nil]
#
# @!attribute [rw] eId
#   @return [String, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] img
#   @return [String, nil]
#
# @!attribute [rw] lov
#   @return [Array, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nbP
#   @return [Integer, nil]
#
# @!attribute [rw] nbR
#   @return [Integer, nil]
#
# @!attribute [rw] score
#   @return [Float, nil]
#
# @!attribute [rw] src
#   @return [Hash, nil]
#
# @!attribute [rw] text
#   @return [String, nil]
#
# @!attribute [rw] uId
#   @return [String, nil]
#
# @!attribute [rw] uNm
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Post = Struct.new(
  :ctx,
  :eId,
  :id,
  :img,
  :lov,
  :name,
  :nbP,
  :nbR,
  :score,
  :src,
  :text,
  :uId,
  :uNm,
  :url,
  keyword_init: true
)

# Request payload for Post#load.
#
# @!attribute [rw] genre
#   @return [String]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
PostLoadMatch = Struct.new(
  :genre,
  :format,
  :limit,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] results
#   @return [Array, nil]
Search = Struct.new(
  :q,
  :results,
  keyword_init: true
)

# Request payload for Search#list.
#
# @!attribute [rw] context
#   @return [String, nil]
#
# @!attribute [rw] format
#   @return [String, nil]
#
# @!attribute [rw] q
#   @return [String]
SearchListMatch = Struct.new(
  :context,
  :format,
  :q,
  keyword_init: true
)

# Subscription entity data model.
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] isSubscribing
#   @return [Boolean, nil]
#
# @!attribute [rw] uId
#   @return [String, nil]
#
# @!attribute [rw] uNm
#   @return [String, nil]
Subscription = Struct.new(
  :id,
  :isSubscribing,
  :uId,
  :uNm,
  keyword_init: true
)

# Request payload for Subscription#load.
#
# @!attribute [rw] id
#   @return [String]
#
# @!attribute [rw] is_subscr
#   @return [Boolean, nil]
#
# @!attribute [rw] limit
#   @return [Integer, nil]
#
# @!attribute [rw] skip
#   @return [Integer, nil]
SubscriptionLoadMatch = Struct.new(
  :id,
  :is_subscr,
  :limit,
  :skip,
  keyword_init: true
)

# User entity data model.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nbTracks
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
User = Struct.new(
  :id,
  :name,
  :nbTracks,
  :url,
  keyword_init: true
)

# Request payload for User#list.
#
# @!attribute [rw] count_like
#   @return [Boolean, nil]
#
# @!attribute [rw] count_post
#   @return [Boolean, nil]
#
# @!attribute [rw] id
#   @return [String, nil]
#
# @!attribute [rw] include_subscr
#   @return [Boolean, nil]
#
# @!attribute [rw] is_subscr
#   @return [Boolean, nil]
UserListMatch = Struct.new(
  :count_like,
  :count_post,
  :id,
  :include_subscr,
  :is_subscr,
  keyword_init: true
)

# Request payload for User#create.
#
# @!attribute [rw] id
#   @return [Integer, nil]
#
# @!attribute [rw] name
#   @return [String, nil]
#
# @!attribute [rw] nbTracks
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
UserCreateData = Struct.new(
  :id,
  :name,
  :nbTracks,
  :url,
  keyword_init: true
)

