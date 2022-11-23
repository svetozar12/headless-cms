import { z } from "zod";
import { commonUserSchema, parseBoolean } from "../../common/schema";

const contentModelSchema = z
  .object({
    body: z.object({
      title: z.string(),
      text: parseBoolean,
      number: parseBoolean,
      json: parseBoolean,
    }),
  })
  .merge(commonUserSchema);

export { contentModelSchema };
