// Typed models for the Openwhyd SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Authentication is the typed data model for the authentication entity.
type Authentication struct {
	Error *string `json:"error,omitempty"`
	Ok *string `json:"ok,omitempty"`
	Redirect *string `json:"redirect,omitempty"`
	UId *string `json:"u_id,omitempty"`
	User *map[string]any `json:"user,omitempty"`
	WrongPassword *int `json:"wrong_password,omitempty"`
}

// AuthenticationLoadMatch is the typed request payload for Authentication.LoadTyped.
type AuthenticationLoadMatch struct {
	Error *string `json:"error,omitempty"`
	Ok *string `json:"ok,omitempty"`
	Redirect *string `json:"redirect,omitempty"`
	UId *string `json:"u_id,omitempty"`
	User *map[string]any `json:"user,omitempty"`
	WrongPassword *int `json:"wrong_password,omitempty"`
}

// AuthenticationCreateData is the typed request payload for Authentication.CreateTyped.
type AuthenticationCreateData struct {
	Error *string `json:"error,omitempty"`
	Ok *string `json:"ok,omitempty"`
	Redirect *string `json:"redirect,omitempty"`
	UId *string `json:"u_id,omitempty"`
	User *map[string]any `json:"user,omitempty"`
	WrongPassword *int `json:"wrong_password,omitempty"`
}

// GetUserPost is the typed data model for the get_user_post entity.
type GetUserPost struct {
	Ctx *string `json:"ctx,omitempty"`
	EId *string `json:"e_id,omitempty"`
	Id *string `json:"id,omitempty"`
	Img *string `json:"img,omitempty"`
	Lov *[]any `json:"lov,omitempty"`
	Name *string `json:"name,omitempty"`
	NbP *int `json:"nb_p,omitempty"`
	NbR *int `json:"nb_r,omitempty"`
	Score *float64 `json:"score,omitempty"`
	Src *map[string]any `json:"src,omitempty"`
	Text *string `json:"text,omitempty"`
	UId *string `json:"u_id,omitempty"`
	UNm *string `json:"u_nm,omitempty"`
	Url *string `json:"url,omitempty"`
}

// GetUserPostListMatch is the typed request payload for GetUserPost.ListTyped.
type GetUserPostListMatch struct {
	Id string `json:"id"`
}

// Playlist is the typed data model for the playlist entity.
type Playlist struct {
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	NbTrack *int `json:"nb_track,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PlaylistListMatch is the typed request payload for Playlist.ListTyped.
type PlaylistListMatch struct {
	Username string `json:"username"`
}

// Post is the typed data model for the post entity.
type Post struct {
	Ctx *string `json:"ctx,omitempty"`
	EId *string `json:"e_id,omitempty"`
	Id *string `json:"id,omitempty"`
	Img *string `json:"img,omitempty"`
	Lov *[]any `json:"lov,omitempty"`
	Name *string `json:"name,omitempty"`
	NbP *int `json:"nb_p,omitempty"`
	NbR *int `json:"nb_r,omitempty"`
	Score *float64 `json:"score,omitempty"`
	Src *map[string]any `json:"src,omitempty"`
	Text *string `json:"text,omitempty"`
	UId *string `json:"u_id,omitempty"`
	UNm *string `json:"u_nm,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PostLoadMatch is the typed request payload for Post.LoadTyped.
type PostLoadMatch struct {
	PlaylistId string `json:"playlist_id"`
	Username string `json:"username"`
	Genre string `json:"genre"`
}

// Search is the typed data model for the search entity.
type Search struct {
	Q *string `json:"q,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// SearchListMatch is the typed request payload for Search.ListTyped.
type SearchListMatch struct {
	Q *string `json:"q,omitempty"`
	Result *[]any `json:"result,omitempty"`
}

// Subscription is the typed data model for the subscription entity.
type Subscription struct {
	IsSubscribing *bool `json:"is_subscribing,omitempty"`
	UId *string `json:"u_id,omitempty"`
	UNm *string `json:"u_nm,omitempty"`
}

// SubscriptionLoadMatch is the typed request payload for Subscription.LoadTyped.
type SubscriptionLoadMatch struct {
	Id string `json:"id"`
}

// User is the typed data model for the user entity.
type User struct {
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	NbTrack *int `json:"nb_track,omitempty"`
	Url *string `json:"url,omitempty"`
}

// UserListMatch is the typed request payload for User.ListTyped.
type UserListMatch struct {
	Username string `json:"username"`
}

// UserCreateData is the typed request payload for User.CreateTyped.
type UserCreateData struct {
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	NbTrack *int `json:"nb_track,omitempty"`
	Url *string `json:"url,omitempty"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
