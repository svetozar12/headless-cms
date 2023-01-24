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
  getAll: protectedProcedure.query(() => {
    return sdk.field.v1FieldGet();
  }),
  create: protectedProcedure
    .input(contentSchema)
    .mutation(({ input: { request } }) => sdk.field.v1FieldPost({ request })),
  updateById: protectedProcedure
    .input(z.object({ id: z.number(), request: contentSchema }))
    .mutation(({ input: { id, request: { request } } }) =>
      sdk.field.v1FieldIdPut({ id, request }),
    ),
  deleteById: protectedProcedure
    .input(z.number())
    .mutation(({ input }) => sdk.field.v1FieldIdDelete({ id: input })),
});
