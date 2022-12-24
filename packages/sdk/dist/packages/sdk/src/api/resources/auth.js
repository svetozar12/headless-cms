"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const apiUtil_1 = require("../apiUtil");
exports.auth = {
    auth: async (grant_type, password, refreshToken) => {
        let res;
        if (grant_type === "password") {
            const passwordType = await (0, apiUtil_1.makeRequest)("post", "/auth", undefined, {
                grant_type,
                ...password,
            });
            res = passwordType;
        }
        else {
            const otherType = await (0, apiUtil_1.makeRequest)("post", "/auth", undefined, {
                grant_type,
                refreshToken,
            });
            res = otherType;
        }
        return res;
    },
};
//# sourceMappingURL=auth.js.map