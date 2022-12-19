"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
const userSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string(),
        password: zod_1.z.string(),
    }),
});
exports.userSchema = userSchema;
const updateUserSchema = zod_1.z.object({
    body: zod_1.z.object({
        username: zod_1.z.string().optional(),
    }),
});
exports.updateUserSchema = updateUserSchema;
//# sourceMappingURL=schema.js.map