import { z } from "zod";
export declare const updateFieldList: z.ZodObject<{
    body: z.ZodObject<{
        fields: z.ZodArray<z.ZodObject<{
            id: z.ZodEffects<z.ZodNumber, number, unknown>;
            value: z.ZodOptional<z.ZodAny>;
        }, "strip", z.ZodTypeAny, {
            value?: any;
            id: number;
        }, {
            value?: any;
            id?: unknown;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        fields: {
            value?: any;
            id: number;
        }[];
    }, {
        fields: {
            value?: any;
            id?: unknown;
        }[];
    }>;
    params: z.ZodObject<{
        contentId: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        contentId: number;
    }, {
        contentId?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        contentId: number;
    };
    body: {
        fields: {
            value?: any;
            id: number;
        }[];
    };
}, {
    params: {
        contentId?: unknown;
    };
    body: {
        fields: {
            value?: any;
            id?: unknown;
        }[];
    };
}>;
