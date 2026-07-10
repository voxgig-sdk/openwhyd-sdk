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
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] ok
#   @return [String, nil]
#
# @!attribute [rw] redirect
#   @return [String, nil]
#
# @!attribute [rw] u_id
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
#
# @!attribute [rw] wrong_password
#   @return [Integer, nil]
Authentication = Struct.new(
  :error,
  :ok,
  :redirect,
  :u_id,
  :user,
  :wrong_password,
  keyword_init: true
)

# Request payload for Authentication#load.
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] ok
#   @return [String, nil]
#
# @!attribute [rw] redirect
#   @return [String, nil]
#
# @!attribute [rw] u_id
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
#
# @!attribute [rw] wrong_password
#   @return [Integer, nil]
AuthenticationLoadMatch = Struct.new(
  :error,
  :ok,
  :redirect,
  :u_id,
  :user,
  :wrong_password,
  keyword_init: true
)

# Request payload for Authentication#create.
#
# @!attribute [rw] error
#   @return [String, nil]
#
# @!attribute [rw] ok
#   @return [String, nil]
#
# @!attribute [rw] redirect
#   @return [String, nil]
#
# @!attribute [rw] u_id
#   @return [String, nil]
#
# @!attribute [rw] user
#   @return [Hash, nil]
#
# @!attribute [rw] wrong_password
#   @return [Integer, nil]
AuthenticationCreateData = Struct.new(
  :error,
  :ok,
  :redirect,
  :u_id,
  :user,
  :wrong_password,
  keyword_init: true
)

# GetUserPost entity data model.
#
# @!attribute [rw] ctx
#   @return [String, nil]
#
# @!attribute [rw] e_id
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
# @!attribute [rw] nb_p
#   @return [Integer, nil]
#
# @!attribute [rw] nb_r
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
# @!attribute [rw] u_id
#   @return [String, nil]
#
# @!attribute [rw] u_nm
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
GetUserPost = Struct.new(
  :ctx,
  :e_id,
  :id,
  :img,
  :lov,
  :name,
  :nb_p,
  :nb_r,
  :score,
  :src,
  :text,
  :u_id,
  :u_nm,
  :url,
  keyword_init: true
)

# Request payload for GetUserPost#list.
#
# @!attribute [rw] id
#   @return [String]
GetUserPostListMatch = Struct.new(
  :id,
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
# @!attribute [rw] nb_track
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Playlist = Struct.new(
  :id,
  :name,
  :nb_track,
  :url,
  keyword_init: true
)

# Request payload for Playlist#list.
#
# @!attribute [rw] username
#   @return [String]
PlaylistListMatch = Struct.new(
  :username,
  keyword_init: true
)

# Post entity data model.
#
# @!attribute [rw] ctx
#   @return [String, nil]
#
# @!attribute [rw] e_id
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
# @!attribute [rw] nb_p
#   @return [Integer, nil]
#
# @!attribute [rw] nb_r
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
# @!attribute [rw] u_id
#   @return [String, nil]
#
# @!attribute [rw] u_nm
#   @return [String, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
Post = Struct.new(
  :ctx,
  :e_id,
  :id,
  :img,
  :lov,
  :name,
  :nb_p,
  :nb_r,
  :score,
  :src,
  :text,
  :u_id,
  :u_nm,
  :url,
  keyword_init: true
)

# Request payload for Post#load.
#
# @!attribute [rw] playlist_id
#   @return [String, nil]
#
# @!attribute [rw] username
#   @return [String, nil]
#
# @!attribute [rw] genre
#   @return [String, nil]
PostLoadMatch = Struct.new(
  :playlist_id,
  :username,
  :genre,
  keyword_init: true
)

# Search entity data model.
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
Search = Struct.new(
  :q,
  :result,
  keyword_init: true
)

# Request payload for Search#list.
#
# @!attribute [rw] q
#   @return [String, nil]
#
# @!attribute [rw] result
#   @return [Array, nil]
SearchListMatch = Struct.new(
  :q,
  :result,
  keyword_init: true
)

# Subscription entity data model.
#
# @!attribute [rw] is_subscribing
#   @return [Boolean, nil]
#
# @!attribute [rw] u_id
#   @return [String, nil]
#
# @!attribute [rw] u_nm
#   @return [String, nil]
Subscription = Struct.new(
  :is_subscribing,
  :u_id,
  :u_nm,
  keyword_init: true
)

# Request payload for Subscription#load.
#
# @!attribute [rw] id
#   @return [String]
SubscriptionLoadMatch = Struct.new(
  :id,
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
# @!attribute [rw] nb_track
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
User = Struct.new(
  :id,
  :name,
  :nb_track,
  :url,
  keyword_init: true
)

# Request payload for User#list.
#
# @!attribute [rw] username
#   @return [String, nil]
UserListMatch = Struct.new(
  :username,
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
# @!attribute [rw] nb_track
#   @return [Integer, nil]
#
# @!attribute [rw] url
#   @return [String, nil]
UserCreateData = Struct.new(
  :id,
  :name,
  :nb_track,
  :url,
  keyword_init: true
)

