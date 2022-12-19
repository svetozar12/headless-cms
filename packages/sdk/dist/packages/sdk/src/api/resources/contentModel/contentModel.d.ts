import { ContentModel, ContentModelWithRelations } from "@headless-cms/server";
export type IContentModel = Omit<ContentModel, "id" | "userId">;
export declare const contentModel: {
    getById: (modelId: string) => Promise<ContentModel & {
        Content: import(".prisma/client").Content[];
        FIeld: import(".prisma/client").FieldType[];
    }>;
    getAll: (page?: number) => Promise<{
        pagination: {
            page: number;
            pageSize: number;
            total: number;
        };
        contentModel: ContentModelWithRelations[];
    }>;
    createModel: (model: IContentModel) => Promise<unknown>;
    update: (modelId: number, model: IContentModel) => Promise<ContentModel & {
        Content: import(".prisma/client").Content[];
        FIeld: import(".prisma/client").FieldType[];
    }>;
    delete: (modelId: number) => Promise<string>;
};
