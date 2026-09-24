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
			"ratelimit": map[string]any{
				"options": map[string]any{
					"active": false,
					"burst": 5,
					"rate": 5,
				},
				"optspec": map[string]any{
					"now": "`$FUNCTION`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"retry": map[string]any{
				"options": map[string]any{
					"active": false,
					"factor": 2,
					"maxDelay": 2000,
					"minDelay": 50,
					"retries": 2,
					"statuses": []any{
						408,
						425,
						429,
						500,
						502,
						503,
						504,
					},
				},
				"optspec": map[string]any{
					"jitter": "`$BOOLEAN`",
					"sleep": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"optspec": map[string]any{
					"entity": "`$MAP`",
					"net": "`$MAP`",
				},
				"strict": false,
				"transport": "base",
			},
			"timeout": map[string]any{
				"options": map[string]any{
					"active": false,
					"ms": 30000,
				},
				"optspec": map[string]any{
					"clearTimer": "`$FUNCTION`",
					"setTimer": "`$FUNCTION`",
				},
				"strict": false,
				"transport": "wrap",
			},
		},
		"options": map[string]any{
			"base": "https://openwhyd.org",
			"auth": map[string]any{
				"prefix": "",
				"in": "cookie",
				"name": "whydSid",
			},
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"authentication": map[string]any{},
				"get_user_post": map[string]any{},
				"hot": map[string]any{},
				"playlist": map[string]any{},
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
						"title": "Bio",
						"type": "`$STRING`",
						"short": "User biography",
					},
					map[string]any{
						"name": "cvrImg",
						"title": "Cvr Img",
						"type": "`$STRING`",
						"short": "Cover image URL",
					},
					map[string]any{
						"name": "email",
						"title": "Email",
						"type": "`$STRING`",
						"short": "Email address",
					},
					map[string]any{
						"name": "error",
						"title": "Error",
						"type": "`$STRING`",
						"short": "Error message if any",
					},
					map[string]any{
						"name": "handle",
						"title": "Handle",
						"type": "`$STRING`",
						"short": "Username/handle",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "User ID",
					},
					map[string]any{
						"name": "img",
						"title": "Img",
						"type": "`$STRING`",
						"short": "Avatar URL",
					},
					map[string]any{
						"name": "isSubscribing",
						"title": "Is Subscribing",
						"type": "`$BOOLEAN`",
						"short": "Whether logged in user subscribes to this user",
					},
					map[string]any{
						"name": "lastArtists",
						"title": "Last Artists",
						"type": "`$ARRAY`",
						"short": "Recently posted artists",
					},
					map[string]any{
						"name": "lastFm",
						"title": "Last Fm",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "lnk",
						"title": "Lnk",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "loc",
						"title": "Loc",
						"type": "`$STRING`",
						"short": "User location",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Full name",
					},
					map[string]any{
						"name": "nbLikes",
						"title": "Nb Likes",
						"type": "`$INTEGER`",
						"short": "Number of likes",
					},
					map[string]any{
						"name": "nbPosts",
						"title": "Nb Posts",
						"type": "`$INTEGER`",
						"short": "Number of posts",
					},
					map[string]any{
						"name": "nbSubscribers",
						"title": "Nb Subscribers",
						"type": "`$INTEGER`",
						"short": "Number of subscribers",
					},
					map[string]any{
						"name": "nbSubscriptions",
						"title": "Nb Subscriptions",
						"type": "`$INTEGER`",
						"short": "Number of subscriptions",
					},
					map[string]any{
						"name": "pl",
						"title": "Pl",
						"type": "`$ARRAY`",
						"short": "User playlists",
					},
					map[string]any{
						"name": "redirect",
						"title": "Redirect",
						"type": "`$STRING`",
						"short": "URL to redirect to",
					},
					map[string]any{
						"name": "twId",
						"title": "Tw Id",
						"type": "`$STRING`",
						"short": "Twitter handle",
					},
					map[string]any{
						"name": "twSec",
						"title": "Tw Sec",
						"type": "`$STRING`",
						"short": "Twitter session secret",
					},
					map[string]any{
						"name": "twTok",
						"title": "Tw Tok",
						"type": "`$STRING`",
						"short": "Twitter session token",
					},
					map[string]any{
						"name": "uId",
						"title": "U Id",
						"type": "`$STRING`",
						"short": "ID of new user if successful",
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
								"kind": "http",
								"method": "POST",
								"orig": "/login",
								"segments": []any{
									map[string]any{
										"lit": "login",
									},
								},
								"parts": []any{
									"login",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
							map[string]any{
								"kind": "http",
								"method": "POST",
								"orig": "/register",
								"segments": []any{
									map[string]any{
										"lit": "register",
									},
								},
								"parts": []any{
									"register",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/login",
								"segments": []any{
									map[string]any{
										"lit": "login",
									},
								},
								"parts": []any{
									"login",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.user`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "action",
											"orig": "action",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
										map[string]any{
											"name": "ajax",
											"orig": "ajax",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "email",
											"orig": "email",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "include_user",
											"orig": "include_user",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "md5",
											"orig": "md5",
											"type": "`$STRING`",
											"kind": "query",
										},
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
							},
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/logout",
								"segments": []any{
									map[string]any{
										"lit": "logout",
									},
								},
								"parts": []any{
									"logout",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "ajax",
											"orig": "ajax",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"ajax",
									},
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
						"title": "Ctx",
						"type": "`$STRING`",
						"short": "Context",
					},
					map[string]any{
						"name": "eId",
						"title": "E Id",
						"type": "`$STRING`",
						"short": "External ID (platform identifier)",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Post ID",
					},
					map[string]any{
						"name": "img",
						"title": "Img",
						"type": "`$STRING`",
						"short": "Track image URL",
					},
					map[string]any{
						"name": "lov",
						"title": "Lov",
						"type": "`$ARRAY`",
						"short": "User IDs who liked this post",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Track name",
					},
					map[string]any{
						"name": "nbP",
						"title": "Nb P",
						"type": "`$INTEGER`",
						"short": "Number of plays",
					},
					map[string]any{
						"name": "nbR",
						"title": "Nb R",
						"type": "`$INTEGER`",
						"short": "Number of reposts",
					},
					map[string]any{
						"name": "score",
						"title": "Score",
						"type": "`$NUMBER`",
						"short": "Search relevance score",
					},
					map[string]any{
						"name": "src",
						"title": "Src",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"short": "Post text/comment",
					},
					map[string]any{
						"name": "uId",
						"title": "U Id",
						"type": "`$STRING`",
						"short": "User ID of poster",
					},
					map[string]any{
						"name": "uNm",
						"title": "U Nm",
						"type": "`$STRING`",
						"short": "User name of poster",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "Direct URL to track",
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
								"kind": "http",
								"method": "GET",
								"orig": "/{username}",
								"segments": []any{
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"username": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "username",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "after",
											"orig": "after",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "callback",
											"orig": "callback",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
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
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"hot": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "ctx",
						"title": "Ctx",
						"type": "`$STRING`",
						"short": "Context",
					},
					map[string]any{
						"name": "eId",
						"title": "E Id",
						"type": "`$STRING`",
						"short": "External ID (platform identifier)",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Post ID",
					},
					map[string]any{
						"name": "img",
						"title": "Img",
						"type": "`$STRING`",
						"short": "Track image URL",
					},
					map[string]any{
						"name": "lov",
						"title": "Lov",
						"type": "`$ARRAY`",
						"short": "User IDs who liked this post",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Track name",
					},
					map[string]any{
						"name": "nbP",
						"title": "Nb P",
						"type": "`$INTEGER`",
						"short": "Number of plays",
					},
					map[string]any{
						"name": "nbR",
						"title": "Nb R",
						"type": "`$INTEGER`",
						"short": "Number of reposts",
					},
					map[string]any{
						"name": "score",
						"title": "Score",
						"type": "`$NUMBER`",
						"short": "Search relevance score",
					},
					map[string]any{
						"name": "src",
						"title": "Src",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"short": "Post text/comment",
					},
					map[string]any{
						"name": "uId",
						"title": "U Id",
						"type": "`$STRING`",
						"short": "User ID of poster",
					},
					map[string]any{
						"name": "uNm",
						"title": "U Nm",
						"type": "`$STRING`",
						"short": "User name of poster",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "Direct URL to track",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "hot",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/hot/{genre}",
								"segments": []any{
									map[string]any{
										"lit": "hot",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"hot",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"genre": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "genre",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"id",
										"limit",
									},
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
						"name": "ctx",
						"title": "Ctx",
						"type": "`$STRING`",
						"short": "Context",
					},
					map[string]any{
						"name": "eId",
						"title": "E Id",
						"type": "`$STRING`",
						"short": "External ID (platform identifier)",
					},
					map[string]any{
						"name": "id",
						"title": "Id",
						"type": "`$STRING`",
						"short": "Post ID",
					},
					map[string]any{
						"name": "img",
						"title": "Img",
						"type": "`$STRING`",
						"short": "Track image URL",
					},
					map[string]any{
						"name": "lov",
						"title": "Lov",
						"type": "`$ARRAY`",
						"short": "User IDs who liked this post",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Track name",
					},
					map[string]any{
						"name": "nbP",
						"title": "Nb P",
						"type": "`$INTEGER`",
						"short": "Number of plays",
					},
					map[string]any{
						"name": "nbR",
						"title": "Nb R",
						"type": "`$INTEGER`",
						"short": "Number of reposts",
					},
					map[string]any{
						"name": "nbTracks",
						"title": "Nb Tracks",
						"type": "`$INTEGER`",
						"short": "Number of tracks in playlist",
					},
					map[string]any{
						"name": "score",
						"title": "Score",
						"type": "`$NUMBER`",
						"short": "Search relevance score",
					},
					map[string]any{
						"name": "src",
						"title": "Src",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "text",
						"title": "Text",
						"type": "`$STRING`",
						"short": "Post text/comment",
					},
					map[string]any{
						"name": "uId",
						"title": "U Id",
						"type": "`$STRING`",
						"short": "User ID of poster",
					},
					map[string]any{
						"name": "uNm",
						"title": "U Nm",
						"type": "`$STRING`",
						"short": "User name of poster",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "Direct URL to track",
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
								"parts": []any{
									"{username}",
									"playlists",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "username",
											"orig": "username",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"format",
										"username",
									},
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/{username}/playlist/{playlistId}",
								"segments": []any{
									map[string]any{
										"var": "username",
									},
									map[string]any{
										"lit": "playlist",
									},
									map[string]any{
										"var": "id",
									},
								},
								"parts": []any{
									"{username}",
									"playlist",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"playlistId": "id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "playlist_id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
										map[string]any{
											"name": "username",
											"orig": "username",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "after",
											"orig": "after",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 20,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"after",
										"format",
										"id",
										"limit",
										"username",
									},
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"search": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "q",
						"title": "Q",
						"type": "`$STRING`",
						"short": "Search query",
					},
					map[string]any{
						"name": "results",
						"title": "Results",
						"type": "`$ARRAY`",
					},
				},
				"name": "search",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"kind": "http",
								"method": "GET",
								"orig": "/search",
								"segments": []any{
									map[string]any{
										"lit": "search",
									},
								},
								"parts": []any{
									"search",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.results`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "context",
											"orig": "context",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "format",
											"orig": "format",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "q",
											"orig": "q",
											"type": "`$STRING`",
											"kind": "query",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"context",
										"format",
										"q",
									},
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
						"title": "Id",
						"type": "`$STRING`",
					},
					map[string]any{
						"name": "isSubscribing",
						"title": "Is Subscribing",
						"type": "`$BOOLEAN`",
						"short": "Whether logged in user follows this user",
					},
					map[string]any{
						"name": "uId",
						"title": "U Id",
						"type": "`$STRING`",
						"short": "User ID",
					},
					map[string]any{
						"name": "uNm",
						"title": "U Nm",
						"type": "`$STRING`",
						"short": "User name",
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
								"parts": []any{
									"api",
									"follow",
									"fetchFollowers",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "is_subscr",
											"orig": "is_subscr",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
							},
							map[string]any{
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
								"parts": []any{
									"api",
									"follow",
									"fetchFollowing",
									"{id}",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
									"query": []any{
										map[string]any{
											"name": "is_subscr",
											"orig": "is_subscr",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "limit",
											"orig": "limit",
											"type": "`$INTEGER`",
											"kind": "query",
											"example": 50,
										},
										map[string]any{
											"name": "skip",
											"orig": "skip",
											"type": "`$INTEGER`",
											"kind": "query",
										},
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
						"title": "Id",
						"type": "`$INTEGER`",
						"short": "Playlist number",
					},
					map[string]any{
						"name": "name",
						"title": "Name",
						"type": "`$STRING`",
						"short": "Playlist name",
					},
					map[string]any{
						"name": "nbTracks",
						"title": "Nb Tracks",
						"type": "`$INTEGER`",
						"short": "Number of tracks in playlist",
					},
					map[string]any{
						"name": "url",
						"title": "Url",
						"type": "`$STRING`",
						"short": "Playlist URL",
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
								"parts": []any{
									"api",
									"user",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{},
								"select": map[string]any{},
							},
						},
					},
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
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
								"parts": []any{
									"api",
									"user",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"query": []any{
										map[string]any{
											"name": "count_like",
											"orig": "count_like",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "count_post",
											"orig": "count_post",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "id",
											"orig": "id",
											"type": "`$STRING`",
											"kind": "query",
										},
										map[string]any{
											"name": "include_subscr",
											"orig": "include_subscr",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
										map[string]any{
											"name": "is_subscr",
											"orig": "is_subscr",
											"type": "`$BOOLEAN`",
											"kind": "query",
										},
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
							},
							map[string]any{
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
								"parts": []any{
									"{username}",
									"info",
								},
								"rename": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"name": "username",
											"orig": "username",
											"type": "`$STRING`",
											"kind": "param",
											"reqd": true,
										},
									},
								},
								"select": map[string]any{
									"exist": []any{
										"username",
									},
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
	case "ratelimit":
		if NewRatelimitFeatureFunc != nil {
			return NewRatelimitFeatureFunc()
		}
	case "retry":
		if NewRetryFeatureFunc != nil {
			return NewRetryFeatureFunc()
		}
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	case "timeout":
		if NewTimeoutFeatureFunc != nil {
			return NewTimeoutFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
