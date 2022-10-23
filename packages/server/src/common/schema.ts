import { z } from "zod";

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

export { commonUserSchema, commonIdParamSchema };
