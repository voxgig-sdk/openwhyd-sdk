export interface Authentication {
    bio?: string;
    cvrImg?: string;
    email?: string;
    error?: string;
    handle?: string;
    id?: string;
    img?: string;
    isSubscribing?: boolean;
    lastArtists?: any[];
    lastFm?: Record<string, any>;
    lnk?: Record<string, any>;
    loc?: string;
    name?: string;
    nbLikes?: number;
    nbPosts?: number;
    nbSubscribers?: number;
    nbSubscriptions?: number;
    pl?: any[];
    redirect?: string;
    twId?: string;
    twSec?: string;
    twTok?: string;
    uId?: string;
}
export interface AuthenticationLoadMatch {
    action: string;
    ajax?: boolean;
    email?: string;
    include_user?: boolean;
    md5?: string;
}
export interface AuthenticationCreateData {
    bio?: string;
    cvrImg?: string;
    email?: string;
    error?: string;
    handle?: string;
    id?: string;
    img?: string;
    isSubscribing?: boolean;
    lastArtists?: any[];
    lastFm?: Record<string, any>;
    lnk?: Record<string, any>;
    loc?: string;
    name?: string;
    nbLikes?: number;
    nbPosts?: number;
    nbSubscribers?: number;
    nbSubscriptions?: number;
    pl?: any[];
    redirect?: string;
    twId?: string;
    twSec?: string;
    twTok?: string;
    uId?: string;
}
export interface GetUserPost {
    ctx?: string;
    eId?: string;
    id?: string;
    img?: string;
    lov?: any[];
    name?: string;
    nbP?: number;
    nbR?: number;
    score?: number;
    src?: Record<string, any>;
    text?: string;
    uId?: string;
    uNm?: string;
    url?: string;
}
export interface GetUserPostListMatch {
    id: string;
    after?: string;
    callback?: string;
    format?: string;
    limit?: number;
}
export interface Playlist {
    id?: number;
    name?: string;
    nbTracks?: number;
    url?: string;
}
export interface PlaylistListMatch {
    username: string;
    format?: string;
}
export interface Post {
    ctx?: string;
    eId?: string;
    id?: string;
    img?: string;
    lov?: any[];
    name?: string;
    nbP?: number;
    nbR?: number;
    score?: number;
    src?: Record<string, any>;
    text?: string;
    uId?: string;
    uNm?: string;
    url?: string;
}
export interface PostLoadMatch {
    genre: string;
    format?: string;
    limit?: number;
}
export interface Search {
    q?: string;
    results?: any[];
}
export interface SearchListMatch {
    context?: string;
    format?: string;
    q: string;
}
export interface Subscription {
    id?: string;
    isSubscribing?: boolean;
    uId?: string;
    uNm?: string;
}
export interface SubscriptionLoadMatch {
    id: string;
    is_subscr?: boolean;
    limit?: number;
    skip?: number;
}
export interface User {
    id?: number;
    name?: string;
    nbTracks?: number;
    url?: string;
}
export interface UserListMatch {
    count_like?: boolean;
    count_post?: boolean;
    id?: string;
    include_subscr?: boolean;
    is_subscr?: boolean;
}
export interface UserCreateData {
    id?: number;
    name?: string;
    nbTracks?: number;
    url?: string;
}
