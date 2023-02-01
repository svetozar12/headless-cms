// https://transform.tools/typescript-to-zod use api.ts file to generate the zod file(only manually supported for now)

import { z } from "zod";

export const contentBodySchema = z.object({
  modelId: z.number(),
  name: z.string(),
  userId: z.string(),
});

export const contentmodelBodySchema = z.object({
  description: z.string().optional(),
  name: z.string(),
  userId: z.string(),
});

export const fieldBodySchema = z.object({
  contentId: z.number(),
  name: z.string(),
  typeId: z.number(),
  value: z.string().optional(),
});

export const fieldtypeBodySchema = z.object({
  contentModelId: z.number(),
  fieldType: z.string().optional(),
  name: z.string(),
});

export const gormDeletedAtSchema = z.object({
  time: z.string().optional(),
  valid: z.boolean().optional(),
});

export const modelsPaginationSchema = z.object({
  limit: z.number(),
  offSet: z.number(),
  total: z.number(),
});

export const fieldFieldSchema = z.object({
  contentId: z.number(),
  createdAt: z.string().optional(),
  deletedAt: gormDeletedAtSchema.optional(),
  id: z.number(),
  name: z.string(),
  typeId: z.number(),
  updatedAt: z.string().optional(),
  value: z.string().optional(),
});

export const fieldtypeFieldTypeSchema = z.object({
  contentModelId: z.number(),
  createdAt: z.string().optional(),
  deletedAt: gormDeletedAtSchema.optional(),
  fieldType: z.string().optional(),
  id: z.number(),
  name: z.string(),
  updatedAt: z.string().optional(),
});

export const modelsPaginationModelArrayFieldFieldSchema = z.object({
  data: z.array(fieldFieldSchema),
  pagination: modelsPaginationSchema,
});

export const modelsPaginationModelArrayFieldtypeFieldTypeSchema = z.object({
  data: z.array(fieldtypeFieldTypeSchema),
  pagination: modelsPaginationSchema,
});

export const contentmodelContentModelSchema = z.object({
  createdAt: z.string().optional(),
  deletedAt: gormDeletedAtSchema.optional(),
  description: z.string().optional(),
  fieldTypes: z.array(fieldtypeFieldTypeSchema),
  id: z.number(),
  name: z.string(),
  updatedAt: z.string().optional(),
  userId: z.string(),
});

export const modelsPaginationModelArrayContentmodelContentModelSchema = z.object(
  {
    data: z.array(contentmodelContentModelSchema),
    pagination: modelsPaginationSchema,
  },
);

export const contentContentSchema = z.object({
  contentModel: contentmodelContentModelSchema,
  createdAt: z.string().optional(),
  deletedAt: gormDeletedAtSchema.optional(),
  id: z.number(),
  modelId: z.number(),
  name: z.string(),
  updatedAt: z.string().optional(),
  userId: z.string(),
});

export const modelsPaginationModelArrayContentContentSchema = z.object({
  data: z.array(contentContentSchema),
  pagination: modelsPaginationSchema,
});
