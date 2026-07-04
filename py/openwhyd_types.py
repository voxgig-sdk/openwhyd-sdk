# Typed models for the Openwhyd SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Authentication:
    error: Optional[str] = None
    ok: Optional[str] = None
    redirect: Optional[str] = None
    u_id: Optional[str] = None
    user: Optional[dict] = None
    wrong_password: Optional[int] = None


@dataclass
class AuthenticationLoadMatch:
    error: Optional[str] = None
    ok: Optional[str] = None
    redirect: Optional[str] = None
    u_id: Optional[str] = None
    user: Optional[dict] = None
    wrong_password: Optional[int] = None


@dataclass
class AuthenticationCreateData:
    error: Optional[str] = None
    ok: Optional[str] = None
    redirect: Optional[str] = None
    u_id: Optional[str] = None
    user: Optional[dict] = None
    wrong_password: Optional[int] = None


@dataclass
class GetUserPost:
    ctx: Optional[str] = None
    e_id: Optional[str] = None
    id: Optional[str] = None
    img: Optional[str] = None
    lov: Optional[list] = None
    name: Optional[str] = None
    nb_p: Optional[int] = None
    nb_r: Optional[int] = None
    score: Optional[float] = None
    src: Optional[dict] = None
    text: Optional[str] = None
    u_id: Optional[str] = None
    u_nm: Optional[str] = None
    url: Optional[str] = None


@dataclass
class GetUserPostListMatch:
    id: str


@dataclass
class Playlist:
    id: Optional[int] = None
    name: Optional[str] = None
    nb_track: Optional[int] = None
    url: Optional[str] = None


@dataclass
class PlaylistListMatch:
    username: str


@dataclass
class Post:
    ctx: Optional[str] = None
    e_id: Optional[str] = None
    id: Optional[str] = None
    img: Optional[str] = None
    lov: Optional[list] = None
    name: Optional[str] = None
    nb_p: Optional[int] = None
    nb_r: Optional[int] = None
    score: Optional[float] = None
    src: Optional[dict] = None
    text: Optional[str] = None
    u_id: Optional[str] = None
    u_nm: Optional[str] = None
    url: Optional[str] = None


@dataclass
class PostLoadMatch:
    playlist_id: str
    username: str
    genre: str


@dataclass
class Search:
    q: Optional[str] = None
    result: Optional[list] = None


@dataclass
class SearchListMatch:
    q: Optional[str] = None
    result: Optional[list] = None


@dataclass
class Subscription:
    is_subscribing: Optional[bool] = None
    u_id: Optional[str] = None
    u_nm: Optional[str] = None


@dataclass
class SubscriptionLoadMatch:
    id: str


@dataclass
class User:
    id: Optional[int] = None
    name: Optional[str] = None
    nb_track: Optional[int] = None
    url: Optional[str] = None


@dataclass
class UserListMatch:
    username: str


@dataclass
class UserCreateData:
    id: Optional[int] = None
    name: Optional[str] = None
    nb_track: Optional[int] = None
    url: Optional[str] = None

