"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenwhydError = void 0;
class OpenwhydError extends Error {
    isOpenwhydError = true;
    sdk = 'Openwhyd';
    code;
    ctx;
    status = -1;
    // `err.notFound` rather than a magic number at every call site.
    get notFound() { return 404 === this.status; }
    constructor(code, msg, ctx) {
        super(msg);
        this.code = code;
        this.ctx = ctx;
    }
}
exports.OpenwhydError = OpenwhydError;
//# sourceMappingURL=OpenwhydError.js.map