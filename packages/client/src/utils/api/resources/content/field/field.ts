import { makeRequest } from "../../../apiUtil";

const field = {
  update: (fields: { id: string; value: any }, contentId: string) =>
    makeRequest<string>(
      "put",
      `/content/${contentId}/field`,
      "message",

      { fields }
    ),
};

export { field };
