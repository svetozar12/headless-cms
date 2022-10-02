import { z } from "zod";

export const serverSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  DISCORD_ID: z.string(),
  DISCORD_SECRET: z.string(),
  DISCORD_CALLBACK: z.string(),
  SESSION_SECRET: z.string(),
  PORT: z.string(),
  CLIENT_URL: z.string(),
  DATABASE_URL: z.string(),
});
