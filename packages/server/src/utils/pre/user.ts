import { zParse } from "../zParse";
import { commonUserSchema } from "../../common/schema";
import { prisma } from "../prisma";
import { Request } from "express";
import { CustomError } from "../../common/errorModel";

const userMe = async (req: Request): Promise<void> => {
  const {
    user: { id },
  } = await zParse(commonUserSchema, req);

  const user = await prisma.user.findFirst({ where: { id } });
  // @ts-ignore
  if (!user) return CustomError.notFound("User doesn't exist");

  const { password, ...userObj } = user;
  req.pre.user = userObj;
  return;
};

export default userMe;
