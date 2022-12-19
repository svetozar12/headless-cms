import { Content as ContentType } from "@headless-cms/server";
export type IContent = Omit<ContentType, "id" | "userId" | "contentModelId">;
export declare const content: {
    getById: (modelId: string) => Promise<ContentType>;
    getAll: (token: string, page?: number) => Promise<{
        pagination: {
            page: number;
            pageSize: number;
            total: number;
        };
        content: ContentType[];
    }>;
    createModel: (model: IContent) => Promise<unknown>;
    update: (modelId: number, model: IContent) => Promise<ContentType>;
    delete: (modelId: number) => Promise<string>;
};
export default content;
