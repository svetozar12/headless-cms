import { ContentModel } from "@headless-cms/server";
import { makeRequest, Method } from "../../apiUtil";

export type IContentModel = Omit<ContentModel, "id" | "userId">;

const ContentModel = {
  getById: (token: string, modelId: string) =>
    makeRequest<ContentModel>(
      Method.GET,
      `/contentModel/${modelId}`,
      "contentModel",
      undefined,
      token
    ),
  getAll: (
    token: string,
    page?: number
  ): Promise<{
    pagination: { page: number; pageSize: number; total: number };
    contentModel: ContentModel[];
  }> =>
    makeRequest(
      Method.GET,
      `/contentModel?page=${page}&pageSize=8`,
      undefined,
      undefined,
      token
    ),
  createModel: async (token: string, model: IContentModel) =>
    makeRequest(Method.POST, "/contentModel", undefined, model, token),
  update: async (token: string, modelId: number, model: IContentModel) =>
    makeRequest<ContentModel>(
      Method.PUT,
      `/contentModel/${modelId}`,
      "contentModel",
      model,
      token
    ),
  delete: async (token: string, modelId: number) =>
    makeRequest<string>(
      Method.DELETE,
      `/contentModel/${modelId}`,
      "message",
      undefined,
      token
    ),
};

export default ContentModel;
