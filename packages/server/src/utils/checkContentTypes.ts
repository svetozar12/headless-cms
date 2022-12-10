import { FieldType, FieldTypeEnum } from "@prisma/client";
import { CustomError } from "../common/errorModel";

export const checkContentTypes = (field: FieldType) => {
  if (field.type !== FieldTypeEnum[field.type])
    return CustomError.badRequest("Incorrect field type");
};
