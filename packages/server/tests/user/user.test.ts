import { makeTestRequest } from "../utils";
import logger from "../../dist/utils/logger";

let user;
let tokens: { accessToken: string; refreshToken: string };

describe("/user", () => {
  beforeAll(async () => {
    const token = await makeTestRequest("post", "/user", {
      username: "test",
      password: "test",
    });
    const { user: User, ...Tokens } = token.body;
    user = User;
    logger(["tokens", Tokens]);
    tokens = Tokens;
  });

  afterAll(async () => {
    await makeTestRequest("delete", "/user/me", {}, tokens.accessToken);
  });
  it("get user", async () => {
    const { accessToken } = tokens;
    const res = await makeTestRequest("get", "/user/me", {}, accessToken);

    const { body } = res;

    expect(body).toEqual(user);
    expect(res.status).toBe(200);
  });
});
