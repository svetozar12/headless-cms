"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const express_1 = require("express");
const schema_1 = require("./schema");
const zParse_1 = require("../../utils/zParse");
const prisma_1 = require("../../utils/prisma");
const bcrypt_1 = require("bcrypt");
const server_1 = require("../../env/server");
const auth = (0, express_1.Router)();
auth.post("/", (0, zParse_1.zMiddleware)(schema_1.authSchema), async (req, res) => {
    const { body: { grant_type }, body, } = await (0, zParse_1.zParse)(schema_1.authSchema, req);
    if (grant_type === "password") {
        const { password, username } = body;
        const user = await prisma_1.prisma.user.findFirst({ where: { username } });
        if (!user)
            return res.status(404).json({ message: "User doesn't exist" });
        const comparePassword = bcrypt_1.default.compareSync(password, user.password);
        if (!comparePassword)
            return res.status(400).json({ message: "Invalid password" });
        const accessToken = await (0, utils_1.signToken)(utils_1.jwtType.ACCESS, { id: user.id }, parseInt(server_1.env.JWT_ACCESS_TOKEN_EXPIRES_IN));
        const refreshToken = await (0, utils_1.signToken)(utils_1.jwtType.REFRESH, { id: user.id }, parseInt(server_1.env.JWT_REFRESH_TOKEN_EXPIRES_IN));
        return res.status(201).json({ accessToken, refreshToken });
    }
    if (grant_type === "refresh_token") {
        const decodedToken = (0, utils_1.verifyToken)(utils_1.jwtType.REFRESH, body.refreshToken);
        if (!decodedToken)
            return res.status(401).json({ message: "Invalid refresh token" });
        const user = await prisma_1.prisma.user.findFirst({
            where: { id: decodedToken.id },
        });
        if (!user)
            return res.status(404).json({ message: "User doesn't exist" });
        const accessToken = await (0, utils_1.signToken)(utils_1.jwtType.ACCESS, { id: user.id }, 60);
        const refreshToken = await (0, utils_1.signToken)(utils_1.jwtType.REFRESH, { id: user.id }, 120);
        return res.status(201).json({ accessToken, refreshToken });
    }
    return res.status(400).json({ message: "Invalid grant type" });
});
exports.default = auth;
//# sourceMappingURL=auth.js.map