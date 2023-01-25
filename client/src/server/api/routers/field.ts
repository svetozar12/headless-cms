import { z } from "zod";
import { sdk } from "../../rest-api-sdk";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const contentSchema = z.object({
  request: z.object({
    contentId: z.number(),
    name: z.string(),
    typeId: z.number(),
  }),
});

export const fieldRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    const { data } = await sdk.field.v1FieldGet();
    return data;
  }),
  create: protectedProcedure
    .input(contentSchema)
    .mutation(async ({ input: { request } }) => {
      const { data } = await sdk.field.v1FieldPost({ ...request });
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
        const { data } = await sdk.field.v1FieldIdPut(id, request);
        return data;
      },
    ),
  deleteById: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const { data } = await sdk.field.v1FieldIdDelete(input);
      return data;
    }),
});
