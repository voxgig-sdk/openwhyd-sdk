// Typed models for the Openwhyd SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import (
	"encoding/json"

	"github.com/voxgig-sdk/openwhyd-sdk/go/core"
)

// Authentication is the typed data model for the authentication entity.
type Authentication struct {
	Bio *string `json:"bio,omitempty"`
	CvrImg *string `json:"cvrImg,omitempty"`
	Email *string `json:"email,omitempty"`
	Error *string `json:"error,omitempty"`
	Handle *string `json:"handle,omitempty"`
	Id *string `json:"id,omitempty"`
	Img *string `json:"img,omitempty"`
	IsSubscribing *bool `json:"isSubscribing,omitempty"`
	LastArtists *[]any `json:"lastArtists,omitempty"`
	LastFm *map[string]any `json:"lastFm,omitempty"`
	Lnk *map[string]any `json:"lnk,omitempty"`
	Loc *string `json:"loc,omitempty"`
	Name *string `json:"name,omitempty"`
	NbLikes *int `json:"nbLikes,omitempty"`
	NbPosts *int `json:"nbPosts,omitempty"`
	NbSubscribers *int `json:"nbSubscribers,omitempty"`
	NbSubscriptions *int `json:"nbSubscriptions,omitempty"`
	Pl *[]any `json:"pl,omitempty"`
	Redirect *string `json:"redirect,omitempty"`
	TwId *string `json:"twId,omitempty"`
	TwSec *string `json:"twSec,omitempty"`
	TwTok *string `json:"twTok,omitempty"`
	UId *string `json:"uId,omitempty"`
}

// AuthenticationLoadMatch is the typed request payload for Authentication.LoadTyped.
type AuthenticationLoadMatch struct {
	Bio *string `json:"bio,omitempty"`
	CvrImg *string `json:"cvrImg,omitempty"`
	Email *string `json:"email,omitempty"`
	Error *string `json:"error,omitempty"`
	Handle *string `json:"handle,omitempty"`
	Id string `json:"id"`
	Img *string `json:"img,omitempty"`
	IsSubscribing *bool `json:"isSubscribing,omitempty"`
	LastArtists *[]any `json:"lastArtists,omitempty"`
	LastFm *map[string]any `json:"lastFm,omitempty"`
	Lnk *map[string]any `json:"lnk,omitempty"`
	Loc *string `json:"loc,omitempty"`
	Name *string `json:"name,omitempty"`
	NbLikes *int `json:"nbLikes,omitempty"`
	NbPosts *int `json:"nbPosts,omitempty"`
	NbSubscribers *int `json:"nbSubscribers,omitempty"`
	NbSubscriptions *int `json:"nbSubscriptions,omitempty"`
	Pl *[]any `json:"pl,omitempty"`
	Redirect *string `json:"redirect,omitempty"`
	TwId *string `json:"twId,omitempty"`
	TwSec *string `json:"twSec,omitempty"`
	TwTok *string `json:"twTok,omitempty"`
	UId *string `json:"uId,omitempty"`
}

// AuthenticationCreateData is the typed request payload for Authentication.CreateTyped.
type AuthenticationCreateData struct {
	Bio *string `json:"bio,omitempty"`
	CvrImg *string `json:"cvrImg,omitempty"`
	Email *string `json:"email,omitempty"`
	Error *string `json:"error,omitempty"`
	Handle *string `json:"handle,omitempty"`
	Id *string `json:"id,omitempty"`
	Img *string `json:"img,omitempty"`
	IsSubscribing *bool `json:"isSubscribing,omitempty"`
	LastArtists *[]any `json:"lastArtists,omitempty"`
	LastFm *map[string]any `json:"lastFm,omitempty"`
	Lnk *map[string]any `json:"lnk,omitempty"`
	Loc *string `json:"loc,omitempty"`
	Name *string `json:"name,omitempty"`
	NbLikes *int `json:"nbLikes,omitempty"`
	NbPosts *int `json:"nbPosts,omitempty"`
	NbSubscribers *int `json:"nbSubscribers,omitempty"`
	NbSubscriptions *int `json:"nbSubscriptions,omitempty"`
	Pl *[]any `json:"pl,omitempty"`
	Redirect *string `json:"redirect,omitempty"`
	TwId *string `json:"twId,omitempty"`
	TwSec *string `json:"twSec,omitempty"`
	TwTok *string `json:"twTok,omitempty"`
	UId *string `json:"uId,omitempty"`
}

