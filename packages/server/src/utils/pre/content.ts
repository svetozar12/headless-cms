import { prisma } from "../prisma";
import { Request } from "express";
import contentModel from "./contentModel";
import { CustomError } from "../../common/errorModel";

export const preContent = async (req: Request): Promise<void> => {
  await contentModel(req);
  const { model } = req.pre;
  const content = await prisma.content.findFirst({
    where: { contentModelId: model.id },
  });

  //@ts-ignore
  if (!content) return CustomError.notFound("You don't have content !");

  req.pre.content = content;
};
