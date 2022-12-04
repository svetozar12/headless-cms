import { User } from "@headless-cms/server";
import { instance } from "../index";

const auth = {
  auth: async (
    grant_type: "password" | "refresh_token",
    password?: { username: string; password: string },
    refreshToken?: string
  ): Promise<{ user: User; accessToken: string; refreshToken: string }> => {
    if (grant_type === "password") {
      const resPassword = instance
        .post(`/auth`, {
          grant_type,
          ...password,
        })
        .then((res) => Promise.resolve(res.data))
        .catch((err) => Promise.reject(err.response.data));
      return resPassword;
    }

    const resRefreshToken = instance
      .post(`/auth`, {
        grant_type,
        refreshToken,
      })
      .then((res) => Promise.resolve(res.data))
      .catch((err) => Promise.reject(err.response.data));
    return resRefreshToken;
  },
};

export default auth;
