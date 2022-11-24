import { ContentModel } from "@headless-cms/server";
import { instance } from "../index";

const ContentModel = {
  get: {
    all: async (
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
  },
};

export default ContentModel;
