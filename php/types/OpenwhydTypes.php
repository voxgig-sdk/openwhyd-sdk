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
    public ?string $bio = null;
    public ?string $cvrImg = null;
    public ?string $email = null;
    public ?string $error = null;
    public ?string $handle = null;
    public string $id;
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
    public ?string $playlist_id = null;
    public ?string $username = null;
    public ?string $genre = null;
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
    public ?string $q = null;
    public ?array $results = null;
}

/** Subscription entity data model. */
class Subscription
{
    public ?bool $isSubscribing = null;
    public ?string $uId = null;
    public ?string $uNm = null;
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
    public ?int $nbTracks = null;
    public ?string $url = null;
}

/** Request payload for User#list. */
class UserListMatch
{
    public ?string $username = null;
}

/** Request payload for User#create. */
class UserCreateData
{
    public ?int $id = null;
    public ?string $name = null;
    public ?int $nbTracks = null;
    public ?string $url = null;
}

