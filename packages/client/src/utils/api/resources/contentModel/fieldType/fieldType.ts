import { FieldTypeEnum, FieldType } from "@headless-cms/server";
import { makeRequest } from "../../../apiUtil";

const fieldType = {
  getList: (modelId: string) =>
    makeRequest<FieldType>(
      "get",
      `/contentModel/${modelId}/fieldType`,
      "fieldTypes"
    ),
  create: (title: string, type: FieldTypeEnum, modelId: string) =>
    makeRequest<FieldType>(
      "post",
      `/contentModel/${modelId}/fieldType`,
      "fieldType",
      { title, type }
    ),
  update: (id: string, title: string, modelId: string) =>
    makeRequest<FieldType>(
      "put",
      `/contentModel/${modelId}/fieldType/${id}`,
      "fieldType",
      { title }
    ),
  delete: (id: string, modelId: string) =>
    makeRequest<string>(
      "delete",
      `/contentModel/${modelId}/fieldType/${id}`,
      "message"
    ),
};

export { fieldType };
