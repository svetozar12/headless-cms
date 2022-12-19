"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateContentModelSchema = exports.createModelSchema = exports.getAllModelSchema = exports.getModelSchema = void 0;
const zod_1 = require("zod");
const schema_1 = require("../../common/schema");
exports.getModelSchema = schema_1.commonUserSchema.merge(schema_1.commonIdParamSchema);
exports.getAllModelSchema = schema_1.commonUserSchema.merge(schema_1.paginationSchema);
exports.createModelSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
    }),
})
    .merge(schema_1.commonUserSchema);
exports.updateContentModelSchema = zod_1.z
    .object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
    }),
})
    .merge(schema_1.commonUserSchema)
    .merge(schema_1.commonIdParamSchema);
//# sourceMappingURL=contentModel.schema.js.map