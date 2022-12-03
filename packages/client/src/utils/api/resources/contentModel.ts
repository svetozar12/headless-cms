import { ContentModel } from "@headless-cms/server";
import { instance } from "../index";

export type IContentModel = Omit<ContentModel, "id" | "userId">;

const ContentModel = {
  getById: async (token: string, modelId: string) => {
    try {
      const res = await instance.get(`/contentModel/${modelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res.data.contentModel;
    } catch (error) {
      return error as any;
    }
  },
  getAll: async (
    token: string,
    page?: number
  ): Promise<{
    pagination: { page: number; pageSize: number; total: number };
    contentModel: ContentModel[];
  }> => {
    try {
      const res = await instance.get(`/contentModel?page=${page || 1}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return error as any;
    }
  },
  createModel: async (token: string, model: IContentModel) => {
    try {
      const res = await instance.post(`/contentModel`, model, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (error) {
      return error as any;
    }
  },
  delete: async (token: string, modelId: number) => {
    try {
      const res = await instance.delete(`/contentModel/${modelId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      return res;
    } catch (error) {
      return error as any;
    }
  },
};

export default ContentModel;
