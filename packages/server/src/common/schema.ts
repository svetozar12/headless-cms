import { z } from "zod";
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

const parseStringToInt = z.string().transform((val) => parseInt(val));

const parseJson = z.string().transform((val) => {
  logger([val, typeof JSON.parse(val), "dormak"]);
  return JSON.parse(val);
});

export {
  parseBoolean,
  parseJson,
  parseStringToInt,
  commonUserSchema,
  commonIdParamSchema,
};
