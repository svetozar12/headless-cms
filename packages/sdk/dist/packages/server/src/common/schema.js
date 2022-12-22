"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commonIdParamSchema = exports.commonUserSchema = exports.paginationSchema = exports.parseStringToInt = exports.parseJson = exports.parseBoolean = exports.fieldType = void 0;
const tslib_1 = require("tslib");
const zod_1 = require("zod");
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
const parseBoolean = zod_1.z
    .string()
    .transform((val) => val === "true")
    .optional();
exports.parseBoolean = parseBoolean;
const commonUserSchema = zod_1.z.object({
    user: zod_1.z.object({
        id: zod_1.z.number(),
    }),
});
exports.commonUserSchema = commonUserSchema;
const commonIdParamSchema = zod_1.z.object({
    params: zod_1.z.object({
        id: zod_1.z.string().transform((val) => parseInt(val)),
    }),
});
exports.commonIdParamSchema = commonIdParamSchema;
const parseStringToInt = zod_1.z.preprocess((val) => {
    if (typeof val === "string")
        return parseInt(val, 10);
    return val;
}, zod_1.z.number().min(1));
exports.parseStringToInt = parseStringToInt;
const parseJson = zod_1.z.string().transform((val) => {
    (0, logger_1.default)([val, typeof JSON.parse(val), "dormak"]);
    return JSON.parse(val);
});
exports.parseJson = parseJson;
const paginationSchema = zod_1.z.object({
    query: zod_1.z.object({
        page: parseStringToInt.default(1),
        pageSize: parseStringToInt.default(10),
    }),
});
exports.paginationSchema = paginationSchema;
const fieldType = zod_1.z.enum(["json", "text", "number"]);
exports.fieldType = fieldType;
//# sourceMappingURL=schema.js.map