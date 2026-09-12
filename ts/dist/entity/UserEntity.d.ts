import { OpenwhydEntityBase } from '../OpenwhydEntityBase';
import type { OpenwhydSDK } from '../OpenwhydSDK';
import type { Control } from '../types';
import type { User, UserListMatch, UserCreateData } from '../OpenwhydTypes';
declare class UserEntity extends OpenwhydEntityBase<User> {
    constructor(client: OpenwhydSDK, entopts: any);
    make(this: UserEntity): UserEntity;
    list(this: any, reqmatch?: UserListMatch, ctrl?: Control): Promise<UserEntity[]>;
    create(this: any, reqdata?: UserCreateData, ctrl?: Control): Promise<UserEntity>;
}
export { UserEntity };
