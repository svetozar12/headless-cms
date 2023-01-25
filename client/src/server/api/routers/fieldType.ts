import { z } from "zod";
import { sdk } from "../../rest-api-sdk";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const contentSchema = z.object({
  request: z.object({
    contentModelId: z.number(),
    name: z.string(),
  }),
});

export const fieldTypeRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    const { data } = await sdk.fieldType.v1FieldTypeGet();
    return data;
  }),
  create: protectedProcedure
    .input(contentSchema)
    .mutation(async ({ input: { request } }) => {
      const { data } = await sdk.fieldType.v1FieldTypePost({ ...request });
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
        const { data } = await sdk.fieldType.v1FieldTypeIdPut(id, request);
        return data;
      },
    ),
  deleteById: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const { data } = await sdk.fieldType.v1FieldTypeIdDelete(input);
      return data;
    }),
});
