import { FieldType, FieldTypeEnum } from "@prisma/client";
import { z, ZodType } from "zod";
import {
  commonIdParamSchema,
  fieldType,
  parseStringToInt,
} from "../../../common/schema";

export const createFieldType = z.object({
  body: z.object({
    title: z.string(),
    type: fieldType,
    modelId: parseStringToInt,
  }),
});

export const updateFieldType = z
  .object({
    body: z.object({
      modelId: parseStringToInt,
      title: z.string().optional(),
    }),
  })
  .merge(commonIdParamSchema)
  .merge(commonIdParamSchema);

export const deleteFieldType = z
  .object({
    body: z.object({
      modelId: parseStringToInt,
    }),
  })
  .merge(commonIdParamSchema);
