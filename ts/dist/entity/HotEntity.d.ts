import { OpenwhydEntityBase } from '../OpenwhydEntityBase';
import type { OpenwhydSDK } from '../OpenwhydSDK';
import type { Control } from '../types';
import type { Hot, HotLoadMatch } from '../OpenwhydTypes';
declare class HotEntity extends OpenwhydEntityBase<Hot> {
    constructor(client: OpenwhydSDK, entopts: any);
    make(this: HotEntity): HotEntity;
    load(this: any, reqmatch?: HotLoadMatch, ctrl?: Control): Promise<HotEntity>;
}
export { HotEntity };
