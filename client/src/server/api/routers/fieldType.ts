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
  getAll: protectedProcedure.query(() => {
    return sdk.fieldType.v1FieldTypeGet();
  }),
  create: protectedProcedure
    .input(contentSchema)
    .mutation(({ input: { request } }) =>
      sdk.fieldType.v1FieldTypePost({ request }),
    ),
  updateById: protectedProcedure
    .input(z.object({ id: z.number(), request: contentSchema }))
    .mutation(({ input: { id, request: { request } } }) =>
      sdk.fieldType.v1FieldTypeIdPut({ id, request }),
    ),
  deleteById: protectedProcedure
    .input(z.number())
    .mutation(({ input }) => sdk.fieldType.v1FieldTypeIdDelete({ id: input })),
});
