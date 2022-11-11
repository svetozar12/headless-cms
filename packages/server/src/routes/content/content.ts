import { NextFunction, Router } from "express";
import { zMiddleware, zParse } from "../../utils/zParse";
import { createContentSchema, deleteContentSchema } from "./content.schema";
import { prisma } from "../../utils/prisma";
import isAuth from "../../middlewares/isAuth";
import { jwtType } from "../auth/utils";
import { commonIdParamSchema, commonUserSchema } from "../../common/schema";
import { preResource, Resource } from "../../utils/pre/preMiddleware";
import logger from "../../utils/logger";

const content = Router();

content.get(
  "/",
  isAuth(jwtType.ACCESS),
  zMiddleware(commonUserSchema),
  preResource([Resource.User, Resource.ContentModel]),
  async (req, res, next: NextFunction) => {
    const { model } = req.pre;
    const { id } = model;
    const content = await prisma.content.findMany({
      where: { contentModelId: id },
    });

    return res.status(200).json({ content });
  }
);

content.get(
  "/:id",
  isAuth(jwtType.ACCESS),
  zMiddleware(commonUserSchema.merge(commonIdParamSchema)),
  preResource([Resource.ContentModel]),
  async (req, res, next: NextFunction) => {
    const {
      params: { id },
    } = await zParse(commonIdParamSchema, req);
    const { model } = req.pre;
    const content = await prisma.content.findMany({
      where: { id, contentModelId: model!.id },
    });

    return res.status(200).json({ content });
  }
);

content.post(
  "/",
  isAuth(jwtType.ACCESS),
  zMiddleware(createContentSchema),
  preResource([Resource.ContentModel]),
  async (req, res, next) => {
    const { user, body } = await zParse(createContentSchema, req);
    const { model } = req.pre;

    const content = await prisma.content.create({
      data: {
        ...body,
        contentModelId: model.id,
      },
    });

    return res.status(201).json({ content });
  }
);

content.delete(
  "/:id",
  isAuth(jwtType.ACCESS),
  zMiddleware(commonUserSchema.merge(commonIdParamSchema)),
  preResource([Resource.Content]),
  async (req, res, next: NextFunction) => {
    const { body } = await zParse(deleteContentSchema, req);
    const { content } = req.pre;
    const { id } = content;

    await prisma.content.delete({
      where: { id } as any,
    });

    return res.status(204).send();
  }
);

export default content;
