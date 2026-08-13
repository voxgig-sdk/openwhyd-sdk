// Typed models for the Openwhyd SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Authentication {
  bio?: string
  cvrImg?: string
  email?: string
  error?: string
  handle?: string
  id?: string
  img?: string
  isSubscribing?: boolean
  lastArtists?: any[]
  lastFm?: Record<string, any>
  lnk?: Record<string, any>
  loc?: string
  name?: string
  nbLikes?: number
  nbPosts?: number
  nbSubscribers?: number
  nbSubscriptions?: number
  pl?: any[]
  redirect?: string
  twId?: string
  twSec?: string
  twTok?: string
  uId?: string
}

export interface AuthenticationLoadMatch {
  bio?: string
  cvrImg?: string
  email?: string
  error?: string
  handle?: string
  id: string
  img?: string
  isSubscribing?: boolean
  lastArtists?: any[]
  lastFm?: Record<string, any>
  lnk?: Record<string, any>
  loc?: string
  name?: string
  nbLikes?: number
  nbPosts?: number
  nbSubscribers?: number
  nbSubscriptions?: number
  pl?: any[]
  redirect?: string
  twId?: string
  twSec?: string
  twTok?: string
  uId?: string
}

export interface AuthenticationCreateData {
  bio?: string
  cvrImg?: string
  email?: string
  error?: string
  handle?: string
  id?: string
  img?: string
  isSubscribing?: boolean
  lastArtists?: any[]
  lastFm?: Record<string, any>
  lnk?: Record<string, any>
  loc?: string
  name?: string
  nbLikes?: number
  nbPosts?: number
  nbSubscribers?: number
  nbSubscriptions?: number
  pl?: any[]
  redirect?: string
  twId?: string
  twSec?: string
  twTok?: string
  uId?: string
}

export interface GetUserPost {
  ctx?: string
  eId?: string
  id?: string
  img?: string
  lov?: any[]
  name?: string
  nbP?: number
  nbR?: number
  score?: number
  src?: Record<string, any>
  text?: string
  uId?: string
  uNm?: string
  url?: string
}

export interface GetUserPostListMatch {
  id: string
}

export interface Playlist {
  id?: number
  name?: string
  nbTracks?: number
  url?: string
}

export interface PlaylistListMatch {
  username: string
}

export interface Post {
  ctx?: string
  eId?: string
  id?: string
  img?: string
  lov?: any[]
  name?: string
  nbP?: number
  nbR?: number
  score?: number
  src?: Record<string, any>
  text?: string
  uId?: string
  uNm?: string
  url?: string
}

export interface PostLoadMatch {
  playlist_id?: string
  username?: string
  genre?: string
}

export interface Search {
  q?: string
  results?: any[]
}

export interface SearchListMatch {
  q?: string
  results?: any[]
}

export interface Subscription {
  isSubscribing?: boolean
  uId?: string
  uNm?: string
}

export interface SubscriptionLoadMatch {
  id: string
}

export interface User {
  id?: number
  name?: string
  nbTracks?: number
  url?: string
}

export interface UserListMatch {
  username?: string
}

export interface UserCreateData {
  id?: number
  name?: string
  nbTracks?: number
  url?: string
}

