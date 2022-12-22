"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const tslib_1 = require("tslib");
// @ts-check
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const schema_1 = require("./schema");
const logger_1 = tslib_1.__importDefault(require("../utils/logger"));
const _serverEnv = schema_1.serverSchema.safeParse(process.env);
if (!_serverEnv.success) {
    (0, logger_1.default)(["❌ Invalid environment variables:\n", _serverEnv.error]);
    const { error: { issues }, } = _serverEnv;
    issues.forEach((issue) => {
        throw new Error(`Invalid environment variables ${issue.message}`);
    });
}
const _ = _serverEnv.success;
const temp = { _serverEnv };
exports.env = temp._serverEnv.success
    ? temp._serverEnv.data
    : schema_1.serverSchema.parse({});
//# sourceMappingURL=server.js.map