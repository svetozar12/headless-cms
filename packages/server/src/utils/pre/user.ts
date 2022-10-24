import { zParse } from "../zParse";
import { commonUserSchema } from "../../common/schema";
import { prisma, User } from "../prisma";
import { NextFunction, Request, Response } from "express";

const userMe = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<User> => {
  const {
    user: { id },
  } = await zParse(commonUserSchema, req);

  const user = await prisma.user.findFirst({ where: { id } });
  // @ts-ignore
  if (!user) return res.status(404).json({ message: "User doesn't exist" });
  return user;
};

export default userMe;
