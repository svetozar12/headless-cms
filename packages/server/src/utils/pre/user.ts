import { zParse } from "../zParse";
import { commonUserSchema } from "../../common/schema";
import { prisma } from "../prisma";
import { Request } from "express";
import { CustomError } from "../../common/errorModel";
import logger from "../logger";

const userMe = async (
  req: Request,
  returnPassword?: boolean,
): Promise<void> => {
  const {
    user: { id },
  } = await zParse(commonUserSchema, req);

  const user = await prisma.user.findFirst({ where: { id } });
  // @ts-ignore
  if (!user) return CustomError.notFound("User doesn't exist");

  const { password, ...userObj } = user;
  logger([userObj, "userObjdawawawawawawawawawawawawaw", req.pre]);
  req.pre.user = userObj;
  logger([req.pre, "req.pre.userdwaaaaaaaaaaaaaaa"]);
  return;
};

export default userMe;
