import { Router } from "express";
import { userSchema } from "./schema";
import { zMiddleware, zParse } from "../../utils/zParse";
import isAuth from "../../middlewares/isAuth";
import { jwtType, signToken } from "../auth/utils";
import { commonUserSchema } from "../../common/schema";
import { prisma } from "../../utils/prisma";
import { env } from "../../env/server";
import { preResource, Resource } from "../../utils/pre/preMiddleware";

const user = Router();

user.get(
  "/me",
  isAuth(jwtType.ACCESS),
  zMiddleware(commonUserSchema),
  preResource([Resource.User]),
  async (req, res, next) => {
    const { user } = req.pre;
    return res.status(200).json(user);
  }
);

user.post("/", zMiddleware(userSchema), async (req, res, next) => {
  const {
    body: { username, password },
  } = await zParse(userSchema, req);
  const isUserExist = await prisma.user.findFirst({
    where: { username },
  });
  if (isUserExist)
    return res.status(409).json({ message: "User already exist" });

  const user = await prisma.user.create({ data: { username, password } });
  const accessToken = await signToken(
    jwtType.ACCESS,
    { id: user.id, username },
    parseInt(env.JWT_ACCESS_TOKEN_EXPIRES_IN)
  );

  const refreshToken = await signToken(
    jwtType.REFRESH,
    { id: user.id, username },
    parseInt(env.JWT_REFRESH_TOKEN_EXPIRES_IN)
  );
  const { password: _, ...userObj } = user;
  return res.status(201).json({ user: userObj, accessToken, refreshToken });
});

user.delete(
  "/me",
  isAuth(jwtType.ACCESS),
  zMiddleware(commonUserSchema),
  preResource([Resource.User]),
  async (req, res, next) => {
    const { user } = req.pre;
    const { id } = user;
    await prisma.user.delete({ where: { id } });
    return res.status(204).send();
  }
);

export default user;
