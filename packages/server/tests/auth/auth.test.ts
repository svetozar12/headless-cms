import { makeTestRequest } from "../utils";

const zodTestCases = [
  {
    body: {
      username: 1,
      password: 1,
      grant_type: "password",
    },
    expect: "Expected string, received number",
  },
  {
    body: {
      username: "greg",
      password: "greg",
      grant_type: 1,
    },
    expect: "Expected 'password' | 'refresh_token', received number",
  },
  {
    body: {
      refreshToken: 1,
      grant_type: "refresh_token",
    },
    expect: "Expected string, received number",
  },
  {
    body: { refreshToken: "dawdaw", grant_type: 1 },
    expect: "Expected 'password' | 'refresh_token', received number",
  },
];

describe("/auth", () => {
  it("should return AccessToken and RefreshToken(201) grant_type=password", async () => {
    const expectedProperties = ["accessToken", "refreshToken"];
    const res = await makeTestRequest("post", "/auth", {
      username: "greg",
      password: "greg",
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
    const token = await makeTestRequest("post", "/auth", {
      username: "greg",
      password: "greg",
      grant_type: "password",
    });
    const { refreshToken } = token.body;
    const res = await makeTestRequest("post", "/auth", {
      grant_type: "refresh_token",
      refreshToken,
    });
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
