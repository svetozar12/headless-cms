import { Content as ContentType } from "@headless-cms/server";
import { makeRequest } from "../../apiUtil";
export type IContent = Omit<ContentType, "id" | "userId" | "contentModelId">;
export const content = {
  getById: (modelId: string) =>
    makeRequest<ContentType>(
      "get",
      `/content/${modelId}`,
      "content",
      undefined,
    ),
  getAll: (
    token: string,
    page?: number,
  ): Promise<{
    pagination: { page: number; pageSize: number; total: number };
    content: ContentType[];
  }> =>
    makeRequest(
      "get",
      `/content?page=${page}&pageSize=8`,
      undefined,
      undefined,
    ),
  createModel: async (model: IContent) =>
    makeRequest("post", "/content", undefined, model),
  update: async (modelId: number, model: IContent) =>
    makeRequest<ContentType>("put", `/content/${modelId}`, "content", model),
  delete: async (modelId: number) =>
    makeRequest<string>("delete", `/content/${modelId}`, "message", undefined),
};

export default content;
