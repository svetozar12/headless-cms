import { Router } from "express";
import isAuth from "../../middlewares/isAuth";
import { jwtType } from "../auth/utils";
import { zMiddleware, zParse } from "../../utils/zParse";
import { commonIdParamSchema, commonUserSchema } from "../../common/schema";
import { contentModelSchema } from "./contentModel.schema";
import { prisma } from "../../utils/prisma";
import { preResource, Resource } from "../../utils/pre/preMiddleware";

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
  preResource([Resource.ContentModel]),
  async (req, res, next) => {
    const { model } = req.pre;
    return res.json({ model });
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
  preResource([Resource.ContentModel]),
  async (req, res, next) => {
    const { model } = req.pre;

    await prisma.contentModel.delete({ where: { id: model.id } });

    return res.status(204).send();
  }
);

export default contentModel;
