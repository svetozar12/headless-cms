import { FieldTypeEnum } from "@prisma/client";
import { z, ZodType } from "zod";
import logger from "../utils/logger";

const parseBoolean = z
  .string()
  .transform((val) => val === "true")
  .optional();

const commonUserSchema = z.object({
  user: z.object({
    id: z.number(),
  }),
});

const commonIdParamSchema = z.object({
  params: z.object({
    id: z.string().transform((val) => parseInt(val)),
  }),
});

const parseStringToInt = z.preprocess((val) => {
  if (typeof val === "string") return parseInt(val, 10);
  return val;
}, z.number().min(1));

const parseJson = z.string().transform((val) => {
  logger([val, typeof JSON.parse(val), "dormak"]);
  return JSON.parse(val);
});

const paginationSchema = z.object({
  query: z.object({
    page: parseStringToInt.default(1),
    pageSize: parseStringToInt.default(10),
  }),
});

const fieldType: ZodType<FieldTypeEnum> = z.enum(["json", "text", "number"]);

export {
  fieldType,
  parseBoolean,
  parseJson,
  parseStringToInt,
  paginationSchema,
  commonUserSchema,
  commonIdParamSchema,
};
