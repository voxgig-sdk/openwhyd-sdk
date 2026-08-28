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
    public ?string $bio = null;
    public ?string $cvrImg = null;
    public ?string $email = null;
    public ?string $error = null;
    public ?string $handle = null;
    public ?string $id = null;
    public ?string $img = null;
    public ?bool $isSubscribing = null;
    public ?array $lastArtists = null;
    public ?array $lastFm = null;
    public ?array $lnk = null;
    public ?string $loc = null;
    public ?string $name = null;
    public ?int $nbLikes = null;
    public ?int $nbPosts = null;
    public ?int $nbSubscribers = null;
    public ?int $nbSubscriptions = null;
    public ?array $pl = null;
    public ?string $redirect = null;
    public ?string $twId = null;
    public ?string $twSec = null;
    public ?string $twTok = null;
    public ?string $uId = null;
}

/** Request payload for Authentication#load. */
class AuthenticationLoadMatch
{
    public string $action;
    public ?bool $ajax = null;
    public ?string $email = null;
    public ?bool $include_user = null;
    public ?string $md5 = null;
}

/** Request payload for Authentication#create. */
class AuthenticationCreateData
{
    public ?string $bio = null;
    public ?string $cvrImg = null;
    public ?string $email = null;
    public ?string $error = null;
    public ?string $handle = null;
    public ?string $id = null;
    public ?string $img = null;
    public ?bool $isSubscribing = null;
    public ?array $lastArtists = null;
    public ?array $lastFm = null;
    public ?array $lnk = null;
    public ?string $loc = null;
    public ?string $name = null;
    public ?int $nbLikes = null;
    public ?int $nbPosts = null;
    public ?int $nbSubscribers = null;
    public ?int $nbSubscriptions = null;
    public ?array $pl = null;
    public ?string $redirect = null;
    public ?string $twId = null;
    public ?string $twSec = null;
    public ?string $twTok = null;
    public ?string $uId = null;
}

/** GetUserPost entity data model. */
class GetUserPost
{
    public ?string $ctx = null;
    public ?string $eId = null;
    public ?string $id = null;
    public ?string $img = null;
    public ?array $lov = null;
    public ?string $name = null;
    public ?int $nbP = null;
    public ?int $nbR = null;
    public ?float $score = null;
    public ?array $src = null;
    public ?string $text = null;
    public ?string $uId = null;
    public ?string $uNm = null;
    public ?string $url = null;
}

/** Request payload for GetUserPost#list. */
class GetUserPostListMatch
{
    public string $id;
    public ?string $after = null;
    public ?string $callback = null;
    public ?string $format = null;
    public ?int $limit = null;
}

/** Playlist entity data model. */
class Playlist
{
    public ?int $id = null;
    public ?string $name = null;
    public ?int $nbTracks = null;
    public ?string $url = null;
}

/** Request payload for Playlist#list. */
class PlaylistListMatch
{
    public string $username;
    public ?string $format = null;
}

/** Post entity data model. */
class Post
{
    public ?string $ctx = null;
    public ?string $eId = null;
    public ?string $id = null;
    public ?string $img = null;
    public ?array $lov = null;
    public ?string $name = null;
    public ?int $nbP = null;
    public ?int $nbR = null;
    public ?float $score = null;
    public ?array $src = null;
    public ?string $text = null;
    public ?string $uId = null;
    public ?string $uNm = null;
    public ?string $url = null;
}

/** Request payload for Post#load. */
class PostLoadMatch
{
    public string $genre;
    public ?string $format = null;
    public ?int $limit = null;
}

/** Search entity data model. */
class Search
{
    public ?string $q = null;
    public ?array $results = null;
}

/** Request payload for Search#list. */
class SearchListMatch
{
    public ?string $context = null;
    public ?string $format = null;
    public string $q;
}

/** Subscription entity data model. */
class Subscription
{
    public ?string $id = null;
    public ?bool $isSubscribing = null;
    public ?string $uId = null;
    public ?string $uNm = null;
}

/** Request payload for Subscription#load. */
class SubscriptionLoadMatch
{
    public string $id;
    public ?bool $is_subscr = null;
    public ?int $limit = null;
    public ?int $skip = null;
}

/** User entity data model. */
class User
{
    public ?int $id = null;
    public ?string $name = null;
    public ?int $nbTracks = null;
    public ?string $url = null;
}

/** Request payload for User#list. */
class UserListMatch
{
    public ?bool $count_like = null;
    public ?bool $count_post = null;
    public ?string $id = null;
    public ?bool $include_subscr = null;
    public ?bool $is_subscr = null;
}

/** Request payload for User#create. */
class UserCreateData
{
    public ?int $id = null;
    public ?string $name = null;
    public ?int $nbTracks = null;
    public ?string $url = null;
}

