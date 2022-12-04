import { Router } from "express";
import {
  commonIdParamSchema,
  commonUserSchema,
  paginationSchema,
} from "../../common/schema";
import isAuth from "../../middlewares/isAuth";
import logger from "../../utils/logger";
import { preResource, Resource } from "../../utils/pre/preMiddleware";
import { prisma } from "../../utils/prisma";
import { withPagination } from "../../utils/withPagination";
import { zMiddleware, zParse } from "../../utils/zParse";
import { jwtType } from "../auth/utils";
import {
  contentModelSchema,
  updateContentModelSchema,
} from "./contentModel.schema";

const contentModel = Router();

contentModel.get(
  "/",
  isAuth(jwtType.ACCESS),
  zMiddleware(commonUserSchema),
  async (req, res, next) => {
    const {
      user: { id },
      query: { page, pageSize },
    } = await zParse(commonUserSchema.merge(paginationSchema), req);
    const totalContentModels = await prisma.contentModel.count();
    const contentModel = await prisma.contentModel.findMany({
      where: { userId: id },
      ...withPagination(page, pageSize),
    });

    if (contentModel.length === 0)
      return res
        .status(404)
        .json({ message: "You don't have content models !" });

    return res.json({
      contentModel: contentModel,
      pagination: { page, pageSize, total: totalContentModels },
    });
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

contentModel.put(
  "/:id",
  isAuth(jwtType.ACCESS),
  zMiddleware(
    commonIdParamSchema.merge(commonUserSchema).merge(updateContentModelSchema)
  ),
  preResource([Resource.User, Resource.ContentModel]),
  async (req, res, next) => {
    const {
      body: { title, text, json, number },
    } = await zParse(updateContentModelSchema, req);
    const {
      model: {
        id,
        title: preTitle,
        text: preText,
        json: preJson,
        number: preNumber,
      },
    } = req.pre;

    const updateContent = await prisma.contentModel.update({
      where: {
        id,
      },
      data: {
        title: title || preTitle,
        text: text || preText,
        number: number || preNumber,
        json: json || preJson,
      },
    });
    return res.status(201).json({ content: updateContent });
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
      // @ts-ignore
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
