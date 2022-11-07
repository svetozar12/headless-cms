import { z } from "zod";

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
    id: z.string().transform((val) => parseInt(val)),
  }),
});

export { reqBoolean, commonUserSchema, commonIdParamSchema };
