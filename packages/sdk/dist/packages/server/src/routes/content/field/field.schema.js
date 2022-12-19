"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFieldList = void 0;
const zod_1 = require("zod");
const schema_1 = require("../../../common/schema");
exports.updateFieldList = zod_1.z.object({
    body: zod_1.z.object({
        fields: zod_1.z.array(zod_1.z.object({ id: schema_1.parseStringToInt, value: zod_1.z.any().optional() })),
    }),
    params: zod_1.z.object({
        contentId: schema_1.parseStringToInt,
    }),
});
//# sourceMappingURL=field.schema.js.map