"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
const errorModel_1 = require("../common/errorModel");
const zod_1 = require("zod");
/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
const handleError = (err, req, res, next) => {
    (0, logger_1.default)([err, "errorHandler"]);
    if (err instanceof errorModel_1.CustomError) {
        return res.status(err.status).json({ message: err.message });
    }
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({ message: err.message });
    }
    (0, logger_1.default)(["error", err]);
    return res.status(500).json({ Message: "Internal server error" });
};
exports.default = handleError;
//# sourceMappingURL=errorHandler.js.map