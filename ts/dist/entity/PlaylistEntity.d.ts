import { OpenwhydEntityBase } from '../OpenwhydEntityBase';
import type { OpenwhydSDK } from '../OpenwhydSDK';
import type { Control } from '../types';
import type { Playlist, PlaylistListMatch } from '../OpenwhydTypes';
declare class PlaylistEntity extends OpenwhydEntityBase<Playlist> {
    constructor(client: OpenwhydSDK, entopts: any);
    make(this: PlaylistEntity): PlaylistEntity;
    list(this: any, reqmatch?: PlaylistListMatch, ctrl?: Control): Promise<PlaylistEntity[]>;
}
export { PlaylistEntity };
