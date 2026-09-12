import { OpenwhydEntityBase } from '../OpenwhydEntityBase';
import type { OpenwhydSDK } from '../OpenwhydSDK';
import type { Control } from '../types';
import type { Post, PostLoadMatch } from '../OpenwhydTypes';
declare class PostEntity extends OpenwhydEntityBase<Post> {
    constructor(client: OpenwhydSDK, entopts: any);
    make(this: PostEntity): PostEntity;
    load(this: any, reqmatch?: PostLoadMatch, ctrl?: Control): Promise<PostEntity>;
}
export { PostEntity };
