import { FieldType } from "@prisma/client";
import { z } from "zod";
import { commonIdParamSchema } from "../../common/schema";

const fieldType: z.ZodType<FieldType> = z.enum(["text", "number", "json"]);

export const createFieldSchema = z
  .object({
    title: z.string(),
    type: fieldType,
  })
  .merge(commonIdParamSchema);
