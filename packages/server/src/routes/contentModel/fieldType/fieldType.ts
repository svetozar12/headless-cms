import { Router } from "express";
import { commonIdParamSchema } from "../../../common/schema";
import isAuth from "../../../middlewares/isAuth";
import { prisma } from "../../../utils/prisma";
import { zMiddleware, zParse } from "../../../utils/zParse";
import { jwtType } from "../../auth/utils";
import {
  createFieldType,
  deleteFieldType,
  getFieldType,
  updateFieldType,
} from "./fieldType.schema";

const fieldType = Router();

fieldType.get(
  "/",
  isAuth(jwtType.ACCESS),
  zMiddleware(getFieldType),
  async (req, res) => {
    const {
      params: { contentModelId },
    } = await zParse(getFieldType, req);
    const fieldTypes = await prisma.fieldType.findMany({
      where: { contentModelId },
    });
    return res.status(201).json({ fieldTypes });
  }
);

fieldType.post(
  "/",
  isAuth(jwtType.ACCESS),
  zMiddleware(createFieldType),
  async (req, res) => {
    const {
      body: { title, type },
      params: { contentModelId },
    } = await zParse(createFieldType, req);
    const fieldType = await prisma.fieldType.create({
      data: { title, type, contentModelId },
    });
    // await prisma.contentModel.update({where:{id}})
    return res.status(201).json({ fieldType });
  }
);

fieldType.put(
  "/:id",
  isAuth(jwtType.ACCESS),
  zMiddleware(updateFieldType),
  async (req, res) => {
    const {
      body: { title },
      params: { contentModelId, id },
    } = await zParse(updateFieldType, req);
    const fieldType = await prisma.fieldType.update({
      where: { id, contentModelId },
      data: { title },
    });
    return res.status(201).json({ fieldType });
  }
);

fieldType.delete(
  "/:id",
  isAuth(jwtType.ACCESS),
  zMiddleware(deleteFieldType),
  async (req, res) => {
    const {
      params: { id, contentModelId },
    } = await zParse(deleteFieldType, req);
    await prisma.fieldType.delete({
      where: { id, contentModelId },
    });
    return res.status(204).json({ message: "Field was deleted" });
  }
);

export default fieldType;
