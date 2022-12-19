"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const apiUtil_1 = require("../apiUtil");
exports.user = {
    getMe: () => (0, apiUtil_1.makeRequest)("get", "/user/me"),
    create: (user) => (0, apiUtil_1.makeRequest)("post", "/user", undefined, user),
};
//# sourceMappingURL=user.js.map