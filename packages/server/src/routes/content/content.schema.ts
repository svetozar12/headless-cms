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
      text: z.string().optional(),
      json: parseJson.optional(),
      number: parseStringToInt.optional(),
    }),
  })
  .merge(commonUserSchema);

const deleteContentSchema = z.object({
  body: z.object({
    contentModelId: parseStringToInt,
  }),
});

export { createContentSchema, deleteContentSchema };
