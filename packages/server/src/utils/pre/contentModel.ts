import { prisma } from "../prisma";
import { Request } from "express";
import { zParse } from "../zParse";
import { commonIdParamSchema, commonUserSchema } from "../../common/schema";
import { CustomError } from "../../common/errorModel";

const contentModel = async (req: Request): Promise<void> => {
  const {
    user: { id },
    params: { id: modelId },
  } = await zParse(commonUserSchema.merge(commonIdParamSchema), req);

  const model = await prisma.contentModel.findFirst({
    where: { userId: id, id: modelId },
  });

  //@ts-ignore
  if (!model) return CustomError.notFound("You don't have content models !");
  req.pre.model = model;
};

export default contentModel;
