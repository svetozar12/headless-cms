"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFieldType = exports.updateFieldType = exports.createFieldType = exports.getFieldType = void 0;
const zod_1 = require("zod");
const schema_1 = require("../../../common/schema");
exports.getFieldType = zod_1.z.object({
    params: zod_1.z.object({
        contentModelId: schema_1.parseStringToInt,
    }),
});
exports.createFieldType = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string(),
        type: schema_1.fieldType,
    }),
    params: zod_1.z.object({
        contentModelId: schema_1.parseStringToInt,
    }),
});
exports.updateFieldType = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
    }),
    params: zod_1.z.object({
        contentModelId: schema_1.parseStringToInt,
        id: schema_1.parseStringToInt,
    }),
});
exports.deleteFieldType = zod_1.z.object({
    params: zod_1.z.object({
        contentModelId: schema_1.parseStringToInt,
        id: schema_1.parseStringToInt,
    }),
});
//# sourceMappingURL=fieldType.schema.js.map