export declare const api: {
    user: {
        getMe: () => Promise<User>;
        create: (user: {
            username: string;
            password: string;
        }) => Promise<{
            user: User;
            accessToken: string;
            refreshToken: string;
        }>;
    };
    auth: {
        auth: (grant_type: "password" | "refresh_token", password?: {
            username: string;
            password: string;
        } | undefined, refreshToken?: string | undefined) => Promise<import("./resources/auth").IAuthResource>;
    };
    content: {
        getById: (modelId: string) => Promise<ContentType>;
        getAll: (token: string, page?: number | undefined) => Promise<{
            pagination: {
                page: number;
                pageSize: number;
                total: number;
            };
            content: ContentType[];
        }>;
        createModel: (model: import("./resources/content/content").IContent) => Promise<unknown>;
        update: (modelId: number, model: import("./resources/content/content").IContent) => Promise<ContentType>;
        delete: (modelId: number) => Promise<string>;
    };
    contentModel: {
        getById: (modelId: string) => Promise<ContentModelWithRelations>;
        getAll: (page?: number | undefined) => Promise<{
            pagination: {
                page: number;
                pageSize: number;
                total: number;
            };
            contentModel: ContentModelWithRelations[];
        }>;
        createModel: (model: import("./resources/contentModel/contentModel").IContentModel) => Promise<unknown>;
        update: (modelId: number, model: import("./resources/contentModel/contentModel").IContentModel) => Promise<ContentModelWithRelations>;
        delete: (modelId: number) => Promise<string>;
    };
};
export * from "./apiUtil";
