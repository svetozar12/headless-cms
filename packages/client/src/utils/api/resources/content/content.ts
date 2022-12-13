import { Content } from "@headless-cms/server";
import { makeRequest, Method } from "../../apiUtil";
export type IContent = Omit<Content, "id" | "userId" | "contentModelId">;
const Content = {
  getById: (token: string, modelId: string) =>
    makeRequest<Content>(
      Method.GET,
      `/content/${modelId}`,
      "content",
      undefined,
      token
    ),
  getAll: (
    token: string,
    page?: number
  ): Promise<{
    pagination: { page: number; pageSize: number; total: number };
    content: Content[];
  }> =>
    makeRequest(
      Method.GET,
      `/content?page=${page}&pageSize=8`,
      undefined,
      undefined,
      token
    ),
  createModel: async (token: string, model: IContent) =>
    makeRequest(Method.POST, "/content", undefined, model, token),
  update: async (token: string, modelId: number, model: IContent) =>
    makeRequest<Content>(
      Method.PUT,
      `/content/${modelId}`,
      "content",
      model,
      token
    ),
  delete: async (token: string, modelId: number) =>
    makeRequest<string>(
      Method.DELETE,
      `/content/${modelId}`,
      "message",
      undefined,
      token
    ),
};

export default Content;
