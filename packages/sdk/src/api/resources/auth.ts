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
    let res: Promise<IAuthResource>;
    if (grant_type === "password") {
      res = makeRequest<IAuthResource>("post", "/auth", undefined, {
        grant_type,
        ...password,
      });
    } else
      res = makeRequest<IAuthResource>("post", "/auth", undefined, {
        grant_type,
        refreshToken,
      });
    return res;
  },
};
