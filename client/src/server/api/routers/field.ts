import { z } from "zod";
import { sdk } from "../../rest-api-sdk";
import { paginationSchema } from "../common/pagination";
import { fieldBodySchema } from "../common/zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";

export const fieldRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(paginationSchema)
    .query(async ({ input: { limit, offSet } }) => {
      const { data } = await sdk.field.v1FieldGet(offSet, limit);
      return data;
    }),
  create: protectedProcedure
    .input(fieldBodySchema)
    .mutation(async ({ input }) => {
      const { data } = await sdk.field.v1FieldPost({ ...input });
      return data;
    }),
  updateById: protectedProcedure
    .input(z.object({ id: z.number(), request: fieldBodySchema }))
    .mutation(async ({ input: { id, request } }) => {
      const { data } = await sdk.field.v1FieldIdPut(id, request);
      return data;
    }),
  deleteById: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const { data } = await sdk.field.v1FieldIdDelete(input);
      return data;
    }),
});
