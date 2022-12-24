import { ContentModel, ContentModelWithRelations } from "@headless-cms/server";
export type IContentModel = Omit<ContentModel, "id" | "userId">;
export declare const contentModel: {
    getById: (modelId: string) => Promise<ContentModelWithRelations>;
    getAll: (page?: number) => Promise<{
        pagination: {
            page: number;
            pageSize: number;
            total: number;
        };
        contentModel: ContentModelWithRelations[];
    }>;
    createModel: (model: IContentModel) => Promise<unknown>;
    update: (modelId: number, model: IContentModel) => Promise<ContentModelWithRelations>;
    delete: (modelId: number) => Promise<string>;
};
