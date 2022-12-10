import { NextFunction, Router } from "express";
import {
  commonIdParamSchema,
  commonUserSchema,
  paginationSchema,
} from "../../common/schema";
import { checkContentTypes } from "../../utils/checkContentTypes";
import isAuth from "../../middlewares/isAuth";
import { preResource, Resource } from "../../utils/pre/preMiddleware";
import { prisma, Content } from "../../utils/prisma";
import { withPagination } from "../../utils/withPagination";
import { zMiddleware, zParse } from "../../utils/zParse";
import { jwtType } from "../auth/utils";
import {
  createContentSchema,
  deleteContentSchema,
  updateContentSchema,
} from "./content.schema";

const content = Router();

content.get(
  "/",
  isAuth(jwtType.ACCESS),
  zMiddleware(commonUserSchema),
  preResource([Resource.User, Resource.ContentModel]),
  async (req, res, next: NextFunction) => {
    const {
      query: { page, pageSize },
    } = await zParse(paginationSchema, req);

    const { model } = req.pre;
    const { id } = model;
    const totalContent = await prisma.content.count();
    const content = await prisma.content.findMany({
      where: { contentModelId: id },
      ...withPagination(page, pageSize),
    });

    return res
      .status(200)
      .json({ content, pagination: { page, pageSize, total: totalContent } });
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
    const { body } = await zParse(createContentSchema, req);
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

content.put(
  "/",
  isAuth(jwtType.ACCESS),
  zMiddleware(updateContentSchema),
  preResource([Resource.Content]),
  async (req, res, next) => {
    const {
      body: { title },
    } = await zParse(updateContentSchema, req);
    const {
      content: { id, title: preTitle },
    } = req.pre;

    const updateContent = await prisma.content.update({
      where: {
        id,
      },
      data: {
        title: title || preTitle,
      },
    });
    return res.status(201).json({ content: updateContent });
  }
);

content.delete(
  "/:id",
  isAuth(jwtType.ACCESS),
  zMiddleware(commonUserSchema.merge(commonIdParamSchema)),
  preResource([Resource.Content]),
  async (req, res) => {
    const { content } = req.pre;
    const { id } = content;

    await prisma.content.delete({
      where: { id },
    });

    return res.status(204).send();
  }
);

export default content;
