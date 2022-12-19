"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fieldType = void 0;
const apiUtil_1 = require("../../../apiUtil");
const fieldType = {
    getList: (modelId) => (0, apiUtil_1.makeRequest)("get", `/contentModel/${modelId}/fieldType`, "fieldTypes"),
    create: (title, type, modelId) => (0, apiUtil_1.makeRequest)("post", `/contentModel/${modelId}/fieldType`, "fieldType", { title, type }),
    update: (id, title, modelId) => (0, apiUtil_1.makeRequest)("put", `/contentModel/${modelId}/fieldType/${id}`, "fieldType", { title }),
    delete: (id, modelId) => (0, apiUtil_1.makeRequest)("delete", `/contentModel/${modelId}/fieldType/${id}`, "message"),
};
exports.fieldType = fieldType;
//# sourceMappingURL=fieldType.js.map