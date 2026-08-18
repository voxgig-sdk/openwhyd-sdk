package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "Openwhyd",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
			},
		},
		"options": map[string]any{
			"base": "https://openwhyd.org",
			"auth": map[string]any{
				"prefix": "",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"authentication": map[string]any{},
				"get_user_post": map[string]any{},
				"playlist": map[string]any{},
				"post": map[string]any{},
				"search": map[string]any{},
				"subscription": map[string]any{},
				"user": map[string]any{},
			},
		},
		"entity": map[string]any{
			"authentication": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "bio",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cvrImg",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "error",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "handle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "img",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isSubscribing",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "lastArtists",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "lastFm",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "lnk",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "loc",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nbLikes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "nbPosts",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "nbSubscribers",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "nbSubscriptions",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "pl",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "redirect",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "twId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "twSec",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "twTok",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uId",
						"type": "`$STRING`",
					},
				},
				"name": "authentication",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/login",
								"parts": []any{
									"login",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user`",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/register",
								"parts": []any{
									"register",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "action",
											"orig": "action",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "ajax",
											"orig": "ajax",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "email",
											"orig": "email",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "include_user",
											"orig": "include_user",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "md5",
											"orig": "md5",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/login",
								"parts": []any{
									"login",
								},
								"select": map[string]any{
									"exist": []any{
										"action",
										"ajax",
										"email",
										"include_user",
										"md5",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "ajax",
											"orig": "ajax",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/logout",
								"parts": []any{
									"logout",
								},
								"select": map[string]any{
									"exist": []any{
										"ajax",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"get_user_post": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ctx",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "img",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lov",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nbP",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "nbR",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "src",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uNm",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"name": "get_user_post",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "username",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "after",
											"orig": "after",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{username}",
								"parts": []any{
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"username": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"after",
										"callback",
										"format",
										"id",
										"limit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"playlist": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nbTracks",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"name": "playlist",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "username",
											"orig": "username",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{username}/playlists",
								"parts": []any{
									"{username}",
									"playlists",
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"username",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"post": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ctx",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "img",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lov",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nbP",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "nbR",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "src",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "text",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uNm",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"name": "post",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "playlist_id",
											"orig": "playlist_id",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "param",
											"name": "username",
											"orig": "username",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "after",
											"orig": "after",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{username}/playlist/{playlistId}",
								"parts": []any{
									"{username}",
									"playlist",
									"{playlist_id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"playlistId": "playlist_id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"after",
										"format",
										"limit",
										"playlist_id",
										"username",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "genre",
											"orig": "genre",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"example": 20,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/hot/{genre}",
								"parts": []any{
									"hot",
									"{genre}",
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"genre",
										"limit",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"hot",
						},
						[]any{
							"playlist",
						},
					},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "q",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "results",
						"type": "`$ARRAY`",
						"union": map[string]any{
							"branches": 3,
							"count": 1,
							"depth": 1,
						},
					},
				},
				"name": "search",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "context",
											"orig": "context",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "q",
											"orig": "q",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"parts": []any{
									"search",
								},
								"select": map[string]any{
									"exist": []any{
										"context",
										"format",
										"q",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"subscription": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "isSubscribing",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "uId",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uNm",
						"type": "`$STRING`",
					},
				},
				"name": "subscription",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "is_subscr",
											"orig": "is_subscr",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/follow/fetchFollowers/{id}",
								"parts": []any{
									"api",
									"follow",
									"fetchFollowers",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"is_subscr",
										"limit",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "id",
											"orig": "id",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "is_subscr",
											"orig": "is_subscr",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"example": 50,
											"kind": "query",
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
										},
										map[string]any{
											"kind": "query",
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/follow/fetchFollowing/{id}",
								"parts": []any{
									"api",
									"follow",
									"fetchFollowing",
									"{id}",
								},
								"select": map[string]any{
									"exist": []any{
										"id",
										"is_subscr",
										"limit",
										"skip",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"user": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "id",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nbTracks",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "url",
						"type": "`$STRING`",
					},
				},
				"name": "user",
				"op": map[string]any{
					"create": map[string]any{
						"input": "data",
						"name": "create",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/api/user",
								"parts": []any{
									"api",
									"user",
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"kind": "query",
											"name": "count_like",
											"orig": "count_like",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "count_post",
											"orig": "count_post",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
										},
										map[string]any{
											"kind": "query",
											"name": "include_subscr",
											"orig": "include_subscr",
											"type": "`$BOOLEAN`",
										},
										map[string]any{
											"kind": "query",
											"name": "is_subscr",
											"orig": "is_subscr",
											"type": "`$BOOLEAN`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/api/user",
								"parts": []any{
									"api",
									"user",
								},
								"select": map[string]any{
									"exist": []any{
										"count_like",
										"count_post",
										"id",
										"include_subscr",
										"is_subscr",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"kind": "param",
											"name": "username",
											"orig": "username",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/{username}/info",
								"parts": []any{
									"{username}",
									"info",
								},
								"select": map[string]any{
									"exist": []any{
										"username",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
		},
	}
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
