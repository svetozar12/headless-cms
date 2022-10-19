import { afterAll, beforeAll, describe, expect, it } from "vitest";
import testApi from "../utils";
import { UserAtributes } from "../../src/libs/sql/models/user.model";

const testObj = {
  testUser: {
    username: "test",
    password: "test",
  },
};

describe("/user", () => {
  let token: string;
  let user: UserAtributes;

  beforeAll(async () => {
    const { testUser } = testObj;
    const { username, password } = testUser;
    const res = await testApi.user.createUser(testUser);
    const { body } = await testApi.auth.auth(username, password);

    user = res.body;
    token = body.accessToken;
  });
  afterAll(async () => {
    await testApi.user.deleteUser(token);
  });

  it("should return user", async () => {
    const {
      testUser: { username, password },
    } = testObj;

    const res = await testApi.user.getUserMe(token);
    const { body } = res;
    expect(body).toEqual(user);
    expect(res.status).toBe(200);
  });
  it("should create user", async () => {
    const user = {
      username: "temp",
      password: "temp",
    };

    const res = await testApi.user.createUser(user);
    const { status, body: resBody } = res;

    // checks if user has correct username and password
    Object.entries(user).forEach(([key, value]) => {
      expect(resBody).toHaveProperty(key);
      expect(resBody[key]).toBe(value);
    });
    expect(status).toBe(201);
    // deleting temporary user
    const { body } = await testApi.auth.auth(user.username, user.password);
    await testApi.user.deleteUser(body.accessToken);
  });

  it("should delete user", async () => {
    const user = {
      username: "temp",
      password: "temp",
    };

    await testApi.user.createUser(user);
    const { body } = await testApi.auth.auth(user.username, user.password);
    const res = await testApi.user.deleteUser(body.accessToken);
    const { status } = res;

    expect(status).toBe(204);
  });
});
