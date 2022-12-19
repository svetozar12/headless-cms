import { z } from "zod";
declare const userSchema: z.ZodObject<{
    body: z.ZodObject<{
        username: z.ZodString;
        password: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        username: string;
        password: string;
    }, {
        username: string;
        password: string;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        username: string;
        password: string;
    };
}, {
    body: {
        username: string;
        password: string;
    };
}>;
declare const updateUserSchema: z.ZodObject<{
    body: z.ZodObject<{
        username: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        username?: string | undefined;
    }, {
        username?: string | undefined;
    }>;
}, "strip", z.ZodTypeAny, {
    body: {
        username?: string | undefined;
    };
}, {
    body: {
        username?: string | undefined;
    };
}>;
export { userSchema, updateUserSchema };
