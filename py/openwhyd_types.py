# Typed models for the Openwhyd SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Authentication(TypedDict, total=False):
    error: str
    ok: str
    redirect: str
    u_id: str
    user: dict
    wrong_password: int


class AuthenticationLoadMatch(TypedDict, total=False):
    error: str
    ok: str
    redirect: str
    u_id: str
    user: dict
    wrong_password: int


class AuthenticationCreateData(TypedDict, total=False):
    error: str
    ok: str
    redirect: str
    u_id: str
    user: dict
    wrong_password: int


class GetUserPost(TypedDict, total=False):
    ctx: str
    e_id: str
    id: str
    img: str
    lov: list
    name: str
    nb_p: int
    nb_r: int
    score: float
    src: dict
    text: str
    u_id: str
    u_nm: str
    url: str


class GetUserPostListMatch(TypedDict):
    id: str


class Playlist(TypedDict, total=False):
    id: int
    name: str
    nb_track: int
    url: str


class PlaylistListMatch(TypedDict):
    username: str


class Post(TypedDict, total=False):
    ctx: str
    e_id: str
    id: str
    img: str
    lov: list
    name: str
    nb_p: int
    nb_r: int
    score: float
    src: dict
    text: str
    u_id: str
    u_nm: str
    url: str


class PostLoadMatch(TypedDict, total=False):
    playlist_id: str
    username: str
    genre: str


class Search(TypedDict, total=False):
    q: str
    result: list


class SearchListMatch(TypedDict, total=False):
    q: str
    result: list


class Subscription(TypedDict, total=False):
    is_subscribing: bool
    u_id: str
    u_nm: str


class SubscriptionLoadMatch(TypedDict):
    id: str


class User(TypedDict, total=False):
    id: int
    name: str
    nb_track: int
    url: str


class UserListMatch(TypedDict, total=False):
    username: str


class UserCreateData(TypedDict, total=False):
    id: int
    name: str
    nb_track: int
    url: str
