import { Request, Response, NextFunction } from "express";
import { createContentSchema } from "../routes/content/content.schema";
import { zParse } from "../utils/zParse";

export const checkContentTypes = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { model, content } = req.pre;
    const {
      body: { json, text, number },
    } = await zParse(createContentSchema, req);
    if (json && model.json !== true)
      return res
        .status(400)
        .json({ message: "json isn't allowed for this content model" });
    if (text && model.text !== true)
      return res
        .status(400)
        .json({ message: "text isn't allowed for this content model" });
    if (number && model.number !== true)
      return res
        .status(400)
        .json({ message: "number isn't allowed for this content model" });
    next();
  };
};
