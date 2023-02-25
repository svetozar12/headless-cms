import { z } from 'zod';
import { sdk } from '../../rest-api-sdk';
import { paginationSchema } from '../common/pagination';
import { fieldtypeBodySchema } from '../common/zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

export const fieldTypeRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(paginationSchema)
    .query(async ({ input: { offSet, limit } }) => {
      const { data } = await sdk.fieldType.v1FieldTypeGet(offSet, limit);
      return data;
    }),
  create: protectedProcedure
    .input(fieldtypeBodySchema)
    .mutation(async ({ input: { contentModelId, fieldType, name } }) => {
      const { data } = await sdk.fieldType.v1FieldTypePost({
        contentModelId,
        fieldType,
        name,
      });
      return data;
    }),
  updateById: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        request: fieldtypeBodySchema,
      })
    )
    .mutation(
      async ({
        input: {
          id,
          request: { contentModelId, fieldType, name },
        },
      }) => {
        const { data } = await sdk.fieldType.v1FieldTypeIdPut(id, {
          contentModelId,
          fieldType,
          name,
        });
        return data;
      }
    ),
  deleteById: protectedProcedure
    .input(z.number())
    .mutation(async ({ input }) => {
      const { data } = await sdk.fieldType.v1FieldTypeIdDelete(input);
      return data;
    }),
});
