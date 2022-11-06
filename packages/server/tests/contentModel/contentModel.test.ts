import { makeTestRequest } from "../utils";
import logger from "../../src/utils/logger";

let user;
let tokens: { accessToken: string; refreshToken: string };
let modelId;
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

describe("/contentModel", () => {
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
    const { accessToken } = tokens;
    await makeTestRequest("delete", "/user/me", {}, accessToken);
  });

  describe("POST", () => {
    it("/contentModel expect 201", async () => {
      const { accessToken } = tokens;
      const expectedProps = ["id", "userId", "json", "text", "number"];
      const res = await makeTestRequest(
        "post",
        "/contentModel",
        {
          json: "true",
          text: "true",
          number: "true",
        },
        accessToken
      );

      const { body } = res;
      expectedProps.forEach((prop) => {
        expect(body.contentModel).toHaveProperty(prop);
        if (prop !== "id" && prop !== "userId")
          expect(body.contentModel[prop]).toBe(true);
      });
      expect(res.status).toBe(201);
      modelId = body.contentModel.id;
    });
  });
});
