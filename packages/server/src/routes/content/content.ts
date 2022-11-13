import { NextFunction, Router } from "express";
import { zMiddleware, zParse } from "../../utils/zParse";
import {
  createContentSchema,
  deleteContentSchema,
  updateContentSchema,
} from "./content.schema";
import { prisma } from "../../utils/prisma";
import isAuth from "../../middlewares/isAuth";
import { jwtType } from "../auth/utils";
import { commonIdParamSchema, commonUserSchema } from "../../common/schema";
import { preResource, Resource } from "../../utils/pre/preMiddleware";
import logger from "../../utils/logger";
import { checkContentTypes } from "../../middlewares/checkContentTypes";

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
  checkContentTypes(),
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
  checkContentTypes(),
  async (req, res, next) => {
    const {
      body: { text, json, number },
    } = await zParse(updateContentSchema, req);
    const {
      content: { id, text: preText, json: preJson, number: preNumber },
    } = req.pre;
    const updatesReq =
      !!text ||
      !!json ||
      !!number ||
      text !== preText ||
      number !== preNumber ||
      JSON.stringify(json) !== JSON.stringify(preJson);
    logger([!!!json, "hambunda"]);
    if (!updatesReq)
      return res.status(409).json({ message: "Content wasn't updated" });
    const updateContent = await prisma.content.update({
      where: {
        id,
      },
      data: {
        text: text || preText,
        number: number || preNumber,
        json: json || preJson,
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
