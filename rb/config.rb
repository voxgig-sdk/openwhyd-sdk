# Openwhyd SDK configuration

module OpenwhydConfig
  def self.make_config
    {
      "main" => {
        "name" => "Openwhyd",
      },
      "feature" => {
        "test" => {
          "options" => {
            "active" => false,
          },
        },
      },
      "options" => {
        "base" => "https://openwhyd.org",
        "auth" => {
          "prefix" => "",
        },
        "headers" => {
          "content-type" => "application/json",
        },
        "entity" => {
          "authentication" => {},
          "get_user_post" => {},
          "playlist" => {},
          "post" => {},
          "search" => {},
          "subscription" => {},
          "user" => {},
        },
      },
      "entity" => {
        "authentication" => {
          "fields" => [
            {
              "active" => true,
              "name" => "bio",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "cvrImg",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "email",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "error",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "handle",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "id",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "img",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "isSubscribing",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "lastArtists",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 8,
            },
            {
              "active" => true,
              "name" => "lastFm",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 9,
            },
            {
              "active" => true,
              "name" => "lnk",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 10,
            },
            {
              "active" => true,
              "name" => "loc",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 11,
            },
            {
              "active" => true,
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 12,
            },
            {
              "active" => true,
              "name" => "nbLikes",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 13,
            },
            {
              "active" => true,
              "name" => "nbPosts",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 14,
            },
            {
              "active" => true,
              "name" => "nbSubscribers",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 15,
            },
            {
              "active" => true,
              "name" => "nbSubscriptions",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 16,
            },
            {
              "active" => true,
              "name" => "pl",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 17,
            },
            {
              "active" => true,
              "name" => "redirect",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 18,
            },
            {
              "active" => true,
              "name" => "twId",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 19,
            },
            {
              "active" => true,
              "name" => "twSec",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 20,
            },
            {
              "active" => true,
              "name" => "twTok",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 21,
            },
            {
              "active" => true,
              "name" => "uId",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 22,
            },
          ],
          "name" => "authentication",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/login",
                  "parts" => [
                    "login",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.user`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/register",
                  "parts" => [
                    "register",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
              ],
              "key$" => "create",
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "action",
                        "orig" => "action",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "ajax",
                        "orig" => "ajax",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "email",
                        "orig" => "email",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "include_user",
                        "orig" => "include_user",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "md5",
                        "orig" => "md5",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/login",
                  "parts" => [
                    "login",
                  ],
                  "select" => {
                    "exist" => [
                      "action",
                      "ajax",
                      "email",
                      "include_user",
                      "md5",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.user`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "ajax",
                        "orig" => "ajax",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/logout",
                  "parts" => [
                    "logout",
                  ],
                  "select" => {
                    "exist" => [
                      "ajax",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_user_post" => {
          "fields" => [
            {
              "active" => true,
              "name" => "ctx",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "eId",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "id",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "img",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "lov",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "nbP",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "nbR",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "score",
              "req" => false,
              "type" => "`$NUMBER`",
              "index$" => 8,
            },
            {
              "active" => true,
              "name" => "src",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 9,
            },
            {
              "active" => true,
              "name" => "text",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 10,
            },
            {
              "active" => true,
              "name" => "uId",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 11,
            },
            {
              "active" => true,
              "name" => "uNm",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 12,
            },
            {
              "active" => true,
              "name" => "url",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 13,
            },
          ],
          "name" => "get_user_post",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "username",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "after",
                        "orig" => "after",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "callback",
                        "orig" => "callback",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 20,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{username}",
                  "parts" => [
                    "{id}",
                  ],
                  "rename" => {
                    "param" => {
                      "username" => "id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "after",
                      "callback",
                      "format",
                      "id",
                      "limit",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "playlist" => {
          "fields" => [
            {
              "active" => true,
              "name" => "id",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "nbTracks",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "url",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 3,
            },
          ],
          "name" => "playlist",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "username",
                        "orig" => "username",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{username}/playlists",
                  "parts" => [
                    "{username}",
                    "playlists",
                  ],
                  "select" => {
                    "exist" => [
                      "format",
                      "username",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "post" => {
          "fields" => [
            {
              "active" => true,
              "name" => "ctx",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "eId",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "id",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "img",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 3,
            },
            {
              "active" => true,
              "name" => "lov",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 4,
            },
            {
              "active" => true,
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 5,
            },
            {
              "active" => true,
              "name" => "nbP",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 6,
            },
            {
              "active" => true,
              "name" => "nbR",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 7,
            },
            {
              "active" => true,
              "name" => "score",
              "req" => false,
              "type" => "`$NUMBER`",
              "index$" => 8,
            },
            {
              "active" => true,
              "name" => "src",
              "req" => false,
              "type" => "`$OBJECT`",
              "index$" => 9,
            },
            {
              "active" => true,
              "name" => "text",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 10,
            },
            {
              "active" => true,
              "name" => "uId",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 11,
            },
            {
              "active" => true,
              "name" => "uNm",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 12,
            },
            {
              "active" => true,
              "name" => "url",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 13,
            },
          ],
          "name" => "post",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "playlist_id",
                        "orig" => "playlist_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "username",
                        "orig" => "username",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 1,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "after",
                        "orig" => "after",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 20,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{username}/playlist/{playlistId}",
                  "parts" => [
                    "{username}",
                    "playlist",
                    "{playlist_id}",
                  ],
                  "rename" => {
                    "param" => {
                      "playlistId" => "playlist_id",
                    },
                  },
                  "select" => {
                    "exist" => [
                      "after",
                      "format",
                      "limit",
                      "playlist_id",
                      "username",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "genre",
                        "orig" => "genre",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "example" => 20,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/hot/{genre}",
                  "parts" => [
                    "hot",
                    "{genre}",
                  ],
                  "select" => {
                    "exist" => [
                      "format",
                      "genre",
                      "limit",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [
              [
                "hot",
              ],
              [
                "playlist",
              ],
            ],
          },
        },
        "search" => {
          "fields" => [
            {
              "active" => true,
              "name" => "q",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "results",
              "req" => false,
              "type" => "`$ARRAY`",
              "index$" => 1,
            },
          ],
          "name" => "search",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "context",
                        "orig" => "context",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "q",
                        "orig" => "q",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/search",
                  "parts" => [
                    "search",
                  ],
                  "select" => {
                    "exist" => [
                      "context",
                      "format",
                      "q",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body.results`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "subscription" => {
          "fields" => [
            {
              "active" => true,
              "name" => "isSubscribing",
              "req" => false,
              "type" => "`$BOOLEAN`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "uId",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "uNm",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 2,
            },
          ],
          "name" => "subscription",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "is_subscr",
                        "orig" => "is_subscr",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "active" => true,
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/follow/fetchFollowers/{id}",
                  "parts" => [
                    "api",
                    "follow",
                    "fetchFollowers",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                      "is_subscr",
                      "limit",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "is_subscr",
                        "orig" => "is_subscr",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "active" => true,
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
                        "reqd" => false,
                        "type" => "`$INTEGER`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/follow/fetchFollowing/{id}",
                  "parts" => [
                    "api",
                    "follow",
                    "fetchFollowing",
                    "{id}",
                  ],
                  "select" => {
                    "exist" => [
                      "id",
                      "is_subscr",
                      "limit",
                      "skip",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
              ],
              "key$" => "load",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "user" => {
          "fields" => [
            {
              "active" => true,
              "name" => "id",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 0,
            },
            {
              "active" => true,
              "name" => "name",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 1,
            },
            {
              "active" => true,
              "name" => "nbTracks",
              "req" => false,
              "type" => "`$INTEGER`",
              "index$" => 2,
            },
            {
              "active" => true,
              "name" => "url",
              "req" => false,
              "type" => "`$STRING`",
              "index$" => 3,
            },
          ],
          "name" => "user",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
                  "active" => true,
                  "args" => {},
                  "kind" => "http",
                  "method" => "POST",
                  "orig" => "/api/user",
                  "parts" => [
                    "api",
                    "user",
                  ],
                  "select" => {},
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
              ],
              "key$" => "create",
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "active" => true,
                  "args" => {
                    "query" => [
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "count_like",
                        "orig" => "count_like",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "count_post",
                        "orig" => "count_post",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => false,
                        "type" => "`$STRING`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "include_subscr",
                        "orig" => "include_subscr",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "active" => true,
                        "kind" => "query",
                        "name" => "is_subscr",
                        "orig" => "is_subscr",
                        "reqd" => false,
                        "type" => "`$BOOLEAN`",
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/api/user",
                  "parts" => [
                    "api",
                    "user",
                  ],
                  "select" => {
                    "exist" => [
                      "count_like",
                      "count_post",
                      "id",
                      "include_subscr",
                      "is_subscr",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 0,
                },
                {
                  "active" => true,
                  "args" => {
                    "params" => [
                      {
                        "active" => true,
                        "kind" => "param",
                        "name" => "username",
                        "orig" => "username",
                        "reqd" => true,
                        "type" => "`$STRING`",
                        "index$" => 0,
                      },
                    ],
                  },
                  "kind" => "http",
                  "method" => "GET",
                  "orig" => "/{username}/info",
                  "parts" => [
                    "{username}",
                    "info",
                  ],
                  "select" => {
                    "exist" => [
                      "username",
                    ],
                  },
                  "transform" => {
                    "req" => "`reqdata`",
                    "res" => "`body`",
                  },
                  "index$" => 1,
                },
              ],
              "key$" => "list",
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
      },
    }
  end


  def self.make_feature(name)
    require_relative 'features'
    OpenwhydFeatures.make_feature(name)
  end
end
