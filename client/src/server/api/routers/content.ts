import { z } from "zod";
import { sdk } from "../../rest-api-sdk";
import { paginationSchema } from "../common/pagination";
import { contentBodySchema } from "../common/zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const contentRouter = createTRPCRouter({
  get: protectedProcedure.input(z.number()).query(async ({ input }) => {
    const { data } = await sdk.content.v1ContentIdGet(input);
    return data;
  }),
  getAll: protectedProcedure
    .input(paginationSchema)
    .query(async ({ input: { limit, offSet } }) => {
      const { data } = await sdk.content.v1ContentGet(offSet, limit);
      return data;
    }),
  create: protectedProcedure
    .input(contentBodySchema)
    .mutation(async ({ input }) => {
      const { data } = await sdk.content.v1ContentPost({ ...input });
      return data;
    }),
  updateById: protectedProcedure
    .input(z.object({ id: z.number(), request: contentBodySchema }))
    .mutation(async ({ input: { id, request } }) => {
      const { data } = await sdk.content.v1ContentIdPut(id, request);
      return data;
    }),
  deleteById: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const { data } = await sdk.content.v1ContentIdDelete(input);
      return data;
    }),
});
