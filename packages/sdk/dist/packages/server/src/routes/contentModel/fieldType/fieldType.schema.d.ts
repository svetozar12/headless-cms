import { z } from "zod";
export declare const getFieldType: z.ZodObject<{
    params: z.ZodObject<{
        contentModelId: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        contentModelId: number;
    }, {
        contentModelId?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        contentModelId: number;
    };
}, {
    params: {
        contentModelId?: unknown;
    };
}>;
export declare const createFieldType: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodString;
        type: z.ZodType<import(".prisma/client").FieldTypeEnum, z.ZodTypeDef, import(".prisma/client").FieldTypeEnum>;
    }, "strip", z.ZodTypeAny, {
        type: import(".prisma/client").FieldTypeEnum;
        title: string;
    }, {
        type: import(".prisma/client").FieldTypeEnum;
        title: string;
    }>;
    params: z.ZodObject<{
        contentModelId: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        contentModelId: number;
    }, {
        contentModelId?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        contentModelId: number;
    };
    body: {
        type: import(".prisma/client").FieldTypeEnum;
        title: string;
    };
}, {
    params: {
        contentModelId?: unknown;
    };
    body: {
        type: import(".prisma/client").FieldTypeEnum;
        title: string;
    };
}>;
export declare const updateFieldType: z.ZodObject<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title?: string | undefined;
    }, {
        title?: string | undefined;
    }>;
    params: z.ZodObject<{
        contentModelId: z.ZodEffects<z.ZodNumber, number, unknown>;
        id: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        contentModelId: number;
    }, {
        id?: unknown;
        contentModelId?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: number;
        contentModelId: number;
    };
    body: {
        title?: string | undefined;
    };
}, {
    params: {
        id?: unknown;
        contentModelId?: unknown;
    };
    body: {
        title?: string | undefined;
    };
}>;
export declare const deleteFieldType: z.ZodObject<{
    params: z.ZodObject<{
        contentModelId: z.ZodEffects<z.ZodNumber, number, unknown>;
        id: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        id: number;
        contentModelId: number;
    }, {
        id?: unknown;
        contentModelId?: unknown;
    }>;
}, "strip", z.ZodTypeAny, {
    params: {
        id: number;
        contentModelId: number;
    };
}, {
    params: {
        id?: unknown;
        contentModelId?: unknown;
    };
}>;
