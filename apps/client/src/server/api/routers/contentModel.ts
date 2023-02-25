import { z } from 'zod';
import { sdk } from '../../rest-api-sdk';
import { paginationSchema } from '../common/pagination';
import { contentmodelBodySchema } from '../common/zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const contentModelRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(paginationSchema)
    .query(async ({ input: { limit, offSet } }) => {
      const { data } = await sdk.contentModel.v1ContentModelGet(offSet, limit);
      return data;
    }),
  getById: protectedProcedure.input(z.number()).query(async ({ input }) => {
    const { data } = await sdk.contentModel.v1ContentModelIdGet(input);
    return data;
  }),
  create: protectedProcedure
    .input(contentmodelBodySchema)
    .mutation(async ({ input: { description, name, userId } }) => {
      const { data } = await sdk.contentModel.v1ContentModelPost({
        description,
        name,
        userId,
      });
      return data;
    }),
  updateById: protectedProcedure
    .input(z.object({ id: z.number(), request: contentmodelBodySchema }))
    .mutation(
      async ({
        input: {
          id,
          request: { description, name, userId },
        },
      }) => {
        const { data } = await sdk.contentModel.v1ContentModelIdPut(id, {
          description,
          name,
          userId,
        });
        return data;
      }
    ),
  deleteById: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const { data } = await sdk.contentModel.v1ContentModelIdDelete(input);
      return data;
    }),
});
