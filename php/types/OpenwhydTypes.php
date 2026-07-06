<?php
declare(strict_types=1);

// Typed models for the Openwhyd SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Authentication entity data model. */
class Authentication
{
    public ?string $error = null;
    public ?string $ok = null;
    public ?string $redirect = null;
    public ?string $u_id = null;
    public ?array $user = null;
    public ?int $wrong_password = null;
}

/** Request payload for Authentication#load. */
class AuthenticationLoadMatch
{
    public ?string $error = null;
    public ?string $ok = null;
    public ?string $redirect = null;
    public ?string $u_id = null;
    public ?array $user = null;
    public ?int $wrong_password = null;
}

/** Request payload for Authentication#create. */
class AuthenticationCreateData
{
    public ?string $error = null;
    public ?string $ok = null;
    public ?string $redirect = null;
    public ?string $u_id = null;
    public ?array $user = null;
    public ?int $wrong_password = null;
}

/** GetUserPost entity data model. */
class GetUserPost
{
    public ?string $ctx = null;
    public ?string $e_id = null;
    public ?string $id = null;
    public ?string $img = null;
    public ?array $lov = null;
    public ?string $name = null;
    public ?int $nb_p = null;
    public ?int $nb_r = null;
    public ?float $score = null;
    public ?array $src = null;
    public ?string $text = null;
    public ?string $u_id = null;
    public ?string $u_nm = null;
    public ?string $url = null;
}

/** Request payload for GetUserPost#list. */
class GetUserPostListMatch
{
    public string $id;
}

/** Playlist entity data model. */
class Playlist
{
    public ?int $id = null;
    public ?string $name = null;
    public ?int $nb_track = null;
    public ?string $url = null;
}

/** Request payload for Playlist#list. */
class PlaylistListMatch
{
    public string $username;
}

/** Post entity data model. */
class Post
{
    public ?string $ctx = null;
    public ?string $e_id = null;
    public ?string $id = null;
    public ?string $img = null;
    public ?array $lov = null;
    public ?string $name = null;
    public ?int $nb_p = null;
    public ?int $nb_r = null;
    public ?float $score = null;
    public ?array $src = null;
    public ?string $text = null;
    public ?string $u_id = null;
    public ?string $u_nm = null;
    public ?string $url = null;
}

/** Request payload for Post#load. */
class PostLoadMatch
{
    public string $playlist_id;
    public string $username;
    public string $genre;
}

/** Search entity data model. */
class Search
{
    public ?string $q = null;
    public ?array $result = null;
}

/** Request payload for Search#list. */
class SearchListMatch
{
    public ?string $q = null;
    public ?array $result = null;
}

/** Subscription entity data model. */
class Subscription
{
    public ?bool $is_subscribing = null;
    public ?string $u_id = null;
    public ?string $u_nm = null;
}

/** Request payload for Subscription#load. */
class SubscriptionLoadMatch
{
    public string $id;
}

/** User entity data model. */
class User
{
    public ?int $id = null;
    public ?string $name = null;
    public ?int $nb_track = null;
    public ?string $url = null;
}

/** Request payload for User#list. */
class UserListMatch
{
    public string $username;
}

/** Request payload for User#create. */
class UserCreateData
{
    public ?int $id = null;
    public ?string $name = null;
    public ?int $nb_track = null;
    public ?string $url = null;
}

