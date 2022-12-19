"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const tslib_1 = require("tslib");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
prisma.$use(async (params, next) => {
    if (params.model === "User" && params.action === "create") {
        const user = params.args.data;
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(user.password, salt);
        user.password = hash;
        params.args.data = user;
    }
    return next(params);
});
tslib_1.__exportStar(require("@prisma/client"), exports);
//# sourceMappingURL=prisma.js.map