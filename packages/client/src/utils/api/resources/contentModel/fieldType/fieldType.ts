import { FieldTypeEnum, FieldType } from "@headless-cms/server";
import { makeRequest, Method } from "../../../apiUtil";

const fieldType = {
  getList: (modelId: string, token: string) =>
    makeRequest<FieldType>(
      Method.POST,
      `/contentModel/${modelId}/fieldType`,
      "fieldTypes",
      token
    ),
  create: (
    title: string,
    type: FieldTypeEnum,
    modelId: string,
    token: string
  ) =>
    makeRequest<FieldType>(
      Method.POST,
      `/contentModel/${modelId}/fieldType`,
      "fieldType",
      { title, type },
      token
    ),
  update: (id: string, title: string, modelId: string, token: string) =>
    makeRequest<FieldType>(
      Method.POST,
      `/contentModel/${modelId}/fieldType/${id}`,
      "fieldType",
      { title },
      token
    ),
  delete: (id: string, modelId: string, token: string) =>
    makeRequest<string>(
      Method.POST,
      `/contentModel/${modelId}/fieldType/${id}`,
      "message",
      token
    ),
};

export { fieldType };
