# Openwhyd SDK configuration


def make_config():
    return {
        "main": {
            "name": "Openwhyd",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://openwhyd.org",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "authentication": {},
                "get_user_post": {},
                "playlist": {},
                "post": {},
                "search": {},
                "subscription": {},
                "user": {},
            },
        },
        "entity": {
      "authentication": {
        "fields": [
          {
            "active": True,
            "name": "error",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "ok",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "redirect",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "u_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "user",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "wrong_password",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 5,
          },
        ],
        "name": "authentication",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/login",
                "parts": [
                  "login",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/register",
                "parts": [
                  "register",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "create",
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "action",
                      "orig": "action",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "ajax",
                      "orig": "ajax",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "email",
                      "orig": "email",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "include_user",
                      "orig": "include_user",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "md5",
                      "orig": "md5",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/login",
                "parts": [
                  "login",
                ],
                "select": {
                  "exist": [
                    "action",
                    "ajax",
                    "email",
                    "include_user",
                    "md5",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "ajax",
                      "orig": "ajax",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/logout",
                "parts": [
                  "logout",
                ],
                "select": {
                  "exist": [
                    "ajax",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "get_user_post": {
        "fields": [
          {
            "active": True,
            "name": "ctx",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "e_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "img",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "lov",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "nb_p",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "nb_r",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "score",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "src",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "text",
            "req": False,
            "type": "`$STRING`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "u_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "u_nm",
            "req": False,
            "type": "`$STRING`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "url",
            "req": False,
            "type": "`$STRING`",
            "index$": 13,
          },
        ],
        "name": "get_user_post",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "username",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "after",
                      "orig": "after",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "callback",
                      "orig": "callback",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/{username}",
                "parts": [
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "username": "id",
                  },
                },
                "select": {
                  "exist": [
                    "after",
                    "callback",
                    "format",
                    "id",
                    "limit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "playlist": {
        "fields": [
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "nb_track",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "url",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "playlist",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "username",
                      "orig": "username",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/{username}/playlists",
                "parts": [
                  "{username}",
                  "playlists",
                ],
                "select": {
                  "exist": [
                    "format",
                    "username",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "post": {
        "fields": [
          {
            "active": True,
            "name": "ctx",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "e_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "img",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
          {
            "active": True,
            "name": "lov",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 4,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 5,
          },
          {
            "active": True,
            "name": "nb_p",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 6,
          },
          {
            "active": True,
            "name": "nb_r",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 7,
          },
          {
            "active": True,
            "name": "score",
            "req": False,
            "type": "`$NUMBER`",
            "index$": 8,
          },
          {
            "active": True,
            "name": "src",
            "req": False,
            "type": "`$OBJECT`",
            "index$": 9,
          },
          {
            "active": True,
            "name": "text",
            "req": False,
            "type": "`$STRING`",
            "index$": 10,
          },
          {
            "active": True,
            "name": "u_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 11,
          },
          {
            "active": True,
            "name": "u_nm",
            "req": False,
            "type": "`$STRING`",
            "index$": 12,
          },
          {
            "active": True,
            "name": "url",
            "req": False,
            "type": "`$STRING`",
            "index$": 13,
          },
        ],
        "name": "post",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "playlist_id",
                      "orig": "playlist_id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "param",
                      "name": "username",
                      "orig": "username",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "after",
                      "orig": "after",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/{username}/playlist/{playlistId}",
                "parts": [
                  "{username}",
                  "playlist",
                  "{playlist_id}",
                ],
                "rename": {
                  "param": {
                    "playlistId": "playlist_id",
                  },
                },
                "select": {
                  "exist": [
                    "after",
                    "format",
                    "limit",
                    "playlist_id",
                    "username",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "genre",
                      "orig": "genre",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "example": 20,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/hot/{genre}",
                "parts": [
                  "hot",
                  "{genre}",
                ],
                "select": {
                  "exist": [
                    "format",
                    "genre",
                    "limit",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "hot",
            ],
            [
              "playlist",
            ],
          ],
        },
      },
      "search": {
        "fields": [
          {
            "active": True,
            "name": "q",
            "req": False,
            "type": "`$STRING`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "result",
            "req": False,
            "type": "`$ARRAY`",
            "index$": 1,
          },
        ],
        "name": "search",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "context",
                      "orig": "context",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "format",
                      "orig": "format",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "q",
                      "orig": "q",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/search",
                "parts": [
                  "search",
                ],
                "select": {
                  "exist": [
                    "context",
                    "format",
                    "q",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "subscription": {
        "fields": [
          {
            "active": True,
            "name": "is_subscribing",
            "req": False,
            "type": "`$BOOLEAN`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "u_id",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "u_nm",
            "req": False,
            "type": "`$STRING`",
            "index$": 2,
          },
        ],
        "name": "subscription",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "is_subscr",
                      "orig": "is_subscr",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "skip",
                      "orig": "skip",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/follow/fetchFollowers/{id}",
                "parts": [
                  "api",
                  "follow",
                  "fetchFollowers",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "is_subscr",
                    "limit",
                    "skip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "id",
                      "orig": "id",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "is_subscr",
                      "orig": "is_subscr",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "example": 50,
                      "kind": "query",
                      "name": "limit",
                      "orig": "limit",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "skip",
                      "orig": "skip",
                      "reqd": False,
                      "type": "`$INTEGER`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/follow/fetchFollowing/{id}",
                "parts": [
                  "api",
                  "follow",
                  "fetchFollowing",
                  "{id}",
                ],
                "select": {
                  "exist": [
                    "id",
                    "is_subscr",
                    "limit",
                    "skip",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "user": {
        "fields": [
          {
            "active": True,
            "name": "id",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 0,
          },
          {
            "active": True,
            "name": "name",
            "req": False,
            "type": "`$STRING`",
            "index$": 1,
          },
          {
            "active": True,
            "name": "nb_track",
            "req": False,
            "type": "`$INTEGER`",
            "index$": 2,
          },
          {
            "active": True,
            "name": "url",
            "req": False,
            "type": "`$STRING`",
            "index$": 3,
          },
        ],
        "name": "user",
        "op": {
          "create": {
            "input": "data",
            "name": "create",
            "points": [
              {
                "active": True,
                "args": {},
                "method": "POST",
                "orig": "/api/user",
                "parts": [
                  "api",
                  "user",
                ],
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
            ],
            "key$": "create",
          },
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "active": True,
                "args": {
                  "query": [
                    {
                      "active": True,
                      "kind": "query",
                      "name": "count_like",
                      "orig": "count_like",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "count_post",
                      "orig": "count_post",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "id",
                      "orig": "id",
                      "reqd": False,
                      "type": "`$STRING`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "include_subscr",
                      "orig": "include_subscr",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                    {
                      "active": True,
                      "kind": "query",
                      "name": "is_subscr",
                      "orig": "is_subscr",
                      "reqd": False,
                      "type": "`$BOOLEAN`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/api/user",
                "parts": [
                  "api",
                  "user",
                ],
                "select": {
                  "exist": [
                    "count_like",
                    "count_post",
                    "id",
                    "include_subscr",
                    "is_subscr",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 0,
              },
              {
                "active": True,
                "args": {
                  "params": [
                    {
                      "active": True,
                      "kind": "param",
                      "name": "username",
                      "orig": "username",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "method": "GET",
                "orig": "/{username}/info",
                "parts": [
                  "{username}",
                  "info",
                ],
                "select": {
                  "exist": [
                    "username",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "index$": 1,
              },
            ],
            "key$": "list",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
