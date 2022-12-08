import { FIeld, FieldType } from "@prisma/client";
import { CustomError } from "../common/errorModel";

export const checkContentTypes = (field: FIeld) => {
  if (field.type !== FieldType[field.type])
    return CustomError.badRequest("Incorrect field type");
};
