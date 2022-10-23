import { Router } from "express";
import { userSchema } from "./schema";
import { zMiddleware, zParse } from "../../utils/zParse";
import isAuth from "../../middlewares/isAuth";
import { jwtType } from "../auth/utils";
import { commonUserSchema } from "../../common/schema";
import { prisma } from "../../utils/prisma";
import userMe from "../../utils/pre/user";

const user = Router();

user.get(
  "/me",
  zMiddleware(commonUserSchema),
  isAuth(jwtType.ACCESS),
  async (req, res, next) => {
    const user = userMe(req, res, next);
    return res.status(200).json(user);
  }
);

user.post("/", zMiddleware(userSchema), async (req, res, next) => {
  const { body } = await zParse(userSchema, req);
  const isUserExist = await prisma.user.findFirst({ where: body });
  if (isUserExist)
    return res.status(409).json({ message: "User already exist" });
  console.log(req.body);
  const user = await prisma.user.create({ data: body });
  return res.status(201).json(user);
});

user.delete(
  "/me",
  zMiddleware(commonUserSchema),
  isAuth(jwtType.ACCESS),
  async (req, res, next) => {
    const {
      user: { id },
    } = await zParse(commonUserSchema, req);
    const user = await prisma.user.findFirst({ where: { id } });

    if (!user) return res.status(404).json({ message: "User doesn't exist" });
    await prisma.user.delete({ where: { id: user.id } });
    return res.status(204);
  }
);

export default user;
