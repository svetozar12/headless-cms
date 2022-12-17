import { ContentModel, ContentModelWithRelations } from "@headless-cms/server";
import { makeRequest, Method } from "../../apiUtil";

export type IContentModel = Omit<ContentModelWithRelations, "id" | "userId">;

export const contentModel = {
  getById: (modelId: string) =>
    makeRequest<ContentModelWithRelations>(
      Method.GET,
      `/contentModel/${modelId}`,
      "contentModel",
      undefined
    ),
  getAll: (
    page?: number
  ): Promise<{
    pagination: { page: number; pageSize: number; total: number };
    contentModel: ContentModelWithRelations[];
  }> =>
    makeRequest(
      Method.GET,
      `/contentModel?page=${page}&pageSize=8`,
      undefined,
      undefined
    ),
  createModel: async (model: IContentModel) =>
    makeRequest(Method.POST, "/contentModel", undefined, model),
  update: async (modelId: number, model: IContentModel) =>
    makeRequest<ContentModelWithRelations>(
      Method.PUT,
      `/contentModel/${modelId}`,
      "contentModel",
      model
    ),
  delete: async (modelId: number) =>
    makeRequest<string>(
      Method.DELETE,
      `/contentModel/${modelId}`,
      "message",
      undefined
    ),
};
