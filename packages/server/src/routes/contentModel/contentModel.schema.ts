import { z } from "zod";
import { commonUserSchema } from "../../common/schema";

const contentModelSchema = z
  .object({
    body: z.object({
      id: z.number(),
      text: z.boolean().optional(),
      number: z.boolean().optional(),
      json: z.boolean().optional(),
    }),
  })
  .merge(commonUserSchema);

export { contentModelSchema };
