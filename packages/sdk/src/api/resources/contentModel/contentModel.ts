import { ContentModel, ContentModelWithRelations } from "@headless-cms/server";
import { makeRequest } from "../../apiUtil";

export type IContentModel = Omit<ContentModel, "id" | "userId">;

export const contentModel = {
  getById: (modelId: string) =>
    makeRequest<ContentModelWithRelations>(
      "get",
      `/contentModel/${modelId}`,
      "contentModel",
      undefined,
    ),
  getAll: (
    page?: number,
  ): Promise<{
    pagination: { page: number; pageSize: number; total: number };
    contentModel: ContentModelWithRelations[];
  }> =>
    makeRequest(
      "get",
      `/contentModel?page=${page}&pageSize=8`,
      undefined,
      undefined,
    ),
  createModel: async (model: IContentModel) =>
    makeRequest("post", "/contentModel", undefined, model),
  update: async (modelId: number, model: IContentModel) =>
    makeRequest<ContentModelWithRelations>(
      "put",
      `/contentModel/${modelId}`,
      "contentModel",
      model,
    ),
  delete: async (modelId: number) =>
    makeRequest<string>(
      "delete",
      `/contentModel/${modelId}`,
      "message",
      undefined,
    ),
};
