"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../routes/auth/utils");
const errorModel_1 = require("../common/errorModel");
const isAuth = (tokenType) => {
    return (req, res, next) => {
        const bearerHeader = req.headers["authorization"];
        if (typeof bearerHeader === "undefined")
            return next(errorModel_1.CustomError.unauthorized("Unauthorized"));
        const token = bearerHeader.split(" ")[1];
        if (!token)
            return next(errorModel_1.CustomError.unauthorized("Unauthorized"));
        req.user = (0, utils_1.verifyToken)(tokenType, token);
        if (!req.user)
            return next(errorModel_1.CustomError.unauthorized("Unauthorized"));
        return next();
    };
};
exports.default = isAuth;
//# sourceMappingURL=isAuth.js.map