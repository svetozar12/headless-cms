import { makeTestRequest } from "../utils";

let user;
let tokens: { accessToken: string; refreshToken: string };
const testUser = {
  username: "test",
  password: "test",
};
const zodTestCases = [
  {
    body: {
      username: 1,
      password: "string",
      grant_type: "password",
    },
    expect: "Expected string, received number body.username",
  },
  {
    body: {
      username: "string",
      password: 1,
      grant_type: "password",
    },
    expect: "Expected string, received number body.password",
  },
  {
    body: {
      ...testUser,
      grant_type: 1,
    },
    expect:
      "Expected 'password' | 'refresh_token', received number body.grant_type",
  },
  {
    body: {
      refreshToken: 1,
      grant_type: "refresh_token",
    },
    expect: "Expected string, received number body.refreshToken",
  },
  {
    body: { refreshToken: "dawdaw", grant_type: 1 },
    expect:
      "Expected 'password' | 'refresh_token', received number body.grant_type",
  },
];

beforeAll(async () => {
  const token = await makeTestRequest("post", "/user", testUser);
  const { user: User } = token.body;
  user = User;

  tokens = {
    accessToken: token.body.accessToken,
    refreshToken: token.body.refreshToken,
  };
});
afterAll(async () => {
  const { accessToken } = tokens;
  await makeTestRequest("delete", "/user/me", undefined, accessToken);
});

describe("/auth", () => {
  describe("POST", () => {
    describe("/", () => {
      it("should return AccessToken and RefreshToken(201) grant_type=password", async () => {
        const expectedProperties = ["accessToken", "refreshToken"];
        console.log(testUser);
        const res = await makeTestRequest("post", "/auth", {
          ...testUser,
          grant_type: "password",
        });
        expectedProperties.forEach((property) => {
          expect(res.body).toHaveProperty(property);
          expect(typeof res.body[property]).toBe("string");
          expect(res.body[property].length > 0).toBe(true);
        });
        expect(res.status).toBe(201);
      });
      it("should return AccessToken and RefreshToken(201) grant_type=refresh_token", async () => {
        const expectedProperties = ["accessToken", "refreshToken"];
        const { refreshToken } = tokens;
        const res = await makeTestRequest("post", "/auth", {
          grant_type: "refresh_token",
          refreshToken,
        });
        console.log(res, "TOKENS");

        expectedProperties.forEach((property) => {
          expect(res.body).toHaveProperty(property);
          expect(typeof res.body[property]).toBe("string");
          expect(res.body[property].length > 0).toBe(true);
        });
        expect(res.status).toBe(201);
      });
      for (const testCase of zodTestCases) {
        const { body, expect: message } = testCase;
        it(`testing zod schema with body: ${JSON.stringify(
          body,
          undefined
        )}`, async () => {
          const res = await makeTestRequest("post", "/auth", body);
          expect(res.body.message).toBe(message);
          expect(res.status).toBe(400);
        });
      }
      it("should return Not Found(404) grant_type=password", async () => {
        const res = await makeTestRequest("post", "/auth", {
          username: "nonExistent",
          password: "nonExistent",
          grant_type: "password",
        });
        expect(res.body.message).toBe("User doesn't exist");
        expect(res.status).toBe(404);
      });

      it("should return Not Found(404) grant_type=refresh_token", async () => {
        const res = await makeTestRequest("post", "/auth", {
          refreshToken: "invalidToken",
          grant_type: "refresh_token",
        });
        expect(res.body.message).toBe("Invalid refresh token");
        expect(res.status).toBe(401);
      });
    });
  });
});
