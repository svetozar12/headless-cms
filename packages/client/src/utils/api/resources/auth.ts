import { instance } from "../index";
import { User } from "@headless-cms/server";

const auth = {
  auth: async (
    grant_type: "password" | "refresh_token",
    password?: { username: string; password: string },
    refreshToken?: string
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
    if (grant_type === "password") {
      const resPassword = await instance.post(`/auth`, {
        grant_type,
        ...password,
      });
      return resPassword.data;
    }
    console.log(refreshToken, "refreshToken");

    const resRefreshToken = await instance.post(`/auth`, {
      grant_type,
      refreshToken,
    });
    return resRefreshToken.data;
  },
};

export default auth;
