"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const logger_1 = tslib_1.__importDefault(require("./utils/logger"));
tslib_1.__exportStar(require("./utils/prisma"), exports);
const preinit_1 = require("./preinit");
const express_1 = tslib_1.__importDefault(require("express"));
const cors_1 = tslib_1.__importDefault(require("cors"));
const server_1 = require("./env/server");
const routes_1 = tslib_1.__importDefault(require("./routes"));
const errorHandler_1 = tslib_1.__importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((req, res, next) => {
    (0, preinit_1.init)(res, req, next);
});
// init routes
(0, routes_1.default)(app);
app.use(errorHandler_1.default);
if (server_1.env.NODE_ENV !== "test")
    app.listen(server_1.env.PORT, () => (0, logger_1.default)([`Server running on port ${server_1.env.PORT}`]));
exports.default = app;
//# sourceMappingURL=index.js.map