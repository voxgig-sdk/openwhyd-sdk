-- Openwhyd SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "Openwhyd",
      slug = "openwhyd",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://openwhyd.org",
      auth = {
        prefix = "",
        ["in"] = "cookie",
        name = "whydSid",
      },
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["authentication"] = {},
        ["get_user_post"] = {},
        ["hot"] = {},
        ["playlist"] = {},
        ["search"] = {},
        ["subscription"] = {},
        ["user"] = {},
      },
    },
    entity = {
      ["authentication"] = {
        ["fields"] = {
          {
            ["name"] = "bio",
            ["title"] = "Bio",
            ["type"] = "`$STRING`",
            ["short"] = "User biography",
          },
          {
            ["name"] = "cvrImg",
            ["title"] = "Cvr Img",
            ["type"] = "`$STRING`",
            ["short"] = "Cover image URL",
          },
          {
            ["name"] = "email",
            ["title"] = "Email",
            ["type"] = "`$STRING`",
            ["short"] = "Email address",
          },
          {
            ["name"] = "error",
            ["title"] = "Error",
            ["type"] = "`$STRING`",
            ["short"] = "Error message if any",
          },
          {
            ["name"] = "handle",
            ["title"] = "Handle",
            ["type"] = "`$STRING`",
            ["short"] = "Username/handle",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "User ID",
          },
          {
            ["name"] = "img",
            ["title"] = "Img",
            ["type"] = "`$STRING`",
            ["short"] = "Avatar URL",
          },
          {
            ["name"] = "isSubscribing",
            ["title"] = "Is Subscribing",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Whether logged in user subscribes to this user",
          },
          {
            ["name"] = "lastArtists",
            ["title"] = "Last Artists",
            ["type"] = "`$ARRAY`",
            ["short"] = "Recently posted artists",
          },
          {
            ["name"] = "lastFm",
            ["title"] = "Last Fm",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "lnk",
            ["title"] = "Lnk",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "loc",
            ["title"] = "Loc",
            ["type"] = "`$STRING`",
            ["short"] = "User location",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Full name",
          },
          {
            ["name"] = "nbLikes",
            ["title"] = "Nb Likes",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of likes",
          },
          {
            ["name"] = "nbPosts",
            ["title"] = "Nb Posts",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of posts",
          },
          {
            ["name"] = "nbSubscribers",
            ["title"] = "Nb Subscribers",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of subscribers",
          },
          {
            ["name"] = "nbSubscriptions",
            ["title"] = "Nb Subscriptions",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of subscriptions",
          },
          {
            ["name"] = "pl",
            ["title"] = "Pl",
            ["type"] = "`$ARRAY`",
            ["short"] = "User playlists",
          },
          {
            ["name"] = "redirect",
            ["title"] = "Redirect",
            ["type"] = "`$STRING`",
            ["short"] = "URL to redirect to",
          },
          {
            ["name"] = "twId",
            ["title"] = "Tw Id",
            ["type"] = "`$STRING`",
            ["short"] = "Twitter handle",
          },
          {
            ["name"] = "twSec",
            ["title"] = "Tw Sec",
            ["type"] = "`$STRING`",
            ["short"] = "Twitter session secret",
          },
          {
            ["name"] = "twTok",
            ["title"] = "Tw Tok",
            ["type"] = "`$STRING`",
            ["short"] = "Twitter session token",
          },
          {
            ["name"] = "uId",
            ["title"] = "U Id",
            ["type"] = "`$STRING`",
            ["short"] = "ID of new user if successful",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "authentication",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/login",
                ["segments"] = {
                  {
                    ["lit"] = "login",
                  },
                },
                ["parts"] = {
                  "login",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.user`",
                },
                ["args"] = {},
                ["select"] = {},
              },
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/register",
                ["segments"] = {
                  {
                    ["lit"] = "register",
                  },
                },
                ["parts"] = {
                  "register",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/login",
                ["segments"] = {
                  {
                    ["lit"] = "login",
                  },
                },
                ["parts"] = {
                  "login",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.user`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "action",
                      ["orig"] = "action",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "ajax",
                      ["orig"] = "ajax",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "email",
                      ["orig"] = "email",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "include_user",
                      ["orig"] = "include_user",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "md5",
                      ["orig"] = "md5",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "action",
                    "ajax",
                    "email",
                    "include_user",
                    "md5",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/logout",
                ["segments"] = {
                  {
                    ["lit"] = "logout",
                  },
                },
                ["parts"] = {
                  "logout",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "ajax",
                      ["orig"] = "ajax",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "ajax",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["get_user_post"] = {
        ["fields"] = {
          {
            ["name"] = "ctx",
            ["title"] = "Ctx",
            ["type"] = "`$STRING`",
            ["short"] = "Context",
          },
          {
            ["name"] = "eId",
            ["title"] = "E Id",
            ["type"] = "`$STRING`",
            ["short"] = "External ID (platform identifier)",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Post ID",
          },
          {
            ["name"] = "img",
            ["title"] = "Img",
            ["type"] = "`$STRING`",
            ["short"] = "Track image URL",
          },
          {
            ["name"] = "lov",
            ["title"] = "Lov",
            ["type"] = "`$ARRAY`",
            ["short"] = "User IDs who liked this post",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Track name",
          },
          {
            ["name"] = "nbP",
            ["title"] = "Nb P",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of plays",
          },
          {
            ["name"] = "nbR",
            ["title"] = "Nb R",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of reposts",
          },
          {
            ["name"] = "score",
            ["title"] = "Score",
            ["type"] = "`$NUMBER`",
            ["short"] = "Search relevance score",
          },
          {
            ["name"] = "src",
            ["title"] = "Src",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "text",
            ["title"] = "Text",
            ["type"] = "`$STRING`",
            ["short"] = "Post text/comment",
          },
          {
            ["name"] = "uId",
            ["title"] = "U Id",
            ["type"] = "`$STRING`",
            ["short"] = "User ID of poster",
          },
          {
            ["name"] = "uNm",
            ["title"] = "U Nm",
            ["type"] = "`$STRING`",
            ["short"] = "User name of poster",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["short"] = "Direct URL to track",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "get_user_post",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{username}",
                ["segments"] = {
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["username"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "username",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "after",
                      ["orig"] = "after",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "callback",
                      ["orig"] = "callback",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 20,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
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
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["hot"] = {
        ["fields"] = {
          {
            ["name"] = "ctx",
            ["title"] = "Ctx",
            ["type"] = "`$STRING`",
            ["short"] = "Context",
          },
          {
            ["name"] = "eId",
            ["title"] = "E Id",
            ["type"] = "`$STRING`",
            ["short"] = "External ID (platform identifier)",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Post ID",
          },
          {
            ["name"] = "img",
            ["title"] = "Img",
            ["type"] = "`$STRING`",
            ["short"] = "Track image URL",
          },
          {
            ["name"] = "lov",
            ["title"] = "Lov",
            ["type"] = "`$ARRAY`",
            ["short"] = "User IDs who liked this post",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Track name",
          },
          {
            ["name"] = "nbP",
            ["title"] = "Nb P",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of plays",
          },
          {
            ["name"] = "nbR",
            ["title"] = "Nb R",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of reposts",
          },
          {
            ["name"] = "score",
            ["title"] = "Score",
            ["type"] = "`$NUMBER`",
            ["short"] = "Search relevance score",
          },
          {
            ["name"] = "src",
            ["title"] = "Src",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "text",
            ["title"] = "Text",
            ["type"] = "`$STRING`",
            ["short"] = "Post text/comment",
          },
          {
            ["name"] = "uId",
            ["title"] = "U Id",
            ["type"] = "`$STRING`",
            ["short"] = "User ID of poster",
          },
          {
            ["name"] = "uNm",
            ["title"] = "U Nm",
            ["type"] = "`$STRING`",
            ["short"] = "User name of poster",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["short"] = "Direct URL to track",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "hot",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/hot/{genre}",
                ["segments"] = {
                  {
                    ["lit"] = "hot",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "hot",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["genre"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "genre",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 20,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                    "id",
                    "limit",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["playlist"] = {
        ["fields"] = {
          {
            ["name"] = "ctx",
            ["title"] = "Ctx",
            ["type"] = "`$STRING`",
            ["short"] = "Context",
          },
          {
            ["name"] = "eId",
            ["title"] = "E Id",
            ["type"] = "`$STRING`",
            ["short"] = "External ID (platform identifier)",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
            ["short"] = "Post ID",
          },
          {
            ["name"] = "img",
            ["title"] = "Img",
            ["type"] = "`$STRING`",
            ["short"] = "Track image URL",
          },
          {
            ["name"] = "lov",
            ["title"] = "Lov",
            ["type"] = "`$ARRAY`",
            ["short"] = "User IDs who liked this post",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Track name",
          },
          {
            ["name"] = "nbP",
            ["title"] = "Nb P",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of plays",
          },
          {
            ["name"] = "nbR",
            ["title"] = "Nb R",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of reposts",
          },
          {
            ["name"] = "nbTracks",
            ["title"] = "Nb Tracks",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of tracks in playlist",
          },
          {
            ["name"] = "score",
            ["title"] = "Score",
            ["type"] = "`$NUMBER`",
            ["short"] = "Search relevance score",
          },
          {
            ["name"] = "src",
            ["title"] = "Src",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "text",
            ["title"] = "Text",
            ["type"] = "`$STRING`",
            ["short"] = "Post text/comment",
          },
          {
            ["name"] = "uId",
            ["title"] = "U Id",
            ["type"] = "`$STRING`",
            ["short"] = "User ID of poster",
          },
          {
            ["name"] = "uNm",
            ["title"] = "U Nm",
            ["type"] = "`$STRING`",
            ["short"] = "User name of poster",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["short"] = "Direct URL to track",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "playlist",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{username}/playlists",
                ["segments"] = {
                  {
                    ["var"] = "username",
                  },
                  {
                    ["lit"] = "playlists",
                  },
                },
                ["parts"] = {
                  "{username}",
                  "playlists",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "username",
                      ["orig"] = "username",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "format",
                    "username",
                  },
                },
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{username}/playlist/{playlistId}",
                ["segments"] = {
                  {
                    ["var"] = "username",
                  },
                  {
                    ["lit"] = "playlist",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "{username}",
                  "playlist",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["playlistId"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "playlist_id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                    {
                      ["name"] = "username",
                      ["orig"] = "username",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "after",
                      ["orig"] = "after",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 20,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
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
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["search"] = {
        ["fields"] = {
          {
            ["name"] = "q",
            ["title"] = "Q",
            ["type"] = "`$STRING`",
            ["short"] = "Search query",
          },
          {
            ["name"] = "results",
            ["title"] = "Results",
            ["type"] = "`$ARRAY`",
          },
        },
        ["name"] = "search",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/search",
                ["segments"] = {
                  {
                    ["lit"] = "search",
                  },
                },
                ["parts"] = {
                  "search",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.results`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "context",
                      ["orig"] = "context",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "format",
                      ["orig"] = "format",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "q",
                      ["orig"] = "q",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "context",
                    "format",
                    "q",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["subscription"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
          {
            ["name"] = "isSubscribing",
            ["title"] = "Is Subscribing",
            ["type"] = "`$BOOLEAN`",
            ["short"] = "Whether logged in user follows this user",
          },
          {
            ["name"] = "uId",
            ["title"] = "U Id",
            ["type"] = "`$STRING`",
            ["short"] = "User ID",
          },
          {
            ["name"] = "uNm",
            ["title"] = "U Nm",
            ["type"] = "`$STRING`",
            ["short"] = "User name",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "subscription",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/follow/fetchFollowers/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "follow",
                  },
                  {
                    ["lit"] = "fetchFollowers",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "api",
                  "follow",
                  "fetchFollowers",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "is_subscr",
                      ["orig"] = "is_subscr",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 50,
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                    "is_subscr",
                    "limit",
                    "skip",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/follow/fetchFollowing/{id}",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "follow",
                  },
                  {
                    ["lit"] = "fetchFollowing",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "api",
                  "follow",
                  "fetchFollowing",
                  "{id}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                  ["query"] = {
                    {
                      ["name"] = "is_subscr",
                      ["orig"] = "is_subscr",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "limit",
                      ["orig"] = "limit",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                      ["example"] = 50,
                    },
                    {
                      ["name"] = "skip",
                      ["orig"] = "skip",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
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
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["user"] = {
        ["fields"] = {
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$INTEGER`",
            ["short"] = "Playlist number",
          },
          {
            ["name"] = "name",
            ["title"] = "Name",
            ["type"] = "`$STRING`",
            ["short"] = "Playlist name",
          },
          {
            ["name"] = "nbTracks",
            ["title"] = "Nb Tracks",
            ["type"] = "`$INTEGER`",
            ["short"] = "Number of tracks in playlist",
          },
          {
            ["name"] = "url",
            ["title"] = "Url",
            ["type"] = "`$STRING`",
            ["short"] = "Playlist URL",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "user",
        ["op"] = {
          ["create"] = {
            ["input"] = "data",
            ["name"] = "create",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "POST",
                ["orig"] = "/api/user",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "user",
                  },
                },
                ["parts"] = {
                  "api",
                  "user",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/api/user",
                ["segments"] = {
                  {
                    ["lit"] = "api",
                  },
                  {
                    ["lit"] = "user",
                  },
                },
                ["parts"] = {
                  "api",
                  "user",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["query"] = {
                    {
                      ["name"] = "count_like",
                      ["orig"] = "count_like",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "count_post",
                      ["orig"] = "count_post",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "id",
                      ["orig"] = "id",
                      ["type"] = "`$STRING`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "include_subscr",
                      ["orig"] = "include_subscr",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                    {
                      ["name"] = "is_subscr",
                      ["orig"] = "is_subscr",
                      ["type"] = "`$BOOLEAN`",
                      ["kind"] = "query",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count_like",
                    "count_post",
                    "id",
                    "include_subscr",
                    "is_subscr",
                  },
                },
              },
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/{username}/info",
                ["segments"] = {
                  {
                    ["var"] = "username",
                  },
                  {
                    ["lit"] = "info",
                  },
                },
                ["parts"] = {
                  "{username}",
                  "info",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "username",
                      ["orig"] = "username",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "username",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
