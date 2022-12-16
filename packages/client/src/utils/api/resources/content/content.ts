import { Content as ContentType } from "@headless-cms/server";
import { makeRequest, Method } from "../../apiUtil";
export type IContent = Omit<ContentType, "id" | "userId" | "contentModelId">;
export const content = {
  getById: (modelId: string) =>
    makeRequest<ContentType>(
      Method.GET,
      `/content/${modelId}`,
      "content",
      undefined
    ),
  getAll: (
    token: string,
    page?: number
  ): Promise<{
    pagination: { page: number; pageSize: number; total: number };
    content: ContentType[];
  }> =>
    makeRequest(
      Method.GET,
      `/content?page=${page}&pageSize=8`,
      undefined,
      undefined
    ),
  createModel: async (model: IContent) =>
    makeRequest(Method.POST, "/content", undefined, model),
  update: async (modelId: number, model: IContent) =>
    makeRequest<ContentType>(
      Method.PUT,
      `/content/${modelId}`,
      "content",
      model
    ),
  delete: async (modelId: number) =>
    makeRequest<string>(
      Method.DELETE,
      `/content/${modelId}`,
      "message",
      undefined
    ),
};

export default content;
