import { User } from "@headless-cms/server";
import { makeRequest } from "../apiUtil";

export interface IAuthResource {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const auth = {
  auth: async (
    grant_type: "password" | "refresh_token",
    password?: { username: string; password: string },
    refreshToken?: string,
  ) => {
    let res: IAuthResource | string;
    if (grant_type === "password") {
      const passwordType = await makeRequest<IAuthResource | string>(
        "post",
        "/auth",
        undefined,
        {
          grant_type,
          ...password,
        },
      );
      res = passwordType;
    } else {
      const otherType = await makeRequest<IAuthResource>(
        "post",
        "/auth",
        undefined,
        {
          grant_type,
          refreshToken,
        },
      );
      res = otherType;
    }

    return res;
  },
};
