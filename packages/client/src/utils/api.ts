// src/utils/api.ts
import { User } from "@headless-cms/server";
import { env } from "../env/env";
import axios from "axios";

const apiHost = `${env.NEXT_PUBLIC_API_PROTOCOL}${env.NEXT_PUBLIC_API_HOST}:${env.NEXT_PUBLIC_API_PORT}`;

const instance = axios.create({
  baseURL: apiHost,
});

const api = {
  health: {
    get: () => fetch(`${apiHost}/health`).then((res) => res.json()),
  },
  user: {
    me: {
      get: (token: string): Promise<User> =>
        instance
          .get(`/user/me`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res.status);
            return res.data;
          })
          .catch((err) => Promise.reject(err.response.data)),
    },
  },
  auth: {
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
  },
};

export default api;
