import { z } from "zod";
import { sdk } from "../../rest-api-sdk";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const contentSchema = z.object({
  request: z.object({
    modelId: z.number(),
    name: z.string(),
    userId: z.string(),
  }),
});

export const contentRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    const { data } = await sdk.content.v1ContentGet();
    return data;
  }),
  create: protectedProcedure
    .input(contentSchema)
    .mutation(async ({ input: { request } }) => {
      const { data } = await sdk.content.v1ContentPost({ ...request });
      return data;
    }),
  updateById: protectedProcedure
    .input(z.object({ id: z.number(), request: contentSchema }))
    .mutation(
      async ({
        input: {
          id,
          request: { request },
        },
      }) => {
        const { data } = await sdk.content.v1ContentIdPut(id, request);
        return data;
      },
    ),
  deleteById: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const { data } = await sdk.content.v1ContentidDelete(input);
      return data;
    }),
});
