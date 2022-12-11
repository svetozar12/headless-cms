import { z } from "zod";
import {
  commonIdParamSchema,
  commonUserSchema,
  paginationSchema,
  parseStringToInt,
} from "../../common/schema";

export const getContentSchema = z
  .object({
    body: z.object({
      contentModelId: parseStringToInt,
    }),
  })
  .merge(commonUserSchema)
  .merge(commonIdParamSchema);

export const getContentListSchema = z
  .object({
    body: z.object({
      contentModelId: parseStringToInt,
    }),
  })
  .merge(commonUserSchema)
  .merge(paginationSchema);
export const createContentSchema = z
  .object({
    body: z.object({
      title: z.string(),
      contentModelId: parseStringToInt,
    }),
  })
  .merge(commonUserSchema);

export const updateContentSchema = z
  .object({
    body: z.object({
      title: z.string().optional(),
      contentModelId: parseStringToInt,
    }),
  })
  .merge(commonIdParamSchema)
  .merge(commonUserSchema);

export const deleteContentSchema = getContentSchema;
