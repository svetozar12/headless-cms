"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.content = void 0;
const apiUtil_1 = require("../../apiUtil");
exports.content = {
    getById: (modelId) => (0, apiUtil_1.makeRequest)("get", `/content/${modelId}`, "content", undefined),
    getAll: (token, page) => (0, apiUtil_1.makeRequest)("get", `/content?page=${page}&pageSize=8`, undefined, undefined),
    createModel: async (model) => (0, apiUtil_1.makeRequest)("post", "/content", undefined, model),
    update: async (modelId, model) => (0, apiUtil_1.makeRequest)("put", `/content/${modelId}`, "content", model),
    delete: async (modelId) => (0, apiUtil_1.makeRequest)("delete", `/content/${modelId}`, "message", undefined),
};
exports.default = exports.content;
//# sourceMappingURL=content.js.map