declare const fieldType: {
    getList: (modelId: string) => Promise<FieldType>;
    create: (title: string, type: FieldTypeEnum, modelId: string) => Promise<FieldType>;
    update: (id: string, title: string, modelId: string) => Promise<FieldType>;
    delete: (id: string, modelId: string) => Promise<string>;
};
export { fieldType };
