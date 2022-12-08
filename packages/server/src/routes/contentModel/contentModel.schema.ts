import { FieldType } from "@prisma/client";
import { z, ZodType } from "zod";
import { commonUserSchema, parseBoolean } from "../../common/schema";

const contentModelSchema = z
  .object({
    body: z.object({
      title: z.string(),
      text: z.boolean().optional(),
      number: z.boolean().optional(),
      json: z.boolean().optional(),
    }),
  })
  .merge(commonUserSchema);

const updateContentModelSchema = z
  .object({
    body: z.object({
      title: z.string().optional(),
      text: z.boolean().optional(),
      number: z.boolean().optional(),
      json: z.boolean().optional(),
    }),
  })
  .merge(commonUserSchema);

const fieldType: ZodType<FieldType> = z.enum(["json", "text", "number"]);

const addField = z.object({
  type: fieldType,
  value: z.any(),
});

export { contentModelSchema, updateContentModelSchema, addField };
