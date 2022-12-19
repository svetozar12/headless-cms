import { FieldTypeEnum } from "@prisma/client";
import { z, ZodType } from "zod";
declare const parseBoolean: z.ZodOptional<z.ZodEffects<z.ZodString, boolean, string>>;
declare const commonUserSchema: z.ZodObject<{
    user: z.ZodObject<{
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
}, "strip", z.ZodTypeAny, {
    user: {
        id: number;
    };
}, {
    user: {
        id: number;
    };
}>;
declare const commonIdParamSchema: z.ZodObject<{
    params: z.ZodObject<{
        id: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: string;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: number;
    };
}, {
    params: {
        id: string;
    };
}>;
declare const parseStringToInt: z.ZodEffects<z.ZodNumber, number, unknown>;
declare const parseJson: z.ZodEffects<z.ZodString, any, string>;
declare const paginationSchema: z.ZodObject<{
    query: z.ZodObject<{
        page: z.ZodDefault<z.ZodEffects<z.ZodNumber, number, unknown>>;
        pageSize: z.ZodDefault<z.ZodEffects<z.ZodNumber, number, unknown>>;
    }, "strip", z.ZodTypeAny, {
        page: number;
        pageSize: number;
    }, {
        page?: unknown;
        pageSize?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    query: {
        page: number;
        pageSize: number;
    };
}, {
    query: {
        page?: unknown;
        pageSize?: unknown;
    };
}>;
declare const fieldType: ZodType<FieldTypeEnum>;
export { fieldType, parseBoolean, parseJson, parseStringToInt, paginationSchema, commonUserSchema, commonIdParamSchema, };
