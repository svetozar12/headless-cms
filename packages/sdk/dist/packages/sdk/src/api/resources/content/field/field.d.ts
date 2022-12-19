declare const field: {
    update: (fields: {
        id: string;
        value: any;
    }, contentId: string) => Promise<string>;
};
export { field };
