import { jwtType, signToken, verifyToken } from "./utils";
import { Router } from "express";
import { authSchema } from "./schema";
import { zMiddleware, zParse } from "../../utils/zParse";
import { prisma } from "../../utils/prisma";

const auth = Router();

auth.post("/", zMiddleware(authSchema), async (req, res) => {
  const {
    body: { grant_type },
  } = await zParse(authSchema, req);
  if (grant_type === "password") {
    const { body } = await zParse(authSchema, req);
    const { grant_type, ...userObj } = body;
    const user = await prisma.user.findFirst({ where: userObj });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    const accessToken = await signToken(jwtType.ACCESS, { id: user.id }, 60);
    const refreshToken = await signToken(jwtType.REFRESH, { id: user.id }, 120);
    return res.status(201).json({ accessToken, refreshToken });
  }
  if (grant_type === "refresh_token") {
    const { body } = await zParse(authSchema, req);
    const decodedToken = verifyToken(
      jwtType.REFRESH,
      body.refreshToken as string
    ) as typeof req.user;

    if (!decodedToken)
      return res.status(401).json({ message: "Invalid refresh token" });
    const user = await prisma.user.findFirst({
      where: { id: decodedToken.id },
    });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    const accessToken = await signToken(jwtType.ACCESS, { id: user.id }, 60);
    const refreshToken = await signToken(jwtType.REFRESH, { id: user.id }, 120);

    return res.status(201).json({ accessToken, refreshToken });
  }
  return res.status(400).json({ message: "Invalid grant type" });
});

export default auth;
