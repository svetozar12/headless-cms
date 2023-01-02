import { makeTestRequest } from "../utils";
import { Content, ContentModel } from "../../src/utils/prisma";
import logger from "../../src/utils/logger";

describe("content", () => {
  let tokens: { accessToken: string; refreshToken: string };
  let contentModel: ContentModel;
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
      contentModel = res.body.contentModel;
    });
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
      it("should return 404 without content", () => {
        const { accessToken } = tokens;
        makeTestRequest(
          "delete",
          `/content/${content.id}`,
          { contentModelId: contentModel.id },
          accessToken
        ).then(async (val) => {
          const res = await makeTestRequest("get", "/content", {}, accessToken);
          expect(res.status).toBe(404);
          expect(res.body).toEqual({ message: "Content not found" });
        });
      });
    });
  });
  describe("POST", () => {
    describe("/content", () => {
      it("should return 201", async () => {
        const expectProps: { prop: string; value: any }[] = [
          { prop: "json", value: { german: "12" } },
          { prop: "text", value: null },
          { prop: "number", value: null },
        ];
        const { accessToken } = tokens;
        const res = await makeTestRequest(
          "post",
          "/content",
          {
            contentModelId: contentModel.id,
            json: JSON.stringify({ german: "12" }),
          },
          accessToken
        );
        expectProps.forEach(({ prop, value }) => {
          expect(res.body.content[prop]).toEqual(value);
        });
        expect(res.status).toBe(201);
        await makeTestRequest(
          "delete",
          `/content/${contentModel.id}`,
          accessToken
        );
      });
      it("should return 401 without token", async () => {
        const res = await makeTestRequest("post", "/content", {
          contentModelId: contentModel.id,
          json: JSON.stringify({ german: "12" }),
        });
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ message: "Unauthorized" });
      });
      const testCaseTypes = [
        {
          model: { json: true },
          content: { json: JSON.stringify({ hallo: "12" }) },
        },
        {
          model: { json: true, text: true },
          content: {
            json: JSON.stringify({ hallo: "12" }),
            text: "random text",
          },
        },
        {
          model: { json: true, text: true, number: true },
          content: {
            json: JSON.stringify({ hallo: "12" }),
            text: "random text",
            number: 12,
          },
        },
      ];
    });
  });
});
