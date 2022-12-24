import { User } from "@headless-cms/server";
import { makeRequest, Method } from "../apiUtil";

export const user = {
  getMe: () => makeRequest<User>("get", "/user/me"),
  create: (user: { username: string; password: string }) =>
    makeRequest<{ user: User; accessToken: string; refreshToken: string }>(
      "post",
      "/user",
      undefined,
      user
    ),
};
