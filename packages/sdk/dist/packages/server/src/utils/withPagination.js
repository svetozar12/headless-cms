"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withPagination = void 0;
const withPagination = (page, pageSize) => {
    return { skip: (page - 1) * pageSize, take: pageSize };
};
exports.withPagination = withPagination;
//# sourceMappingURL=withPagination.js.map