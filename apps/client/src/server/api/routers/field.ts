import { z } from 'zod';
import { sdk } from '../../rest-api-sdk';
import { paginationSchema } from '../common/pagination';
import { fieldBodySchema } from '../common/zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const fieldRouter = createTRPCRouter({
  getById: protectedProcedure.input(z.number()).query(async ({ input }) => {
    const { data } = await sdk.field.v1FieldIdGet(input);
    return data;
  }),
  getAll: protectedProcedure
    .input(z.object({ pagination: paginationSchema, contentId: z.number() }))
    .query(
      async ({
        input: {
          pagination: { limit, offSet },
          contentId,
        },
      }) => {
        const { data } = await sdk.field.v1FieldGet(contentId, offSet, limit);
        return data;
      }
    ),
  create: protectedProcedure
    .input(fieldBodySchema)
    .mutation(async ({ input: { contentId, name, typeId, value } }) => {
      const { data } = await sdk.field.v1FieldPost({
        contentId,
        name,
        typeId,
        value,
      });
      return data;
    }),
  updateById: protectedProcedure
    .input(z.object({ id: z.number(), request: fieldBodySchema }))
    .mutation(
      async ({
        input: {
          id,
          request: { contentId, name, typeId, value },
        },
      }) => {
        const { data } = await sdk.field.v1FieldIdPut(id, {
          contentId,
          name,
          typeId,
          value,
        });
        return data;
      }
    ),
  deleteById: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const { data } = await sdk.field.v1FieldIdDelete(input);
      return data;
    }),
});
