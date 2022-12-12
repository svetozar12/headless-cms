import { FieldType, FieldTypeEnum } from "@prisma/client";
import { z } from "zod";
import { parseStringToInt } from "../../../common/schema";

export const updateFieldList = z.object({
  body: z.object({
    contentId: parseStringToInt,
    fields: z.array(
      z.object({ id: parseStringToInt, value: z.any().optional() })
    ),
  }),
});
