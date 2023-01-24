// import { AnyZodObject, z, ZodObject } from "zod";
// import { sdk } from "../../../utils/rest-api-sdk";
// import { V1ContentPostRequest } from "../../../utils/sdk";
// import { createTRPCRouter, protectedProcedure } from "../trpc";
// import { toZod } from "tozod";

// export const contentRouter = createTRPCRouter({
//   getAll: protectedProcedure.query(() => {
//     return sdk.content.v1ContentGet();
//   }),
//   create: protectedProcedure
//     .input(
//       zObject<V1ContentPostRequest>({
//         request: {
//           modelId: z.number(),
//           name: z.string(),
//           userId: z.number(),
//         },
//       }),
//     )
//     .query(({ input }) => {
//       return sdk.content.v1ContentPost({ request });
//     }),
// });
