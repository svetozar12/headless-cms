export declare const api: {
    user: {
        getMe: () => Promise<import(".prisma/client").User>;
        create: (user: {
            username: string;
            password: string;
        }) => Promise<{
            user: import(".prisma/client").User;
            accessToken: string;
            refreshToken: string;
        }>;
    };
    auth: {
        auth: (grant_type: "password" | "refresh_token", password?: {
            username: string;
            password: string;
        } | undefined, refreshToken?: string | undefined) => Promise<string | import("./resources/auth").IAuthResource>;
    };
    content: {
        getById: (modelId: string) => Promise<import(".prisma/client").Content>;
        getAll: (token: string, page?: number | undefined) => Promise<{
            pagination: {
                page: number;
                pageSize: number;
                total: number;
            };
            content: import(".prisma/client").Content[];
        }>;
        createModel: (model: import("./resources/content/content").IContent) => Promise<unknown>;
        update: (modelId: number, model: import("./resources/content/content").IContent) => Promise<import(".prisma/client").Content>;
        delete: (modelId: number) => Promise<string>;
    };
    contentModel: {
        getById: (modelId: string) => Promise<import(".prisma/client").ContentModel & {
            Content: import(".prisma/client").Content[];
            FIeld: import(".prisma/client").FieldType[];
        }>;
        getAll: (page?: number | undefined) => Promise<{
            pagination: {
                page: number;
                pageSize: number;
                total: number;
            };
            contentModel: (import(".prisma/client").ContentModel & {
                Content: import(".prisma/client").Content[];
                FIeld: import(".prisma/client").FieldType[];
            })[];
        }>;
        createModel: (model: import("./resources/contentModel/contentModel").IContentModel) => Promise<unknown>;
        update: (modelId: number, model: import("./resources/contentModel/contentModel").IContentModel) => Promise<import(".prisma/client").ContentModel & {
            Content: import(".prisma/client").Content[];
            FIeld: import(".prisma/client").FieldType[];
        }>;
        delete: (modelId: number) => Promise<string>;
    };
};
export * from "./apiUtil";
