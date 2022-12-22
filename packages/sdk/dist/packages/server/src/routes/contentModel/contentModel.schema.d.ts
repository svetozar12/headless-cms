import { z } from "zod";
export declare const getModelSchema: z.ZodObject<z.extendShape<{
    user: z.ZodObject<{
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
}, {
    params: z.ZodObject<{
        id: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: string;
    }>;
}>, "strip", z.ZodTypeAny, {
    params: {
        id: number;
    };
    user: {
        id: number;
    };
}, {
    params: {
        id: string;
    };
    user: {
        id: number;
    };
}>;
export declare const getAllModelSchema: z.ZodObject<z.extendShape<{
    user: z.ZodObject<{
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
}, {
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
}>, "strip", z.ZodTypeAny, {
    query: {
        page: number;
        pageSize: number;
    };
    user: {
        id: number;
    };
}, {
    query: {
        page?: unknown;
        pageSize?: unknown;
    };
    user: {
        id: number;
    };
}>;
export declare const createModelSchema: z.ZodObject<z.extendShape<{
    body: z.ZodObject<{
        title: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        title: string;
    }, {
        title: string;
    }>;
}, {
    user: z.ZodObject<{
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
}>, "strip", z.ZodTypeAny, {
    body: {
        title: string;
    };
    user: {
        id: number;
    };
}, {
    body: {
        title: string;
    };
    user: {
        id: number;
    };
}>;
export declare const updateContentModelSchema: z.ZodObject<z.extendShape<z.extendShape<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        title?: string | undefined;
    }, {
        title?: string | undefined;
    }>;
}, {
    user: z.ZodObject<{
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
}>, {
    params: z.ZodObject<{
        id: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: string;
    }>;
}>, "strip", z.ZodTypeAny, {
    params: {
        id: number;
    };
    body: {
        title?: string | undefined;
    };
    user: {
        id: number;
    };
}, {
    params: {
        id: string;
    };
    body: {
        title?: string | undefined;
    };
    user: {
        id: number;
    };
}>;
