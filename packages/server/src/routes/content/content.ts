import { Router } from "express";

import isAuth from "../../middlewares/isAuth";
import { prisma } from "../../utils/prisma";
import { withPagination } from "../../utils/withPagination";
import { zMiddleware, zParse } from "../../utils/zParse";
import { jwtType } from "../auth/utils";
import {
  createContentSchema,
  deleteContentSchema,
  getContentListSchema,
  getContentSchema,
  updateContentSchema,
} from "./content.schema";
import field from "./field";

const content = Router();
// nested routes
content.use("/field", field);
// current level routes
content.get(
  "/",
  isAuth(jwtType.ACCESS),
  zMiddleware(getContentListSchema),
  async (req, res) => {
    const {
      query: { page, pageSize },
      body: { contentModelId },
      user: { id: userId },
    } = await zParse(getContentListSchema, req);

    const totalContent = await prisma.content.count();
    const content = await prisma.content.findMany({
      where: { contentModelId, userId },
      include: { FIeld: true },
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
  zMiddleware(getContentSchema),
  async (req, res) => {
    const {
      params: { id },
      body: { contentModelId },
      user: { id: userId },
    } = await zParse(getContentSchema, req);
    const content = await prisma.content.findMany({
      where: { id, contentModelId, userId },
    });

    return res.status(200).json({ content });
  }
);

content.post(
  "/",
  isAuth(jwtType.ACCESS),
  zMiddleware(createContentSchema),
  async (req, res) => {
    const {
      body: { title, contentModelId },
      user: { id: userId },
    } = await zParse(createContentSchema, req);

    const content = await prisma.content.create({
      data: {
        title,
        contentModelId,
        userId,
      },
    });

    const fieldTypes = await prisma.fieldType.findMany({
      where: { id: contentModelId },
    });
    const { id: contentId } = content;
    for (const { id: fieldTypeId, title } of fieldTypes) {
      await prisma.fIeld.create({
        data: { fieldTypeId, contentId, title },
      });
    }

    return res.status(201).json({ content });
  }
);

content.put(
  "/:id",
  isAuth(jwtType.ACCESS),
  zMiddleware(updateContentSchema),
  async (req, res) => {
    const {
      body: { title, contentModelId },
      params: { id },
      user,
    } = await zParse(updateContentSchema, req);

    const updateContent = await prisma.content.update({
      where: {
        id,
        userId: user.id,
        contentModelId,
      },
      data: {
        title: title,
      },
    });
    return res.status(201).json({ content: updateContent });
  }
);

content.delete(
  "/:id",
  isAuth(jwtType.ACCESS),
  zMiddleware(deleteContentSchema),
  async (req, res) => {
    const {
      body: { contentModelId },
      params: { id },
      user: { id: userId },
    } = await zParse(deleteContentSchema, req);

    await prisma.content.delete({
      where: { id, contentModelId, userId },
    });

    return res.status(204).send();
  }
);

export default content;
