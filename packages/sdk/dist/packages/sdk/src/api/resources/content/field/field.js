"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.field = void 0;
const apiUtil_1 = require("../../../apiUtil");
const field = {
    update: (fields, contentId) => (0, apiUtil_1.makeRequest)("put", `/content/${contentId}/field`, "message", { fields }),
};
exports.field = field;
//# sourceMappingURL=field.js.map