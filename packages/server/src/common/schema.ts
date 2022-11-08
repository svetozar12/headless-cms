import { z } from "zod";

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

const parseJson = z.string().transform((val) => JSON.parse(val));

export {
  parseBoolean,
  parseJson,
  parseStringToInt,
  commonUserSchema,
  commonIdParamSchema,
};
