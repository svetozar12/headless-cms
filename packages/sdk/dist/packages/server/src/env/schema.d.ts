import { z } from "zod";
export declare const serverSchema: z.ZodObject<{
    NODE_ENV: z.ZodDefault<z.ZodEnum<["development", "test", "production"]>>;
    PORT: z.ZodDefault<z.ZodString>;
    DATABASE_URL: z.ZodString;
    JWT_ACCESS_TOKEN_SECRET: z.ZodString;
    JWT_REFRESH_TOKEN_SECRET: z.ZodString;
    JWT_ACCESS_TOKEN_EXPIRES_IN: z.ZodString;
    JWT_REFRESH_TOKEN_EXPIRES_IN: z.ZodString;
    AVATAR_API_PROTOCOL: z.ZodDefault<z.ZodString>;
    AVATAR_API_HOST: z.ZodDefault<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    NODE_ENV: "development" | "test" | "production";
    PORT: string;
    DATABASE_URL: string;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRES_IN: string;
    JWT_REFRESH_TOKEN_EXPIRES_IN: string;
    AVATAR_API_PROTOCOL: string;
    AVATAR_API_HOST: string;
}, {
    NODE_ENV?: "development" | "test" | "production" | undefined;
    PORT?: string | undefined;
    AVATAR_API_PROTOCOL?: string | undefined;
    AVATAR_API_HOST?: string | undefined;
    DATABASE_URL: string;
    JWT_ACCESS_TOKEN_SECRET: string;
    JWT_REFRESH_TOKEN_SECRET: string;
    JWT_ACCESS_TOKEN_EXPIRES_IN: string;
    JWT_REFRESH_TOKEN_EXPIRES_IN: string;
}>;
