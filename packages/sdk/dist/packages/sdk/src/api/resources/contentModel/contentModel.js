"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentModel = void 0;
const apiUtil_1 = require("../../apiUtil");
exports.contentModel = {
    getById: (modelId) => (0, apiUtil_1.makeRequest)("get", `/contentModel/${modelId}`, "contentModel", undefined),
    getAll: (page) => (0, apiUtil_1.makeRequest)("get", `/contentModel?page=${page}&pageSize=8`, undefined, undefined),
    createModel: async (model) => (0, apiUtil_1.makeRequest)("post", "/contentModel", undefined, model),
    update: async (modelId, model) => (0, apiUtil_1.makeRequest)("put", `/contentModel/${modelId}`, "contentModel", model),
    delete: async (modelId) => (0, apiUtil_1.makeRequest)("delete", `/contentModel/${modelId}`, "message", undefined),
};
//# sourceMappingURL=contentModel.js.map