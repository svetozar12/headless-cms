import { z } from "zod";
import {
  commonIdParamSchema,
  fieldType,
  parseStringToInt,
} from "../../../common/schema";
export const getFieldType = z.object({
  params: z.object({
    contentModelId: parseStringToInt,
  }),
});
export const createFieldType = z.object({
  body: z.object({
    title: z.string(),
    type: fieldType,
  }),
  params: z.object({
    contentModelId: parseStringToInt,
  }),
});

export const updateFieldType = z.object({
  body: z.object({
    title: z.string().optional(),
  }),
  params: z.object({
    contentModelId: parseStringToInt,
    id: parseStringToInt,
  }),
});

export const deleteFieldType = z.object({
  params: z.object({
    contentModelId: parseStringToInt,
    id: parseStringToInt,
  }),
});
