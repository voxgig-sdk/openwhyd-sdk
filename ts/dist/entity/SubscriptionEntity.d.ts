import { OpenwhydEntityBase } from '../OpenwhydEntityBase';
import type { OpenwhydSDK } from '../OpenwhydSDK';
import type { Control } from '../types';
import type { Subscription, SubscriptionLoadMatch } from '../OpenwhydTypes';
declare class SubscriptionEntity extends OpenwhydEntityBase<Subscription> {
    constructor(client: OpenwhydSDK, entopts: any);
    make(this: SubscriptionEntity): SubscriptionEntity;
    load(this: any, reqmatch?: SubscriptionLoadMatch, ctrl?: Control): Promise<SubscriptionEntity>;
}
export { SubscriptionEntity };
