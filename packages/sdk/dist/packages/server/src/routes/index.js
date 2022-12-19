"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const health_1 = require("./health");
// routes
const auth_1 = require("./auth");
const user_1 = require("./user");
const contentModel_1 = require("./contentModel");
const content_1 = require("./content");
// middlewares
const isAuth_1 = require("../middlewares/isAuth");
const utils_1 = require("./auth/utils");
const nested_1 = require("./health/nested");
const field_1 = require("./content/field");
const fieldType_1 = require("./contentModel/fieldType");
const routes = [
    { path: "/health", router: health_1.default },
    { path: "/health/:healthId/nested", router: nested_1.default },
    { path: "/auth", router: auth_1.default },
    { path: "/user", router: user_1.default },
    {
        path: "/contentModel",
        router: contentModel_1.default,
        middlewares: [(0, isAuth_1.default)(utils_1.jwtType.ACCESS)],
    },
    {
        path: "/contentModel/:contentModelId/fieldType",
        router: fieldType_1.default,
    },
    { path: "/content", router: content_1.default },
    { path: "/content/:contentId/field", router: field_1.default },
];
const initRoutes = (app) => {
    routes.forEach((route) => {
        const { path, router, middlewares } = route;
        if (middlewares)
            return app.use(path, middlewares, router);
        return app.use(path, router);
    });
};
exports.default = initRoutes;
//# sourceMappingURL=index.js.map