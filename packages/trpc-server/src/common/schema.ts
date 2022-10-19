import { z } from "zod";

const userMeSchema = z.object({
  user: z.object({
    id: z.number(),
  }),
});

export { userMeSchema };
