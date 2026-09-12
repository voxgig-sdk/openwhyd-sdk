<?php
declare(strict_types=1);

// Openwhyd SDK configuration

class OpenwhydConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "Openwhyd",
                "slug" => "openwhyd",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://openwhyd.org",
                "auth" => [
                    "prefix" => "",
                ],
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "authentication" => [],
                    "get_user_post" => [],
                    "playlist" => [],
                    "post" => [],
                    "search" => [],
                    "subscription" => [],
                    "user" => [],
                ],
            ],
            "entity" => [
        'authentication' => [
          'fields' => [
            [
              'name' => 'bio',
              'short' => 'User biography',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'cvrImg',
              'short' => 'Cover image URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'email',
              'short' => 'Email address',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'error',
              'short' => 'Error message if any',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'handle',
              'short' => 'Username/handle',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'User ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'img',
              'short' => 'Avatar URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'isSubscribing',
              'short' => 'Whether logged in user subscribes to this user',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'lastArtists',
              'short' => 'Recently posted artists',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'lastFm',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'lnk',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'loc',
              'short' => 'User location',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'name',
              'short' => 'Full name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nbLikes',
              'short' => 'Number of likes',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'nbPosts',
              'short' => 'Number of posts',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'nbSubscribers',
              'short' => 'Number of subscribers',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'nbSubscriptions',
              'short' => 'Number of subscriptions',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'pl',
              'short' => 'User playlists',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'redirect',
              'short' => 'URL to redirect to',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'twId',
              'short' => 'Twitter handle',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'twSec',
              'short' => 'Twitter session secret',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'twTok',
              'short' => 'Twitter session token',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'uId',
              'short' => 'ID of new user if successful',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'authentication',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/login',
                  'segments' => [
                    [
                      'lit' => 'login',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.user`',
                  ],
                  'parts' => [
                    'login',
                  ],
                ],
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/register',
                  'segments' => [
                    [
                      'lit' => 'register',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'register',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'action',
                        'orig' => 'action',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'ajax',
                        'orig' => 'ajax',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'email',
                        'orig' => 'email',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'include_user',
                        'orig' => 'include_user',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'md5',
                        'orig' => 'md5',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/login',
                  'segments' => [
                    [
                      'lit' => 'login',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'action',
                      'ajax',
                      'email',
                      'include_user',
                      'md5',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.user`',
                  ],
                  'parts' => [
                    'login',
                  ],
                ],
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'ajax',
                        'orig' => 'ajax',
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/logout',
                  'segments' => [
                    [
                      'lit' => 'logout',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'ajax',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'logout',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'get_user_post' => [
          'fields' => [
            [
              'name' => 'ctx',
              'short' => 'Context',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'eId',
              'short' => 'External ID (platform identifier)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Post ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'img',
              'short' => 'Track image URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lov',
              'short' => 'User IDs who liked this post',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name',
              'short' => 'Track name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nbP',
              'short' => 'Number of plays',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'nbR',
              'short' => 'Number of reposts',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'score',
              'short' => 'Search relevance score',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'src',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'text',
              'short' => 'Post text/comment',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'uId',
              'short' => 'User ID of poster',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'uNm',
              'short' => 'User name of poster',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'Direct URL to track',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'get_user_post',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'username',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'after',
                        'orig' => 'after',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'callback',
                        'orig' => 'callback',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{username}',
                  'rename' => [
                    'param' => [
                      'username' => 'id',
                    ],
                  ],
                  'segments' => [
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'after',
                      'callback',
                      'format',
                      'id',
                      'limit',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'playlist' => [
          'fields' => [
            [
              'name' => 'id',
              'short' => 'Playlist number',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'short' => 'Playlist name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nbTracks',
              'short' => 'Number of tracks in playlist',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'url',
              'short' => 'Playlist URL',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'playlist',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'username',
                        'orig' => 'username',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{username}/playlists',
                  'segments' => [
                    [
                      'var' => 'username',
                    ],
                    [
                      'lit' => 'playlists',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'username',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    '{username}',
                    'playlists',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'post' => [
          'fields' => [
            [
              'name' => 'ctx',
              'short' => 'Context',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'eId',
              'short' => 'External ID (platform identifier)',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'id',
              'short' => 'Post ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'img',
              'short' => 'Track image URL',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'lov',
              'short' => 'User IDs who liked this post',
              'type' => '`$ARRAY`',
            ],
            [
              'name' => 'name',
              'short' => 'Track name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nbP',
              'short' => 'Number of plays',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'nbR',
              'short' => 'Number of reposts',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'score',
              'short' => 'Search relevance score',
              'type' => '`$NUMBER`',
            ],
            [
              'name' => 'src',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'text',
              'short' => 'Post text/comment',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'uId',
              'short' => 'User ID of poster',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'uNm',
              'short' => 'User name of poster',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'url',
              'short' => 'Direct URL to track',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'post',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'playlist_id',
                        'orig' => 'playlist_id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'param',
                        'name' => 'username',
                        'orig' => 'username',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'after',
                        'orig' => 'after',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{username}/playlist/{playlistId}',
                  'rename' => [
                    'param' => [
                      'playlistId' => 'playlist_id',
                    ],
                  ],
                  'segments' => [
                    [
                      'var' => 'username',
                    ],
                    [
                      'lit' => 'playlist',
                    ],
                    [
                      'var' => 'playlist_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'after',
                      'format',
                      'limit',
                      'playlist_id',
                      'username',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    '{username}',
                    'playlist',
                    '{playlist_id}',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'genre',
                        'orig' => 'genre',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 20,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/hot/{genre}',
                  'segments' => [
                    [
                      'lit' => 'hot',
                    ],
                    [
                      'var' => 'genre',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'format',
                      'genre',
                      'limit',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'hot',
                    '{genre}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'hot',
              ],
              [
                'playlist',
              ],
            ],
          ],
        ],
        'search' => [
          'fields' => [
            [
              'name' => 'q',
              'short' => 'Search query',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'results',
              'type' => '`$ARRAY`',
              'union' => [
                'branches' => 3,
                'count' => 1,
                'depth' => 1,
              ],
            ],
          ],
          'name' => 'search',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'context',
                        'orig' => 'context',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'format',
                        'orig' => 'format',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'q',
                        'orig' => 'q',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/search',
                  'segments' => [
                    [
                      'lit' => 'search',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'context',
                      'format',
                      'q',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.results`',
                  ],
                  'parts' => [
                    'search',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'subscription' => [
          'fields' => [
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'isSubscribing',
              'short' => 'Whether logged in user follows this user',
              'type' => '`$BOOLEAN`',
            ],
            [
              'name' => 'uId',
              'short' => 'User ID',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'uNm',
              'short' => 'User name',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'subscription',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'is_subscr',
                        'orig' => 'is_subscr',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 50,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'skip',
                        'orig' => 'skip',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/follow/fetchFollowers/{id}',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'follow',
                    ],
                    [
                      'lit' => 'fetchFollowers',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'is_subscr',
                      'limit',
                      'skip',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'follow',
                    'fetchFollowers',
                    '{id}',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'id',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'is_subscr',
                        'orig' => 'is_subscr',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'example' => 50,
                        'kind' => 'query',
                        'name' => 'limit',
                        'orig' => 'limit',
                        'type' => '`$INTEGER`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'skip',
                        'orig' => 'skip',
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/follow/fetchFollowing/{id}',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'follow',
                    ],
                    [
                      'lit' => 'fetchFollowing',
                    ],
                    [
                      'var' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                      'is_subscr',
                      'limit',
                      'skip',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'follow',
                    'fetchFollowing',
                    '{id}',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'user' => [
          'fields' => [
            [
              'name' => 'id',
              'short' => 'Playlist number',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'name',
              'short' => 'Playlist name',
              'type' => '`$STRING`',
            ],
            [
              'name' => 'nbTracks',
              'short' => 'Number of tracks in playlist',
              'type' => '`$INTEGER`',
            ],
            [
              'name' => 'url',
              'short' => 'Playlist URL',
              'type' => '`$STRING`',
            ],
          ],
          'id' => [
            'field' => 'id',
            'name' => 'id',
          ],
          'name' => 'user',
          'op' => [
            'create' => [
              'input' => 'data',
              'name' => 'create',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'POST',
                  'orig' => '/api/user',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'user',
                    ],
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'user',
                  ],
                ],
              ],
            ],
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [
                    'query' => [
                      [
                        'kind' => 'query',
                        'name' => 'count_like',
                        'orig' => 'count_like',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'count_post',
                        'orig' => 'count_post',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'id',
                        'orig' => 'id',
                        'type' => '`$STRING`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'include_subscr',
                        'orig' => 'include_subscr',
                        'type' => '`$BOOLEAN`',
                      ],
                      [
                        'kind' => 'query',
                        'name' => 'is_subscr',
                        'orig' => 'is_subscr',
                        'type' => '`$BOOLEAN`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/api/user',
                  'segments' => [
                    [
                      'lit' => 'api',
                    ],
                    [
                      'lit' => 'user',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'count_like',
                      'count_post',
                      'id',
                      'include_subscr',
                      'is_subscr',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    'api',
                    'user',
                  ],
                ],
                [
                  'args' => [
                    'params' => [
                      [
                        'kind' => 'param',
                        'name' => 'username',
                        'orig' => 'username',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/{username}/info',
                  'segments' => [
                    [
                      'var' => 'username',
                    ],
                    [
                      'lit' => 'info',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'username',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                  'parts' => [
                    '{username}',
                    'info',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return OpenwhydFeatures::make_feature($name);
    }
}
