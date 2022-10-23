import { NextFunction, Router } from "express";
import { zMiddleware, zParse } from "../../utils/zParse";
import { createContentSchema } from "./content.schema";
import { prisma } from "../../utils/prisma";
import isAuth from "../../middlewares/isAuth";
import { jwtType } from "../auth/utils";
import contentModel from "../../utils/pre/contentModel";
import { commonIdParamSchema, commonUserSchema } from "../../common/schema";

const content = Router();

content.get(
  "/",
  zMiddleware(commonUserSchema),
  isAuth(jwtType.ACCESS),
  async (req, res, next: NextFunction) => {
    const model = await contentModel(req, res, next);
    const content = await prisma.content.findMany({
      where: { contentModelId: model!.id },
    });

    return res.status(200).json({ content });
  }
);

content.get(
  "/:id",
  zMiddleware(commonUserSchema.merge(commonIdParamSchema)),
  isAuth(jwtType.ACCESS),
  async (req, res, next: NextFunction) => {
    const {
      params: { id },
    } = await zParse(commonIdParamSchema, req);
    const model = await contentModel(req, res, next);
    const content = await prisma.content.findMany({
      where: { id, contentModelId: model!.id },
    });

    return res.status(200).json({ content });
  }
);

content.post(
  "/",
  zMiddleware(createContentSchema),
  isAuth(jwtType.ACCESS),
  async (req, res, next) => {
    const {
      user,
      body,
      body: { contentModelId },
    } = await zParse(createContentSchema, req);
    const model = await prisma.contentModel.findFirst({
      where: { userId: user.id, id: contentModelId },
    });

    if (!model)
      return res
        .status(404)
        .json({ message: "Can't create content without content model" });

    const isDuplicate = await prisma.content.findFirst({
      where: { ...body, contentModelId: model.id },
    });

    if (isDuplicate)
      return res.status(409).json({ message: "Content already exists" });

    const content = await prisma.content.create({
      data: { ...body } as any,
    });

    return res.status(201).json({ content });
  }
);

content.delete(
  "/:id",
  zMiddleware(commonUserSchema.merge(commonIdParamSchema)),
  isAuth(jwtType.ACCESS),
  async (req, res, next: NextFunction) => {
    const {
      params: { id },
    } = await zParse(commonIdParamSchema, req);

    const model = await contentModel(req, res, next);
    const content = await prisma.content.findFirst({
      where: { id, contentModelId: model!.id },
    });

    if (!content) return res.status(404).json({ message: "Content not found" });

    await prisma.content.delete({
      where: { id, contentModelId: model!.id } as any,
    });

    return res.status(204).json({ Message: "Content deleted" });
  }
);

export default content;
