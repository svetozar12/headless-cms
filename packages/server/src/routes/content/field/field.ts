import { Router } from "express";
import isAuth from "../../../middlewares/isAuth";
import { FIeld, prisma } from "../../../utils/prisma";
import { zMiddleware, zParse } from "../../../utils/zParse";
import { jwtType } from "../../auth/utils";
import { updateFieldList } from "./field.schema";

const field = Router();

field.put(
  "/:id",
  isAuth(jwtType.ACCESS),
  zMiddleware(updateFieldList),
  async (req, res) => {
    const {
      body: { fields },
      params: { contentId },
    } = await zParse(updateFieldList, req);
    const updatedFields: FIeld[] = [];
    for (const { id, value } of fields) {
      const newField = await prisma.fIeld.update({
        where: { id, contentId },
        data: { value: value || undefined },
      });
      updatedFields.push(newField);
    }
    return res.status(201).json({ updatedFields });
  },
);

export default field;
