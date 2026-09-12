import { Context } from './Context';
declare class OpenwhydError extends Error {
    isOpenwhydError: boolean;
    sdk: string;
    code: string;
    ctx: Context;
    status: number;
    get notFound(): boolean;
    constructor(code: string, msg: string, ctx: Context);
}
export { OpenwhydError };
