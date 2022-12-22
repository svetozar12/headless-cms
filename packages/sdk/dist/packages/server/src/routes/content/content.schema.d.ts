import { z } from "zod";
export declare const getContentSchema: z.ZodObject<z.extendShape<z.extendShape<{
    body: z.ZodObject<{
        contentModelId: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        contentModelId: number;
    }, {
        contentModelId?: unknown;
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
        contentModelId: number;
    };
    user: {
        id: number;
    };
}, {
    params: {
        id: string;
    };
    body: {
        contentModelId?: unknown;
    };
    user: {
        id: number;
    };
}>;
export declare const getContentListSchema: z.ZodObject<z.extendShape<z.extendShape<{
    body: z.ZodObject<{
        contentModelId: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        contentModelId: number;
    }, {
        contentModelId?: unknown;
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
    body: {
        contentModelId: number;
    };
    user: {
        id: number;
    };
}, {
    query: {
        page?: unknown;
        pageSize?: unknown;
    };
    body: {
        contentModelId?: unknown;
    };
    user: {
        id: number;
    };
}>;
export declare const createContentSchema: z.ZodObject<z.extendShape<{
    body: z.ZodObject<{
        title: z.ZodString;
        contentModelId: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        contentModelId: number;
        title: string;
    }, {
        contentModelId?: unknown;
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
        contentModelId: number;
        title: string;
    };
    user: {
        id: number;
    };
}, {
    body: {
        contentModelId?: unknown;
        title: string;
    };
    user: {
        id: number;
    };
}>;
export declare const updateContentSchema: z.ZodObject<z.extendShape<z.extendShape<{
    body: z.ZodObject<{
        title: z.ZodOptional<z.ZodString>;
        contentModelId: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        title?: string | undefined;
        contentModelId: number;
    }, {
        contentModelId?: unknown;
        title?: string | undefined;
    }>;
}, {
    params: z.ZodObject<{
        id: z.ZodEffects<z.ZodString, number, string>;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: string;
    }>;
}>, {
    user: z.ZodObject<{
        id: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        id: number;
    }, {
        id: number;
    }>;
}>, "strip", z.ZodTypeAny, {
    params: {
        id: number;
    };
    body: {
        title?: string | undefined;
        contentModelId: number;
    };
    user: {
        id: number;
    };
}, {
    params: {
        id: string;
    };
    body: {
        contentModelId?: unknown;
        title?: string | undefined;
    };
    user: {
        id: number;
    };
}>;
export declare const deleteContentSchema: z.ZodObject<z.extendShape<z.extendShape<{
    body: z.ZodObject<{
        contentModelId: z.ZodEffects<z.ZodNumber, number, unknown>;
    }, "strip", z.ZodTypeAny, {
        contentModelId: number;
    }, {
        contentModelId?: unknown;
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
        contentModelId: number;
    };
    user: {
        id: number;
    };
}, {
    params: {
        id: string;
    };
    body: {
        contentModelId?: unknown;
    };
    user: {
        id: number;
    };
}>;
