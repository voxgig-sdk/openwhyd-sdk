// Typed models for the Openwhyd SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Authentication {
  error?: string
  ok?: string
  redirect?: string
  u_id?: string
  user?: Record<string, any>
  wrong_password?: number
}

export type AuthenticationLoadMatch = Partial<Authentication>

export type AuthenticationCreateData = Partial<Authentication>

export interface GetUserPost {
  ctx?: string
  e_id?: string
  id?: string
  img?: string
  lov?: any[]
  name?: string
  nb_p?: number
  nb_r?: number
  score?: number
  src?: Record<string, any>
  text?: string
  u_id?: string
  u_nm?: string
  url?: string
}

export interface GetUserPostListMatch {
  id: string
}

export interface Playlist {
  id?: number
  name?: string
  nb_track?: number
  url?: string
}

export interface PlaylistListMatch {
  username: string
}

export interface Post {
  ctx?: string
  e_id?: string
  id?: string
  img?: string
  lov?: any[]
  name?: string
  nb_p?: number
  nb_r?: number
  score?: number
  src?: Record<string, any>
  text?: string
  u_id?: string
  u_nm?: string
  url?: string
}

export interface PostLoadMatch {
  playlist_id: string
  username: string
  genre: string
}

export interface Search {
  q?: string
  result?: any[]
}

export type SearchListMatch = Partial<Search>

export interface Subscription {
  is_subscribing?: boolean
  u_id?: string
  u_nm?: string
}

export interface SubscriptionLoadMatch {
  id: string
}

export interface User {
  id?: number
  name?: string
  nb_track?: number
  url?: string
}

export interface UserListMatch {
  username: string
}

export type UserCreateData = Partial<User>

