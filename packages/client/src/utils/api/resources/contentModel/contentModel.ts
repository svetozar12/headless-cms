import { ContentModel } from "@headless-cms/server";
import { makeRequest, Method } from "../../apiUtil";

export type IContentModel = Omit<ContentModel, "id" | "userId">;

export const contentModel = {
  getById: (modelId: string) =>
    makeRequest<ContentModel>(
      Method.GET,
      `/contentModel/${modelId}`,
      "contentModel",
      undefined
    ),
  getAll: (
    page?: number
  ): Promise<{
    pagination: { page: number; pageSize: number; total: number };
    contentModel: ContentModel[];
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
    makeRequest<ContentModel>(
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
