import { z } from 'zod';
import { sdk } from '../../rest-api-sdk';
import { paginationSchema } from '../common/pagination';
import { contentBodySchema } from '../common/zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const contentRouter = createTRPCRouter({
  get: protectedProcedure.input(z.number()).query(async ({ input }) => {
    const { data } = await sdk.content.v1ContentIdGet(input);
    return data;
  }),
  getAll: protectedProcedure
    .input(z.object({ pagination: paginationSchema, userId: z.string() }))
    .query(
      async ({
        input: {
          pagination: { limit, offSet },
          userId,
        },
      }) => {
        const { data } = await sdk.content.v1ContentGet(userId, offSet, limit);
        return data;
      }
    ),
  create: protectedProcedure
    .input(contentBodySchema)
    .mutation(async ({ input: { modelId, name, userId } }) => {
      const { data } = await sdk.content.v1ContentPost({
        modelId,
        name,
        userId,
      });
      return data;
    }),
  updateById: protectedProcedure
    .input(z.object({ id: z.number(), request: contentBodySchema }))
    .mutation(
      async ({
        input: {
          id,
          request: { modelId, name, userId },
        },
      }) => {
        const { data } = await sdk.content.v1ContentIdPut(id, {
          modelId,
          name,
          userId,
        });
        return data;
      }
    ),
  deleteById: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const { data } = await sdk.content.v1ContentIdDelete(input);
      return data;
    }),
});
