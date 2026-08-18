# Openwhyd SDK configuration

module OpenwhydConfig
  # Return the process-wide config, built once on first use. The SDK reads
  # the config on every request and never writes to it, so one instance is
  # shared by every client rather than rebuilt per client.
  #
  # The returned hash is shared: treat it as read-only. Callers that need to
  # mutate should use make_config, which always returns a fresh copy.
  def self.shared_config
    @shared_config ||= make_config
  end


  # Build a fresh, fully materialised config hash. Every call rebuilds the
  # whole structure, so prefer shared_config unless you need a private copy
  # you intend to mutate.
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
              "name" => "bio",
              "type" => "`$STRING`",
            },
            {
              "name" => "cvrImg",
              "type" => "`$STRING`",
            },
            {
              "name" => "email",
              "type" => "`$STRING`",
            },
            {
              "name" => "error",
              "type" => "`$STRING`",
            },
            {
              "name" => "handle",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "img",
              "type" => "`$STRING`",
            },
            {
              "name" => "isSubscribing",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "lastArtists",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "lastFm",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "lnk",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "loc",
              "type" => "`$STRING`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "nbLikes",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "nbPosts",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "nbSubscribers",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "nbSubscriptions",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "pl",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "redirect",
              "type" => "`$STRING`",
            },
            {
              "name" => "twId",
              "type" => "`$STRING`",
            },
            {
              "name" => "twSec",
              "type" => "`$STRING`",
            },
            {
              "name" => "twTok",
              "type" => "`$STRING`",
            },
            {
              "name" => "uId",
              "type" => "`$STRING`",
            },
          ],
          "name" => "authentication",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
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
                },
                {
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
                },
              ],
            },
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "action",
                        "orig" => "action",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "ajax",
                        "orig" => "ajax",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "kind" => "query",
                        "name" => "email",
                        "orig" => "email",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "include_user",
                        "orig" => "include_user",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "kind" => "query",
                        "name" => "md5",
                        "orig" => "md5",
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
                },
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "ajax",
                        "orig" => "ajax",
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
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "get_user_post" => {
          "fields" => [
            {
              "name" => "ctx",
              "type" => "`$STRING`",
            },
            {
              "name" => "eId",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "img",
              "type" => "`$STRING`",
            },
            {
              "name" => "lov",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "nbP",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "nbR",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "score",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "src",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "text",
              "type" => "`$STRING`",
            },
            {
              "name" => "uId",
              "type" => "`$STRING`",
            },
            {
              "name" => "uNm",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "type" => "`$STRING`",
            },
          ],
          "name" => "get_user_post",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "username",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "after",
                        "orig" => "after",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "callback",
                        "orig" => "callback",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 20,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
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
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "playlist" => {
          "fields" => [
            {
              "name" => "id",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "nbTracks",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "url",
              "type" => "`$STRING`",
            },
          ],
          "name" => "playlist",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "username",
                        "orig" => "username",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
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
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "post" => {
          "fields" => [
            {
              "name" => "ctx",
              "type" => "`$STRING`",
            },
            {
              "name" => "eId",
              "type" => "`$STRING`",
            },
            {
              "name" => "id",
              "type" => "`$STRING`",
            },
            {
              "name" => "img",
              "type" => "`$STRING`",
            },
            {
              "name" => "lov",
              "type" => "`$ARRAY`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "nbP",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "nbR",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "score",
              "type" => "`$NUMBER`",
            },
            {
              "name" => "src",
              "type" => "`$OBJECT`",
            },
            {
              "name" => "text",
              "type" => "`$STRING`",
            },
            {
              "name" => "uId",
              "type" => "`$STRING`",
            },
            {
              "name" => "uNm",
              "type" => "`$STRING`",
            },
            {
              "name" => "url",
              "type" => "`$STRING`",
            },
          ],
          "name" => "post",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "playlist_id",
                        "orig" => "playlist_id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "param",
                        "name" => "username",
                        "orig" => "username",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "after",
                        "orig" => "after",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 20,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
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
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "genre",
                        "orig" => "genre",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
                        "example" => 20,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
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
                },
              ],
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
              "name" => "q",
              "type" => "`$STRING`",
            },
            {
              "name" => "results",
              "type" => "`$ARRAY`",
              "union" => {
                "branches" => 3,
                "count" => 1,
                "depth" => 1,
              },
            },
          ],
          "name" => "search",
          "op" => {
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "context",
                        "orig" => "context",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "format",
                        "orig" => "format",
                        "type" => "`$STRING`",
                      },
                      {
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
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "subscription" => {
          "fields" => [
            {
              "name" => "isSubscribing",
              "type" => "`$BOOLEAN`",
            },
            {
              "name" => "uId",
              "type" => "`$STRING`",
            },
            {
              "name" => "uNm",
              "type" => "`$STRING`",
            },
          ],
          "name" => "subscription",
          "op" => {
            "load" => {
              "input" => "data",
              "name" => "load",
              "points" => [
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "is_subscr",
                        "orig" => "is_subscr",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
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
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "id",
                        "orig" => "id",
                        "reqd" => true,
                        "type" => "`$STRING`",
                      },
                    ],
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "is_subscr",
                        "orig" => "is_subscr",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "example" => 50,
                        "kind" => "query",
                        "name" => "limit",
                        "orig" => "limit",
                        "type" => "`$INTEGER`",
                      },
                      {
                        "kind" => "query",
                        "name" => "skip",
                        "orig" => "skip",
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
                },
              ],
            },
          },
          "relations" => {
            "ancestors" => [],
          },
        },
        "user" => {
          "fields" => [
            {
              "name" => "id",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "name",
              "type" => "`$STRING`",
            },
            {
              "name" => "nbTracks",
              "type" => "`$INTEGER`",
            },
            {
              "name" => "url",
              "type" => "`$STRING`",
            },
          ],
          "name" => "user",
          "op" => {
            "create" => {
              "input" => "data",
              "name" => "create",
              "points" => [
                {
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
                },
              ],
            },
            "list" => {
              "input" => "data",
              "name" => "list",
              "points" => [
                {
                  "args" => {
                    "query" => [
                      {
                        "kind" => "query",
                        "name" => "count_like",
                        "orig" => "count_like",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "kind" => "query",
                        "name" => "count_post",
                        "orig" => "count_post",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "kind" => "query",
                        "name" => "id",
                        "orig" => "id",
                        "type" => "`$STRING`",
                      },
                      {
                        "kind" => "query",
                        "name" => "include_subscr",
                        "orig" => "include_subscr",
                        "type" => "`$BOOLEAN`",
                      },
                      {
                        "kind" => "query",
                        "name" => "is_subscr",
                        "orig" => "is_subscr",
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
                },
                {
                  "args" => {
                    "params" => [
                      {
                        "kind" => "param",
                        "name" => "username",
                        "orig" => "username",
                        "reqd" => true,
                        "type" => "`$STRING`",
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
                },
              ],
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
