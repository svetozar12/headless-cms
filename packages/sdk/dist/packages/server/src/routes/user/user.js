"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schema_1 = require("./schema");
const zParse_1 = require("../../utils/zParse");
const isAuth_1 = require("../../middlewares/isAuth");
const utils_1 = require("../auth/utils");
const schema_2 = require("../../common/schema");
const prisma_1 = require("../../utils/prisma");
const server_1 = require("../../env/server");
const preMiddleware_1 = require("../../utils/pre/preMiddleware");
const getAvatar_1 = require("../../utils/getAvatar");
const user = (0, express_1.Router)();
user.get("/me", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(schema_2.commonUserSchema), (0, preMiddleware_1.preResource)([preMiddleware_1.Resource.User]), async (req, res, next) => {
    const { user } = req.pre;
    return res.status(200).json(user);
});
user.post("/", (0, zParse_1.zMiddleware)(schema_1.userSchema), async (req, res, next) => {
    const { body: { username, password }, } = await (0, zParse_1.zParse)(schema_1.userSchema, req);
    const isUserExist = await prisma_1.prisma.user.findFirst({
        where: { username },
    });
    if (isUserExist)
        return res.status(409).json({ message: "User already exist" });
    const user = await prisma_1.prisma.user.create({
        data: { username, password, avatar: (0, getAvatar_1.getAvatar)("identicon") },
    });
    const accessToken = await (0, utils_1.signToken)(utils_1.jwtType.ACCESS, { id: user.id, username }, parseInt(server_1.env.JWT_ACCESS_TOKEN_EXPIRES_IN));
    const refreshToken = await (0, utils_1.signToken)(utils_1.jwtType.REFRESH, { id: user.id, username }, parseInt(server_1.env.JWT_REFRESH_TOKEN_EXPIRES_IN));
    const { password: _, ...userObj } = user;
    return res.status(201).json({ user: userObj, accessToken, refreshToken });
});
user.put("/me", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(schema_1.updateUserSchema), (0, preMiddleware_1.preResource)([preMiddleware_1.Resource.User]), async (req, res, next) => {
    const { body: { username }, } = await (0, zParse_1.zParse)(schema_1.updateUserSchema, req);
    const { user: preUser } = req.pre;
    const { id, username: preUsername } = req.pre.user;
    const noUpdatesReq = !!username;
    if (username === preUsername || !noUpdatesReq)
        return res.status(409).json({ message: "User wasn't updated" });
    const updatedUser = await prisma_1.prisma.user.update({
        where: {
            id,
        },
        data: {
            username: username,
        },
    });
    return res.status(201).json({ user: updatedUser });
});
user.delete("/me", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(schema_2.commonUserSchema), (0, preMiddleware_1.preResource)([preMiddleware_1.Resource.User]), async (req, res, next) => {
    const { user } = req.pre;
    const { id } = user;
    await prisma_1.prisma.user.delete({ where: { id } });
    return res.status(204).send();
});
exports.default = user;
//# sourceMappingURL=user.js.map