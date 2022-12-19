"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zMiddleware = exports.zParse = void 0;
const errorModel_1 = require("../common/errorModel");
const logger_1 = require("./logger");
const zParse = async (schema, req) => {
    const zSchema = await schema.safeParseAsync(req);
    if (!zSchema.success)
        return errorModel_1.CustomError.badRequest(zSchema.error.message);
    return zSchema.data;
};
exports.zParse = zParse;
// zod middleware to validate schema before parsing
const zMiddleware = (schema) => {
    return async (req, res, next) => {
        const zSchema = await schema.safeParseAsync(req);
        if (!zSchema.success) {
            const { error: { issues }, } = zSchema;
            (0, logger_1.default)(["zMiddleware", "error", issues]);
            issues.forEach((issue) => {
                (0, logger_1.default)(["zMiddleware", issue.message]);
                next(errorModel_1.CustomError.badRequest(`${issue.message} ${issue.path.join(".")}`));
            });
        }
        next();
    };
};
exports.zMiddleware = zMiddleware;
//# sourceMappingURL=zParse.js.map