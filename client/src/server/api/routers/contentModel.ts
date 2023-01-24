import { z } from "zod";
import { sdk } from "../../../utils/rest-api-sdk";
import { V1ContentModelPostRequest } from "../../../utils/sdk";
import { createTRPCRouter, protectedProcedure } from "../trpc";

const contentSchema = z.object({
  request: z.object({
    name: z.string(),
    userId: z.number(),
  }),
});

export const contentModelRouter = createTRPCRouter({
  getAll: protectedProcedure.query(() => {
    return sdk.contentModel.v1ContentModelGet();
  }),
  create: protectedProcedure
    .input(contentSchema)
    .mutation(({ input: { request } }) =>
      sdk.contentModel.v1ContentModelPost({ request }),
    ),
  updateById: protectedProcedure
    .input(z.object({ id: z.number(), request: contentSchema }))
    .mutation(({ input: { id, request: { request } } }) =>
      sdk.contentModel.v1ContentModelIdPut({ id, request }),
    ),
  deleteById: protectedProcedure
    .input(z.number())
    .mutation(({ input }) =>
      sdk.contentModel.v1ContentModelIdDelete({ id: input }),
    ),
});
