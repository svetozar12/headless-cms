"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.signToken = exports.jwtType = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const server_1 = require("../../env/server");
const logger_1 = require("../../utils/logger");
var jwtType;
(function (jwtType) {
    jwtType["ACCESS"] = "access";
    jwtType["REFRESH"] = "refresh";
})(jwtType = exports.jwtType || (exports.jwtType = {}));
const signToken = (type, payload, expiresIn) => {
    const secret = type === jwtType.ACCESS
        ? server_1.env.JWT_ACCESS_TOKEN_SECRET
        : server_1.env.JWT_REFRESH_TOKEN_SECRET;
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, secret, { expiresIn }, (err, token) => {
            if (err) {
                (0, logger_1.default)(["error", err]);
                return reject(new Error("Error while signing token. Please try again later."));
            }
            return resolve(token);
        });
    });
};
exports.signToken = signToken;
const verifyToken = (type, token) => {
    const secret = type === jwtType.ACCESS
        ? server_1.env.JWT_ACCESS_TOKEN_SECRET
        : server_1.env.JWT_REFRESH_TOKEN_SECRET;
    let user;
    // @ts-ignore
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            (0, logger_1.default)(["error", err]);
            user = false;
        }
        user = decoded;
    });
    return user;
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=utils.js.map