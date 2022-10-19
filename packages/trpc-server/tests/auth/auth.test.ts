import { describe, it, expect } from "vitest";
import testApi from "../utils";

describe("/auth", () => {
  it("works", async () => {
    expect(1).toBe(1);
  });
  it("should return AccessToken and RefreshToken", async () => {
    const expectedProperties = ["accessToken", "refreshToken"];
    const res = await testApi.auth.auth("greg", "greg");

    expectedProperties.forEach((property) => {
      expect(res.body).toHaveProperty(property);
      expect(typeof res.body[property]).toBe("string");
      expect(res.body[property].length > 0).toBe(true);
    });
    expect(res.status).toBe(201);
  });
  it("should return Forbidden", async () => {
    const res = await testApi.auth.auth("nonExistent", "nonExistent");
    expect(res.body.message).toBe("User doesn't exist");
    expect(res.status).toBe(404);
  });
});
