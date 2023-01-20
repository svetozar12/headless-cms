import { makeRequest } from "../../apiUtil";

export type IContentModel = Omit<any, "id" | "userId">;

export const contentModel = {
  getById: (modelId: string) =>
    makeRequest<any>(
      "get",
      `/contentModel/${modelId}`,
      "contentModel",
      undefined,
    ),
  getAll: (
    page?: number,
  ): Promise<{
    pagination: { page: number; pageSize: number; total: number };
    contentModel: any[];
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
    makeRequest<any>("put", `/contentModel/${modelId}`, "contentModel", model),
  delete: async (modelId: number) =>
    makeRequest<string>(
      "delete",
      `/contentModel/${modelId}`,
      "message",
      undefined,
    ),
};
