import { makeTestRequest } from "../utils";

let tokens: { accessToken: string; refreshToken: string };
let model;

describe("/contentModel", () => {
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
      model = res.body.contentModel;
    });
  });

  afterAll(async () => {
    const { accessToken } = tokens;
    await makeTestRequest("delete", "/user/me", {}, accessToken);
  });

  describe("GET", () => {
    describe("/contentModel", () => {
      it("/contentModel expect 200", async () => {
        const { accessToken } = tokens;
        const res = await makeTestRequest(
          "get",
          "/contentModel",
          {},
          accessToken
        );

        const { body } = res;
        expect(body).toEqual({ contentModel: [model] });
        expect(res.status).toBe(200);
      });
      it("/contentModel expect 401 without token", async () => {
        const res = await makeTestRequest("get", "/contentModel");

        const { body } = res;

        expect(body).toEqual({ message: "Unauthorized" });
        expect(res.status).toBe(401);
      });
      it("/contentModel expect 404 without contentModel", async () => {
        const { accessToken } = tokens;
        await makeTestRequest(
          "delete",
          `/contentModel/${model.id}`,
          {},
          accessToken
        );
        const res = await makeTestRequest(
          "get",
          "/contentModel",
          {},
          accessToken
        );

        const { body } = res;

        expect(body).toEqual({ message: "You don't have content models !" });
        expect(res.status).toBe(404);
      });
    }),
      describe("/contentModel/:id", () => {
        beforeAll(async () => {
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
            model = res.body.contentModel;
          });
        });
        it("/contentModel/:id expect 200", async () => {
          const { accessToken } = tokens;

          const res = await makeTestRequest(
            "get",
            `/contentModel/${model.id}`,
            {},
            accessToken
          );

          const { body } = res;

          expect(body).toEqual({ contentModel: model });
          expect(res.status).toBe(200);
        });
        it("/contentModel/:id expect 401 without token", async () => {
          const res = await makeTestRequest("get", `/contentModel/${model.id}`);

          const { body } = res;

          expect(body).toEqual({ message: "Unauthorized" });
          expect(res.status).toBe(401);
        });
        it("/contentModel/:id expect 404 without contentModel", async () => {
          const newUser = await makeTestRequest("post", "/user", {
            username: "test2",
            password: "test2",
          });

          const { accessToken } = newUser.body;
          const res = await makeTestRequest(
            "get",
            `/contentModel/doesntexist`,
            {},
            accessToken
          );

          const { body } = res;

          expect(body).toEqual({ message: "You don't have content models !" });
          expect(res.status).toBe(404);
          await makeTestRequest("delete", "/user/me", {}, accessToken);
        });
      });
  });

  describe("POST", () => {
    const expectedProps = ["id", "userId", "json", "text", "number"];

    const zodTestCases = [
      {
        body: {
          json: "true",
          text: "true",
          number: "true",
        },
        expect: true,
      },
      {
        body: {
          json: "false",
          text: "false",
          number: "false",
        },
        expect: false,
      },
      {
        body: {
          json: 1,
          text: 9822,
          number: 90_000_2,
        },
        expect: false,
      },
    ];

    zodTestCases.forEach((testCase) => {
      it(`/contentModel test different input \n${JSON.stringify(
        testCase.body,
        null,
        2
      )}`, async () => {
        const { accessToken } = tokens;
        const { body: SchemaBody, expect: SchemaExpect } = testCase;
        const res = await makeTestRequest(
          "post",
          "/contentModel",
          SchemaBody,
          accessToken
        );

        const { body } = res;
        expectedProps.forEach((prop) => {
          expect(body.contentModel).toHaveProperty(prop);
          if (prop !== "id" && prop !== "userId") {
            expect(body.contentModel[prop]).toBe(SchemaExpect);
          }
        });
        expect(res.status).toBe(201);
      });
    });
    it("/contentModel expect 401", async () => {
      const res = await makeTestRequest(
        "post",
        "/contentModel",
        {
          json: "true",
          text: "true",
          number: "true",
        },
        undefined
      );

      const { body } = res;
      expect(body).toEqual({ message: "Unauthorized" });
      expect(res.status).toBe(401);
    });
  });

  describe("DELETE", () => {
    it("/contentModel/:id expect 200", async () => {
      const { accessToken } = tokens;
      const res = await makeTestRequest(
        "delete",
        `/contentModel/${model.id}`,
        {},
        accessToken
      );

      const { body } = res;

      expect(body).toEqual({});
      expect(res.status).toBe(204);
    });
    it("/contentModel/:id expect 401 without token", async () => {
      const res = await makeTestRequest(
        "delete",
        `/contentModel/${model.id}`,
        {}
      );

      const { body } = res;

      expect(body).toEqual({ message: "Unauthorized" });
      expect(res.status).toBe(401);
    });
    it("/contentModel/:id expect 404 without contentModel", async () => {
      const newUser = await makeTestRequest("post", "/user", {
        username: "test2",
        password: "test2",
      });
      const { accessToken } = newUser.body;
      const res = await makeTestRequest(
        "delete",
        `/contentModel/doesntexist`,
        {},
        accessToken
      );

      const { body } = res;

      expect(body).toEqual({ message: "You don't have content models !" });
      expect(res.status).toBe(404);
      await makeTestRequest("delete", "/user/me", {}, accessToken);
    });
  });
});
