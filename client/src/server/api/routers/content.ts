import { z } from "zod";
import { sdk } from "../../rest-api-sdk";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const contentSchema = z.object({
  request: z.object({
    modelId: z.number(),
    name: z.string(),
    userId: z.number(),
  }),
});

export const contentRouter = createTRPCRouter({
  getAll: protectedProcedure.query(() => {
    return sdk.content.v1ContentGet();
  }),
  create: protectedProcedure
    .input(contentSchema)
    .mutation(({ input: { request } }) =>
      sdk.content.v1ContentPost({ request }),
    ),
  updateById: protectedProcedure
    .input(z.object({ id: z.number(), request: contentSchema }))
    .mutation(({ input: { id, request: { request } } }) =>
      sdk.content.v1ContentIdPut({ id, request }),
    ),
  deleteById: protectedProcedure
    .input(z.number())
    .mutation(({ input }) => sdk.content.v1ContentidDelete({ id: input })),
});
