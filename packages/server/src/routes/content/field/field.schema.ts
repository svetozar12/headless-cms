import { FieldType, FieldTypeEnum } from "@prisma/client";
import { z } from "zod";
import { parseStringToInt } from "../../../common/schema";

export const updateFieldList = z.object({
  body: z.object({
    fields: z.array(
      z.object({ id: parseStringToInt, value: z.any().optional() })
    ),
  }),
  params: z.object({
    contentId: parseStringToInt,
  }),
});
