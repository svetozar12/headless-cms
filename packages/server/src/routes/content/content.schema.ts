import { z } from "zod";
import { commonUserSchema } from "../../common/schema";

const createContentSchema = z
  .object({
    body: z.object({
      contentModelId: z.number(),
      text: z.string().optional(),
      json: z.object({}).optional(),
      number: z.number().optional(),
    }),
  })
  .merge(commonUserSchema);

export { createContentSchema };
