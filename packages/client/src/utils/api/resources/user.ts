import { User } from "@headless-cms/server";
import { instance } from "../index";

const user = {
  getMe: (token: string): Promise<User> =>
    instance
      .get(`/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        return res.data;
      })
      .catch((err) => Promise.reject(err.response.data)),
  create: (user: {
    username: string;
    password: string;
  }): Promise<{ user: User; accessToken: string; refreshToken: string }> =>
    instance
      .post(`/user`, user)
      .then((res) => {
        return res.data;
      })
      .catch((err) => Promise.reject(err.response.data)),
};

export default user;
