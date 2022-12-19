"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const init = (res, req, next) => {
    req.pre = {};
    next();
};
exports.init = init;
//# sourceMappingURL=preinit.js.map