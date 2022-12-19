import { z } from "zod";
declare const authSchema: z.ZodObject<{
    body: z.ZodEffects<z.ZodObject<{
        username: z.ZodOptional<z.ZodString>;
        password: z.ZodOptional<z.ZodString>;
        refreshToken: z.ZodOptional<z.ZodString>;
        grant_type: z.ZodOptional<z.ZodEnum<["password", "refresh_token"]>>;
    }, "strip", z.ZodTypeAny, {
        username?: string | undefined;
        password?: string | undefined;
        refreshToken?: string | undefined;
        grant_type?: "password" | "refresh_token" | undefined;
    }, {
        username?: string | undefined;
        password?: string | undefined;
        refreshToken?: string | undefined;
        grant_type?: "password" | "refresh_token" | undefined;
    }>, {
        username?: string | undefined;
        password?: string | undefined;
        refreshToken?: string | undefined;
        grant_type?: "password" | "refresh_token" | undefined;
    }, {
        username?: string | undefined;
        password?: string | undefined;
        refreshToken?: string | undefined;
        grant_type?: "password" | "refresh_token" | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        username?: string | undefined;
        password?: string | undefined;
        refreshToken?: string | undefined;
        grant_type?: "password" | "refresh_token" | undefined;
    };
}, {
    body: {
        username?: string | undefined;
        password?: string | undefined;
        refreshToken?: string | undefined;
        grant_type?: "password" | "refresh_token" | undefined;
    };
}>;
export { authSchema };
