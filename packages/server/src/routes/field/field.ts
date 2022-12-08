import { Router } from "express";
import { prisma } from "../../utils/prisma";
import { zMiddleware, zParse } from "../../utils/zParse";
import { createFieldSchema } from "./field.schema";

const field = Router();
const { post, put } = field;

post("/:id", zMiddleware(createFieldSchema), async (req, res) => {
  const {
    params: { id: contentModelId },
    title,
    type,
  } = await zParse(createFieldSchema, req);
  const field = await prisma.fIeld.create({
    data: { contentModelId, title, type },
  });

  res.status(201).json({ field });
});

put("/:id", zMiddleware(createFieldSchema), async (req, res) => {
  const {
    params: { id: contentModelId },
    title,
    type,
  } = await zParse(createFieldSchema, req);
  const field = await prisma.fIeld.create({
    data: { contentModelId, title, type },
  });

  res.status(201).json({ field });
});

export { field };
