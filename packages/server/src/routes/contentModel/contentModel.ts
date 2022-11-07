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
  isAuth(jwtType.ACCESS),
  zMiddleware(commonUserSchema),
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
  isAuth(jwtType.ACCESS),
  zMiddleware(commonIdParamSchema.merge(commonUserSchema)),
  preResource([Resource.User, Resource.ContentModel]),
  async (req, res, next) => {
    const { model } = req.pre;
    return res.json({ contentModel: model });
  }
);

contentModel.post(
  "/",
  isAuth(jwtType.ACCESS),
  zMiddleware(contentModelSchema),
  preResource([Resource.User]),
  async (req, res, next) => {
    const { body } = await zParse(contentModelSchema, req);
    const { id } = req.pre.user;

    const contentModel = await prisma.contentModel.create({
      data: { ...body, userId: id },
    });

    return res.status(201).json({ contentModel });
  }
);

contentModel.delete(
  "/:id",
  isAuth(jwtType.ACCESS),
  zMiddleware(commonIdParamSchema.merge(commonUserSchema)),
  preResource([Resource.User, Resource.ContentModel]),
  async (req, res, next) => {
    const { model } = req.pre;
    await prisma.contentModel.delete({ where: { id: model.id } });

    return res.status(204).send();
  }
);

export default contentModel;
