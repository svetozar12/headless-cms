import { makeTestRequest } from "../utils";
import { Content, ContentModel } from "../../src/utils/prisma";
import logger from "../../src/utils/logger";

describe("content", () => {
  let tokens: { accessToken: string; refreshToken: string };
  let content: Content;
  beforeAll(async () => {
    await makeTestRequest("post", "/user", {
      username: "test",
      password: "test",
    }).then((res) => {
      const { accessToken, refreshToken } = res.body;
      tokens = { accessToken, refreshToken };
    });
    const { accessToken } = tokens;
    let contentModel: ContentModel;
    await makeTestRequest(
      "post",
      "/contentModel",
      {
        json: "true",
        text: "true",
        number: "true",
      },
      accessToken
    ).then((res) => {
      logger([res.body, "wdawdawdawd"]);
      contentModel = res.body.contentModel;
    });
    logger([contentModel, "baidragoi"]);
    await makeTestRequest(
      "post",
      "/content",
      {
        contentModelId: contentModel.id,
        json: JSON.stringify({ test: "test" }),
        text: "some random string",
        number: 42,
      },
      accessToken
    ).then((res) => {
      logger([res.body, "sefjiosefhuo"]);
      content = res.body.content;
    });
  });

  afterAll(async () => {
    const { accessToken } = tokens;
    await makeTestRequest("delete", "/user/me", {}, accessToken);
  });

  describe("GET", () => {
    describe("/content", () => {
      it("should return 200", async () => {
        const { accessToken } = tokens;
        const res = await makeTestRequest("get", "/content", {}, accessToken);
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ content: [content] });
      });
      it("should return 401 without token", async () => {
        const res = await makeTestRequest("get", "/content");
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: "Unauthorized" });
      });
      // it("should return 404 without content", async () => {
      //   const { accessToken } = tokens;
      //   logger([content, "CONTENTNENTN"]);
      //   await makeTestRequest(
      //     "delete",
      //     `/content/${content.id}`,
      //     {},
      //     accessToken
      //   ).then((res) => logger([res, "efjiosefhuefhu"]));
      //   const res = await makeTestRequest("get", "/content", {}, accessToken);
      //   logger([content, "darvotonanaroda"]);
      //   expect(res.status).toBe(404);
      //   expect(res.body).toEqual({ message: "Content not found" });
      // });
    });
  });
});
