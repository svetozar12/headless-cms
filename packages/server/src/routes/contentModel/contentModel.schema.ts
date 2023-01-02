import { z } from "zod";
import {
  commonIdParamSchema,
  commonUserSchema,
  paginationSchema,
} from "../../common/schema";

export const getModelSchema = commonUserSchema.merge(commonIdParamSchema);

export const getAllModelSchema = commonUserSchema.merge(paginationSchema);

export const createModelSchema = z
  .object({
    body: z.object({
      title: z.string(),
    }),
  })
  .merge(commonUserSchema);

export const updateContentModelSchema = z
  .object({
    body: z.object({
      title: z.string().optional(),
    }),
  })
  .merge(commonUserSchema)
  .merge(commonIdParamSchema);
