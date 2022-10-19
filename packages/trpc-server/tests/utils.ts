import * as request from "supertest";
import { userSchema } from "../src/routes/user/schema";
import app from "../src/index";

const instance = request.agent(app);

const testApi = {
  auth: {
    auth: (username: string, password: string) =>
      instance
        .post("/auth")
        .send({ username, password, grant_type: "password" }),
  },
  health: { health: instance.get("/health") },
  user: {
    getUserMe: (token: string) =>
      instance.get("/user/me").set("Authorization", `Bearer ${token}`),
    createUser: (user: { username: string; password: string }) =>
      instance.post("/user").send(user),
    deleteUser: (token: string) =>
      instance.delete("/user/me").set("Authorization", `Bearer ${token}`),
  },
};

export default testApi;
