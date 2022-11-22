import { ContentModel } from "@headless-cms/server";
import { instance } from "../index";

const ContentModel = {
  get: {
    all: async (token: string): Promise<ContentModel[]> => {
      try {
        const res = await instance.get("/contentModel", {
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
