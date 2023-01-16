import { z } from "zod";

const userSchema = z.object({
  body: z.object({
    username: z.string(),
    password: z.string(),
  }),
});

const updateUserSchema = z.object({
  body: z.object({
    username: z.string().optional(),
  }),
});
export { userSchema, updateUserSchema };
