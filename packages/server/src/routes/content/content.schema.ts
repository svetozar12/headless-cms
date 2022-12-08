import { FieldType } from "@prisma/client";
import { z } from "zod";
import { commonUserSchema, parseStringToInt } from "../../common/schema";

export const createContentSchema = z
  .object({
    body: z.object({
      title: z.string(),
      contentModelId: parseStringToInt,
    }),
  })
  .merge(commonUserSchema);

export const updateContentSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    contentModelId: parseStringToInt,
  }),
});

export const deleteContentSchema = z.object({
  body: z.object({
    contentModelId: parseStringToInt,
  }),
});
