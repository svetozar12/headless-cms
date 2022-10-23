import { z } from "zod";

const userSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
});

export { userSchema };
