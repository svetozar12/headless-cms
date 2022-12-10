import { Router } from "express";
import { commonIdParamSchema } from "../../../common/schema";
import isAuth from "../../../middlewares/isAuth";
import { prisma } from "../../../utils/prisma";
import { zMiddleware, zParse } from "../../../utils/zParse";
import { jwtType } from "../../auth/utils";
import {
  createFieldType,
  deleteFieldType,
  updateFieldType,
} from "./fieldType.schema";

const fieldType = Router();

fieldType.get(
  "/:id",
  isAuth(jwtType.ACCESS),
  zMiddleware(commonIdParamSchema),
  async (req, res) => {
    const {
      params: { id: contentModelId },
    } = await zParse(commonIdParamSchema, req);
    const fieldTypes = await prisma.fieldType.findMany({
      where: { contentModelId },
    });
    return res.status(201).json({ fieldTypes });
  },
);

fieldType.post(
  "/",
  isAuth(jwtType.ACCESS),
  zMiddleware(createFieldType),
  async (req, res) => {
    const {
      body: { title, type, modelId: contentModelId },
    } = await zParse(createFieldType, req);
    const fieldType = await prisma.fieldType.create({
      data: { title, type, contentModelId },
    });
    return res.status(201).json({ fieldType });
  },
);

fieldType.put(
  "/:id",
  isAuth(jwtType.ACCESS),
  zMiddleware(updateFieldType),
  async (req, res) => {
    const {
      body: { title, modelId: contentModelId },
      params: { id },
    } = await zParse(updateFieldType, req);
    const fieldType = await prisma.fieldType.update({
      where: { id, contentModelId },
      data: { title },
    });
    return res.status(201).json({ fieldType });
  },
);

fieldType.delete(
  "/:id",
  isAuth(jwtType.ACCESS),
  zMiddleware(deleteFieldType),
  async (req, res) => {
    const {
      params: { id },
      body: { modelId: contentModelId },
    } = await zParse(deleteFieldType, req);
    await prisma.fieldType.delete({
      where: { id, contentModelId },
    });
    return res.status(204).json({ message: "Field was deleted" });
  },
);

export default fieldType;
