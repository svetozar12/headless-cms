import { z } from "zod";
import { commonIdParamSchema, commonUserSchema } from "../../common/schema";

const createModelSchema = z
  .object({
    body: z.object({
      title: z.string(),
    }),
  })
  .merge(commonUserSchema);

const updateContentModelSchema = z
  .object({
    body: z.object({
      title: z.string().optional(),
    }),
  })
  .merge(commonUserSchema)
  .merge(commonIdParamSchema);

export { createModelSchema, updateContentModelSchema };
