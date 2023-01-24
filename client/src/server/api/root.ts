import { createTRPCRouter } from "./trpc";
import { contentRouter } from "./routers/content";
import { contentModelRouter } from "./routers/contentModel";
import { fieldRouter } from "./routers/field";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  content: contentRouter,
  contentModel: contentModelRouter,
  field: fieldRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
