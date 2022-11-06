import { z } from "zod";
import { stringify } from "ts-jest";

const reqBoolean = z
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
    id: z.number(),
  }),
});

export { reqBoolean, commonUserSchema, commonIdParamSchema };
