// @ts-check
import { z } from 'zod';
import { parseEnv } from './utils';

/**
 * Specify your server-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 */
export const serverSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.enum(['development', 'test', 'production']),
  NEXTAUTH_SECRET:
    parseEnv('NODE_ENV') === 'production'
      ? z.string().min(1)
      : z.string().min(1).optional(),
  NEXTAUTH_URL: z.preprocess(
    // This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
    // Since NextAuth.js automatically uses the VERCEL_URL if present.
    (str) => parseEnv('VERCEL_URL') ?? str,
    // VERCEL_URL doesn't include `https` so it cant be validated as a URL
    parseEnv('VERCEL') ? z.string() : z.string().url()
  ),
  GITHUB_CLIENT_ID: z.string(),
  GITHUB_CLIENT_SECRET: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object in the Next.js
 * middleware, so you have to do it manually here.
 * @type {{ [k in keyof z.infer<typeof serverSchema>]: z.infer<typeof serverSchema>[k] | undefined }}
 */
export const serverEnv = {
  DATABASE_URL: parseEnv('DATABASE_URL'),
  NODE_ENV: parseEnv('NODE_ENV'),
  NEXTAUTH_SECRET: parseEnv('NEXTAUTH_SECRET'),
  NEXTAUTH_URL: parseEnv('NEXTAUTH_URL'),
  GITHUB_CLIENT_ID: parseEnv('GITHUB_CLIENT_ID'),
  GITHUB_CLIENT_SECRET: parseEnv('GITHUB_CLIENT_SECRET'),
};

/**
 * Specify your client-side environment variables schema here.
 * This way you can ensure the app isn't built with invalid env vars.
 * To expose them to the client, prefix them with `NEXT_PUBLIC_`.
 */
export const clientSchema = z.object({
  // NEXT_PUBLIC_CLIENTVAR: z.string(),
});

/**
 * You can't destruct `process.env` as a regular object, so you have to do
 * it manually here. This is because Next.js evaluates this at build time,
 * and only used environment variables are included in the build.
 * @type {{ [k in keyof z.infer<typeof clientSchema>]: z.infer<typeof clientSchema>[k] | undefined }}
 */
export const clientEnv = {
  // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
};
