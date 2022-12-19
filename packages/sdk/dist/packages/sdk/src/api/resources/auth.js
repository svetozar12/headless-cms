"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const apiUtil_1 = require("../apiUtil");
exports.auth = {
    auth: async (grant_type, password, refreshToken) => {
        let res;
        if (grant_type === "password") {
            res = (0, apiUtil_1.makeRequest)("post", "/auth", undefined, {
                grant_type,
                ...password,
            });
        }
        else
            res = (0, apiUtil_1.makeRequest)("post", "/auth", undefined, {
                grant_type,
                refreshToken,
            });
        return res;
    },
};
//# sourceMappingURL=auth.js.map