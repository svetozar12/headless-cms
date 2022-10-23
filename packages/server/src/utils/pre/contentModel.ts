import { prisma } from "../prisma";
import { Request, Response, NextFunction } from "express";
import { zParse } from "../zParse";
import { commonUserSchema } from "../../common/schema";
import { CustomError } from "../../common/errorModel";

const contentModel = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<ReturnType<typeof prisma.contentModel.findFirst>> => {
  const {
    user: { id },
  } = await zParse(commonUserSchema, req);

  const model = await prisma.contentModel.findFirst({
    where: { userId: id },
  });
  if (!model) next(CustomError.notFound("You don't have content models !"));
  return model;
};

export default contentModel;
