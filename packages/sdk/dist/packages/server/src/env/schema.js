"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverSchema = void 0;
const zod_1 = require("zod");
exports.serverSchema = zod_1.z.object({
    NODE_ENV: zod_1.z
        .enum(["development", "test", "production"])
        .default("development"),
    PORT: zod_1.z.string().default("5000"),
    DATABASE_URL: zod_1.z.string(),
    JWT_ACCESS_TOKEN_SECRET: zod_1.z.string(),
    JWT_REFRESH_TOKEN_SECRET: zod_1.z.string(),
    JWT_ACCESS_TOKEN_EXPIRES_IN: zod_1.z.string(),
    JWT_REFRESH_TOKEN_EXPIRES_IN: zod_1.z.string(),
    AVATAR_API_PROTOCOL: zod_1.z.string().default("https"),
    AVATAR_API_HOST: zod_1.z.string().default("avatars.dicebear.com/api"),
});
//# sourceMappingURL=schema.js.map