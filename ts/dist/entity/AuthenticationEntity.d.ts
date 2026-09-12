import { OpenwhydEntityBase } from '../OpenwhydEntityBase';
import type { OpenwhydSDK } from '../OpenwhydSDK';
import type { Control } from '../types';
import type { Authentication, AuthenticationLoadMatch, AuthenticationCreateData } from '../OpenwhydTypes';
declare class AuthenticationEntity extends OpenwhydEntityBase<Authentication> {
    constructor(client: OpenwhydSDK, entopts: any);
    make(this: AuthenticationEntity): AuthenticationEntity;
    load(this: any, reqmatch?: AuthenticationLoadMatch, ctrl?: Control): Promise<AuthenticationEntity>;
    create(this: any, reqdata?: AuthenticationCreateData, ctrl?: Control): Promise<AuthenticationEntity>;
}
export { AuthenticationEntity };
