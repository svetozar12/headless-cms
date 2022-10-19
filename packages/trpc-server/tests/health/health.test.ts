import { describe, expect, it } from "vitest";
import testApi from "../utils";

describe("/health", () => {
  it("should return 200", async () => {
    const res = await testApi.health.health;
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("ok");
  });
});
