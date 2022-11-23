import { z } from "zod";
import {
  commonUserSchema,
  parseJson,
  parseStringToInt,
} from "../../common/schema";

const createContentSchema = z
  .object({
    body: z.object({
      contentModelId: parseStringToInt,
      title: z.string(),
      text: z.string().optional(),
      json: parseJson.optional(),
      number: parseStringToInt.optional(),
    }),
  })
  .merge(commonUserSchema);

const updateContentSchema = z.object({
  body: z.object({
    contentModelId: parseStringToInt,
    title: z.string().optional(),
    text: z.string().optional(),
    json: parseJson.optional(),
    number: parseStringToInt.optional(),
  }),
});

const deleteContentSchema = z.object({
  body: z.object({
    contentModelId: parseStringToInt,
  }),
});

export { createContentSchema, updateContentSchema, deleteContentSchema };
