"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authSchema = void 0;
const zod_1 = require("zod");
const authSchema = zod_1.z.object({
    body: zod_1.z
        .object({
        username: zod_1.z.string(),
        password: zod_1.z.string(),
        refreshToken: zod_1.z.string(),
        grant_type: zod_1.z.enum(["password", "refresh_token"]),
    })
        .partial()
        .refine((data) => {
        if (data.grant_type === "password") {
            return (data.username && data.password,
                { message: "Invalid username or password" });
        }
        else if (data.grant_type === "refresh_token") {
            return data.refreshToken, { message: "Invalid refresh token" };
        }
        return false;
    }),
});
exports.authSchema = authSchema;
//# sourceMappingURL=schema.js.map