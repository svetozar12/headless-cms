import { Router } from "express";
import isAuth from "../../middlewares/isAuth";
import { jwtType } from "../auth/utils";
import { zMiddleware, zParse } from "../../utils/zParse";
import { commonIdParamSchema, commonUserSchema } from "../../common/schema";
import { contentModelSchema } from "./contentModel.schema";
import { prisma } from "../../utils/prisma";

const contentModel = Router();

contentModel.get(
  "/",
  zMiddleware(commonUserSchema),
  isAuth(jwtType.ACCESS),
  async (req, res, next) => {
    const {
      user: { id },
    } = await zParse(commonUserSchema, req);

    const contentModel = await prisma.contentModel.findMany({
      where: { userId: id },
    });

    if (contentModel.length === 0)
      return res
        .status(404)
        .json({ message: "You don't have content models !" });

    return res.json({ contentModel: contentModel });
  }
);

contentModel.get(
  "/:id",
  zMiddleware(commonIdParamSchema.merge(commonUserSchema)),
  isAuth(jwtType.ACCESS),
  async (req, res, next) => {
    const {
      user: { id },
      params: { id: contentModelId },
    } = await zParse(commonIdParamSchema.merge(commonUserSchema), req);

    const contentModel = await prisma.contentModel.findFirst({
      where: { userId: id, id: contentModelId },
    });

    if (!contentModel)
      return res
        .status(404)
        .json({ message: "You don't have content models !" });

    return res.json({ contentModel });
  }
);

contentModel.post(
  "/",
  zMiddleware(contentModelSchema),
  isAuth(jwtType.ACCESS),
  async (req, res, next) => {
    const {
      user: { id },
      body,
    } = await zParse(contentModelSchema, req);

    const contentModel = await prisma.contentModel.create({
      data: { ...body, userId: id },
    });

    return res.status(201).json({ contentModel });
  }
);

contentModel.delete(
  "/:id",
  zMiddleware(commonIdParamSchema.merge(commonUserSchema)),
  isAuth(jwtType.ACCESS),
  async (req, res, next) => {
    const {
      user: { id },
      params: { id: contentModelId },
    } = await zParse(commonIdParamSchema.merge(commonUserSchema), req);

    const contentModel = await prisma.contentModel.findFirst({
      where: { id: contentModelId, userId: id },
    });

    if (!contentModel)
      return res.status(404).json({ message: "Content model doesn't exist" });

    await prisma.contentModel.delete({ where: { id: contentModel.id } });

    return res.status(204);
  }
);

export default contentModel;
