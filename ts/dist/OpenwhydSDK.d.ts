import { AuthenticationEntity } from './entity/AuthenticationEntity';
import { GetUserPostEntity } from './entity/GetUserPostEntity';
import { PlaylistEntity } from './entity/PlaylistEntity';
import { PostEntity } from './entity/PostEntity';
import { SearchEntity } from './entity/SearchEntity';
import { SubscriptionEntity } from './entity/SubscriptionEntity';
import { UserEntity } from './entity/UserEntity';
export type * from './OpenwhydTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { OpenwhydEntityBase } from './OpenwhydEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class OpenwhydSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Authentication(entopts?: Record<string, any>): AuthenticationEntity;
    GetUserPost(entopts?: Record<string, any>): GetUserPostEntity;
    Playlist(entopts?: Record<string, any>): PlaylistEntity;
    Post(entopts?: Record<string, any>): PostEntity;
    Search(entopts?: Record<string, any>): SearchEntity;
    Subscription(entopts?: Record<string, any>): SubscriptionEntity;
    User(entopts?: Record<string, any>): UserEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): OpenwhydSDK;
    tester(testopts?: any, sdkopts?: any): OpenwhydSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof OpenwhydSDK;
export { stdutil, config, BaseFeature, OpenwhydEntityBase, OpenwhydSDK, SDK, };
