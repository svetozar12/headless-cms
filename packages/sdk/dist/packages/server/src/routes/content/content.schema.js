"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteContentSchema = exports.updateContentSchema = exports.createContentSchema = exports.getContentListSchema = exports.getContentSchema = void 0;
const zod_1 = require("zod");
const schema_1 = require("../../common/schema");
exports.getContentSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        contentModelId: schema_1.parseStringToInt,
    }),
})
    .merge(schema_1.commonUserSchema)
    .merge(schema_1.commonIdParamSchema);
exports.getContentListSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        contentModelId: schema_1.parseStringToInt,
    }),
})
    .merge(schema_1.commonUserSchema)
    .merge(schema_1.paginationSchema);
exports.createContentSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        contentModelId: schema_1.parseStringToInt,
    }),
})
    .merge(schema_1.commonUserSchema);
exports.updateContentSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        contentModelId: schema_1.parseStringToInt,
    }),
})
    .merge(schema_1.commonIdParamSchema)
    .merge(schema_1.commonUserSchema);
exports.deleteContentSchema = exports.getContentSchema;
//# sourceMappingURL=content.schema.js.map