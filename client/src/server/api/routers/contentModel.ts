import { z } from "zod";
import { sdk } from "../../rest-api-sdk";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const contentSchema = z.object({
  request: z.object({
    name: z.string(),
    userId: z.string(),
  }),
});

export const contentModelRouter = createTRPCRouter({
  getAll: protectedProcedure.query(async () => {
    const { data } = await sdk.contentModel.v1ContentModelGet();
    return data;
  }),
  create: protectedProcedure
    .input(
      z.object({
        request: z.object({
          name: z.string(),
          userId: z.string(),
          description: z.string(),
        }),
      }),
    )
    .mutation(async ({ input: { request } }) => {
      const { data } = await sdk.contentModel.v1ContentModelPost({
        ...request,
      });
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
        const { data } = await sdk.contentModel.v1ContentModelIdPut(
          id,
          request,
        );
        return data;
      },
    ),
  deleteById: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const { data } = await sdk.contentModel.v1ContentModelIdDelete(input);
      return data;
    }),
});
