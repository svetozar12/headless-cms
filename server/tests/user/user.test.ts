import { makeTestRequest } from "../utils";

let user;
let tokens: { accessToken: string; refreshToken: string };
const zodTestCases = [
  {
    body: {
      username: 1,
      password: 1,
    },
    expect: "Expected string, received number body.username",
  },
  {
    body: {
      username: "string",
    },
    expect: "Required body.password",
  },
  {
    body: {
      password: "string",
    },
    expect: "Required body.username",
  },
];

describe("/user", () => {
  beforeAll(async () => {
    const token = await makeTestRequest("post", "/user", {
      username: "test",
      password: "test",
    });
    const { user: User, ...Tokens } = token.body;
    user = User;
    tokens = Tokens;
  });

  afterAll(async () => {
    await makeTestRequest("delete", "/user/me", {}, tokens.accessToken);
  });

  describe("GET", () => {
    it("/user/me expect 200", async () => {
      const { accessToken } = tokens;
      const res = await makeTestRequest("get", "/user/me", {}, accessToken);

      const { body } = res;

      expect(body).toEqual(user);
      expect(res.status).toBe(200);
    });
    it("/user/me expect 401 without token", async () => {
      const res = await makeTestRequest("get", "/user/me");

      const { body } = res;

      expect(body).toEqual({ message: "Unauthorized" });
      expect(res.status).toBe(401);
    });
  });

  describe("POST", () => {
    it("/user expect 201", async () => {
      const res = await makeTestRequest("post", "/user", {
        username: "test1",
        password: "test1",
      });

      const { body } = res;

      expect(body).toHaveProperty("user");
      expect(body).toHaveProperty("accessToken");
      expect(body).toHaveProperty("refreshToken");
      expect(res.status).toBe(201);
      await makeTestRequest("delete", "/user/me", {}, body.accessToken);
    });

    it("/user expect 409", async () => {
      const res = await makeTestRequest("post", "/user", {
        username: "test",
        password: "test",
      });

      const { body } = res;

      expect(body).toEqual({ message: "User already exist" });
      expect(res.status).toBe(409);
    });

    for (const testCase of zodTestCases) {
      const { body, expect: message } = testCase;
      it(`should return ${message} when body=${JSON.stringify(
        body
      )}`, async () => {
        const res = await makeTestRequest("post", "/user", body);
        expect(res.body).toEqual({ message });
        expect(res.status).toBe(400);
      });
    }
  });

  describe("PUT", () => {
    it("/user/me should return 201", async () => {
      const { accessToken } = tokens;
      const res = await makeTestRequest(
        "put",
        "/user/me",
        { username: "newUser" },
        accessToken
      );
      expect(res.body.user.username).toBe("newUser");
      expect(res.status).toBe(201);
    });
    it("user/me should return 409 No Updates Required", async () => {
      const { accessToken } = tokens;
      const res = await makeTestRequest(
        "put",
        "/user/me",
        { username: "newUser" },
        accessToken
      );
      expect(res.body).toEqual({ message: "User wasn't updated" });
      expect(res.status).toBe(409);
    });
    it("user/me expect 401 without token", async () => {
      const res = await makeTestRequest("put", "/user/me", {
        username: "newUser",
      });
      expect(res.status).toBe(401);
      expect(res.body).toEqual({ message: "Unauthorized" });
    });
  });

  describe("DELETE", () => {
    it("/user/me expect 204", async () => {
      const { accessToken } = tokens;
      const res = await makeTestRequest("delete", "/user/me", {}, accessToken);

      const { body } = res;

      expect(body).toEqual({});
      expect(res.status).toBe(204);
    });

    it("/user/me expect 401 without token", async () => {
      const res = await makeTestRequest("delete", "/user/me");

      const { body } = res;

      expect(body).toEqual({ message: "Unauthorized" });
      expect(res.status).toBe(401);
    });
  });
});
