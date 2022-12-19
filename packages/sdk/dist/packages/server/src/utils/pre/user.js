"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zParse_1 = require("../zParse");
const schema_1 = require("../../common/schema");
const prisma_1 = require("../prisma");
const errorModel_1 = require("../../common/errorModel");
const userMe = async (req) => {
    const { user: { id }, } = await (0, zParse_1.zParse)(schema_1.commonUserSchema, req);
    const user = await prisma_1.prisma.user.findFirst({ where: { id } });
    // @ts-ignore
    if (!user)
        return errorModel_1.CustomError.notFound("User doesn't exist");
    const { password, ...userObj } = user;
    req.pre.user = userObj;
    return;
};
exports.default = userMe;
//# sourceMappingURL=user.js.map