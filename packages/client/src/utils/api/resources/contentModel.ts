import { ContentModel } from "@headless-cms/server";
import { instance } from "../index";

export type IContentModel = Omit<ContentModel, "id" | "userId">;

const ContentModel = {
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
    console.log(token);

    try {
      const res = await instance.get(`/contentModel`, {
        data: model,
        headers: { Authorization: `Bearer ${token}` },
      });
      return res;
    } catch (error) {
      return error as any;
    }
  },
};

export default ContentModel;
