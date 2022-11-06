import { z } from "zod";
import { commonUserSchema, reqBoolean } from "../../common/schema";
import { stringify } from "ts-jest";

const contentModelSchema = z
  .object({
    body: z.object({
      text: reqBoolean,
      number: reqBoolean,
      json: reqBoolean,
    }),
  })
  .merge(commonUserSchema);

export { contentModelSchema };