// GetUserPost is the typed data model for the get_user_post entity.
type GetUserPost struct {
	Ctx *string `json:"ctx,omitempty"`
	EId *string `json:"eId,omitempty"`
	Id *string `json:"id,omitempty"`
	Img *string `json:"img,omitempty"`
	Lov *[]any `json:"lov,omitempty"`
	Name *string `json:"name,omitempty"`
	NbP *int `json:"nbP,omitempty"`
	NbR *int `json:"nbR,omitempty"`
	Score *float64 `json:"score,omitempty"`
	Src *map[string]any `json:"src,omitempty"`
	Text *string `json:"text,omitempty"`
	UId *string `json:"uId,omitempty"`
	UNm *string `json:"uNm,omitempty"`
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
	NbTracks *int `json:"nbTracks,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PlaylistListMatch is the typed request payload for Playlist.ListTyped.
type PlaylistListMatch struct {
	Username string `json:"username"`
}

// Post is the typed data model for the post entity.
type Post struct {
	Ctx *string `json:"ctx,omitempty"`
	EId *string `json:"eId,omitempty"`
	Id *string `json:"id,omitempty"`
	Img *string `json:"img,omitempty"`
	Lov *[]any `json:"lov,omitempty"`
	Name *string `json:"name,omitempty"`
	NbP *int `json:"nbP,omitempty"`
	NbR *int `json:"nbR,omitempty"`
	Score *float64 `json:"score,omitempty"`
	Src *map[string]any `json:"src,omitempty"`
	Text *string `json:"text,omitempty"`
	UId *string `json:"uId,omitempty"`
	UNm *string `json:"uNm,omitempty"`
	Url *string `json:"url,omitempty"`
}

// PostLoadMatch is the typed request payload for Post.LoadTyped.
type PostLoadMatch struct {
	PlaylistId *string `json:"playlist_id,omitempty"`
	Username *string `json:"username,omitempty"`
	Genre *string `json:"genre,omitempty"`
}

// Search is the typed data model for the search entity.
type Search struct {
	Q *string `json:"q,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// SearchListMatch is the typed request payload for Search.ListTyped.
type SearchListMatch struct {
	Q *string `json:"q,omitempty"`
	Results *[]any `json:"results,omitempty"`
}

// Subscription is the typed data model for the subscription entity.
type Subscription struct {
	IsSubscribing *bool `json:"isSubscribing,omitempty"`
	UId *string `json:"uId,omitempty"`
	UNm *string `json:"uNm,omitempty"`
}

// SubscriptionLoadMatch is the typed request payload for Subscription.LoadTyped.
type SubscriptionLoadMatch struct {
	Id string `json:"id"`
}

// User is the typed data model for the user entity.
type User struct {
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	NbTracks *int `json:"nbTracks,omitempty"`
	Url *string `json:"url,omitempty"`
}

// UserListMatch is the typed request payload for User.ListTyped.
type UserListMatch struct {
	Username *string `json:"username,omitempty"`
}

// UserCreateData is the typed request payload for User.CreateTyped.
type UserCreateData struct {
	Id *int `json:"id,omitempty"`
	Name *string `json:"name,omitempty"`
	NbTracks *int `json:"nbTracks,omitempty"`
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

// entityData unwraps an entity to its data map.
//
// Operations resolve to the ENTITY, not the raw data (see AGENTS.md), and an
// entity's fields are UNEXPORTED — marshalling one directly yields `{}`, so
// every typed accessor would silently hand back a zero-valued struct. The
// typed boundary therefore takes the data hop first.
func entityData(v any) any {
	if ent, ok := v.(core.Entity); ok {
		return ent.Data()
	}
	return v
}

// typedFrom decodes a runtime value (an entity, or the map[string]any the op
// pipeline produced) into a typed model T via a JSON round-trip. On any error
// it returns the zero value of T; the op's own (value, error) tuple carries
// the real error.
func typedFrom[T any](v any) T {
	var out T
	v = entityData(v)
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

// typedSliceFrom decodes a runtime list value into a typed slice []T via a
// JSON round-trip, for list ops. `list` resolves to a slice of ENTITY
// instances, so each element takes the data hop.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	if list, ok := v.([]any); ok {
		unwrapped := make([]any, 0, len(list))
		for _, item := range list {
			unwrapped = append(unwrapped, entityData(item))
		}
		v = unwrapped
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
