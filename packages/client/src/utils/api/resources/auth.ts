import { User } from "@headless-cms/server";
import { makeRequest, Method } from "../apiUtil";

interface IAuth {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export const auth = {
  auth: async (
    grant_type: "password" | "refresh_token",
    password?: { username: string; password: string },
    refreshToken?: string
  ) => {
    let res: Promise<IAuth>;
    if (grant_type === "password") {
      res = makeRequest<IAuth>(Method.POST, "/auth", undefined, {
        grant_type,
        ...password,
      });
    } else
      res = makeRequest<IAuth>(Method.POST, "/auth", undefined, {
        grant_type,
        refreshToken,
      });
    return res;
  },
};
