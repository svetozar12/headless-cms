import { z } from "zod";

export const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.string().default("5000"),
  DATABASE_URL: z.string(),
  JWT_ACCESS_TOKEN_SECRET: z.string(),
  JWT_REFRESH_TOKEN_SECRET: z.string(),
  JWT_ACCESS_TOKEN_EXPIRES_IN: z.string(),
  JWT_REFRESH_TOKEN_EXPIRES_IN: z.string(),
  AVATAR_API_PROTOCOL: z.string().default("https"),
  AVATAR_API_HOST: z.string().default("avatars.dicebear.com/api"),
});
