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
			"slug": "openwhyd",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
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
						"short": "User biography",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "cvrImg",
						"short": "Cover image URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "email",
						"short": "Email address",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "error",
						"short": "Error message if any",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "handle",
						"short": "Username/handle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "User ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "img",
						"short": "Avatar URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isSubscribing",
						"short": "Whether logged in user subscribes to this user",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "lastArtists",
						"short": "Recently posted artists",
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
						"short": "User location",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "name",
						"short": "Full name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nbLikes",
						"short": "Number of likes",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "nbPosts",
						"short": "Number of posts",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "nbSubscribers",
						"short": "Number of subscribers",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "nbSubscriptions",
						"short": "Number of subscriptions",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "pl",
						"short": "User playlists",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "redirect",
						"short": "URL to redirect to",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "twId",
						"short": "Twitter handle",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "twSec",
						"short": "Twitter session secret",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "twTok",
						"short": "Twitter session token",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uId",
						"short": "ID of new user if successful",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "login",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user`",
								},
								"parts": []any{
									"login",
								},
							},
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "POST",
								"orig": "/register",
								"segments": []any{
									map[string]any{
										"lit": "register",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"register",
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
								"segments": []any{
									map[string]any{
										"lit": "login",
									},
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
								"parts": []any{
									"login",
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
								"segments": []any{
									map[string]any{
										"lit": "logout",
									},
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
								"parts": []any{
									"logout",
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
						"short": "Context",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eId",
						"short": "External ID (platform identifier)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Post ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "img",
						"short": "Track image URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lov",
						"short": "User IDs who liked this post",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"short": "Track name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nbP",
						"short": "Number of plays",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "nbR",
						"short": "Number of reposts",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "score",
						"short": "Search relevance score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "src",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "text",
						"short": "Post text/comment",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uId",
						"short": "User ID of poster",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uNm",
						"short": "User name of poster",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "Direct URL to track",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"rename": map[string]any{
									"param": map[string]any{
										"username": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"var": "id",
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
								"parts": []any{
									"{id}",
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
						"short": "Playlist number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Playlist name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nbTracks",
						"short": "Number of tracks in playlist",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "url",
						"short": "Playlist URL",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"var": "username",
									},
									map[string]any{
										"lit": "playlists",
									},
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
								"parts": []any{
									"{username}",
									"playlists",
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
						"short": "Context",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "eId",
						"short": "External ID (platform identifier)",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "id",
						"short": "Post ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "img",
						"short": "Track image URL",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "lov",
						"short": "User IDs who liked this post",
						"type": "`$ARRAY`",
					},
					map[string]any{
						"name": "name",
						"short": "Track name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nbP",
						"short": "Number of plays",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "nbR",
						"short": "Number of reposts",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "score",
						"short": "Search relevance score",
						"type": "`$NUMBER`",
					},
					map[string]any{
						"name": "src",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "text",
						"short": "Post text/comment",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uId",
						"short": "User ID of poster",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uNm",
						"short": "User name of poster",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "url",
						"short": "Direct URL to track",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"rename": map[string]any{
									"param": map[string]any{
										"playlistId": "playlist_id",
									},
								},
								"segments": []any{
									map[string]any{
										"var": "username",
									},
									map[string]any{
										"lit": "playlist",
									},
									map[string]any{
										"var": "playlist_id",
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
								"parts": []any{
									"{username}",
									"playlist",
									"{playlist_id}",
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
								"segments": []any{
									map[string]any{
										"lit": "hot",
									},
									map[string]any{
										"var": "genre",
									},
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
								"parts": []any{
									"hot",
									"{genre}",
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
						"short": "Search query",
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
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
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
								"parts": []any{
									"search",
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
						"name": "id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isSubscribing",
						"short": "Whether logged in user follows this user",
						"type": "`$BOOLEAN`",
					},
					map[string]any{
						"name": "uId",
						"short": "User ID",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "uNm",
						"short": "User name",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "follow",
									},
									map[string]any{
										"lit": "fetchFollowers",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"api",
									"follow",
									"fetchFollowers",
									"{id}",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "follow",
									},
									map[string]any{
										"lit": "fetchFollowing",
									},
									map[string]any{
										"var": "id",
									},
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
								"parts": []any{
									"api",
									"follow",
									"fetchFollowing",
									"{id}",
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
						"short": "Playlist number",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "name",
						"short": "Playlist name",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "nbTracks",
						"short": "Number of tracks in playlist",
						"type": "`$INTEGER`",
					},
					map[string]any{
						"name": "url",
						"short": "Playlist URL",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "user",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"api",
									"user",
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
								"segments": []any{
									map[string]any{
										"lit": "api",
									},
									map[string]any{
										"lit": "user",
									},
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
								"parts": []any{
									"api",
									"user",
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
								"segments": []any{
									map[string]any{
										"var": "username",
									},
									map[string]any{
										"lit": "info",
									},
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
								"parts": []any{
									"{username}",
									"info",
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

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
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
