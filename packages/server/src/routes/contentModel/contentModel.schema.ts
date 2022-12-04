import { z } from "zod";
import { commonUserSchema, parseBoolean } from "../../common/schema";

const contentModelSchema = z
  .object({
    body: z.object({
      title: z.string().optional(),
      text: z.boolean().optional(),
      number: z.boolean().optional(),
      json: z.boolean().optional(),
    }),
  })
  .merge(commonUserSchema);

export { contentModelSchema };
