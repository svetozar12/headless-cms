import { User } from "@headless-cms/server";
import { makeRequest, Method } from "../apiUtil";

export const user = {
  getMe: () => makeRequest<User>(Method.GET, "/user/me"),
  create: (user: { username: string; password: string }) =>
    makeRequest<{ user: User; accessToken: string; refreshToken: string }>(
      Method.POST,
      "/user",
      undefined,
      user
    ),
};
