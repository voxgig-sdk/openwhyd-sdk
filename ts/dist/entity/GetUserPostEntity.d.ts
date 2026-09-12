import { OpenwhydEntityBase } from '../OpenwhydEntityBase';
import type { OpenwhydSDK } from '../OpenwhydSDK';
import type { Control } from '../types';
import type { GetUserPost, GetUserPostListMatch } from '../OpenwhydTypes';
declare class GetUserPostEntity extends OpenwhydEntityBase<GetUserPost> {
    constructor(client: OpenwhydSDK, entopts: any);
    make(this: GetUserPostEntity): GetUserPostEntity;
    list(this: any, reqmatch?: GetUserPostListMatch, ctrl?: Control): Promise<GetUserPostEntity[]>;
}
export { GetUserPostEntity };
