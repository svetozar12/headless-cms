import { instance } from "../index";
import { User } from "@headless-cms/server";

const user = {
  getMe: (token: string): Promise<User> =>
    instance
      .get(`/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        console.log(res.status);
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
        console.log(res.status);
        return res.data;
      })
      .catch((err) => Promise.reject(err.response.data)),
};

export default user;
