import { makeRequest, Method } from "../../../apiUtil";

const field = {
  update: (
    fields: { id: string; value: any },
    contentId: string,
    token: string
  ) =>
    makeRequest<string>(
      Method.PUT,
      `/content/${contentId}/field`,
      "message",

      { fields },
      token
    ),
};

export { field };
