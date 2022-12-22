"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const isAuth_1 = tslib_1.__importDefault(require("../../../middlewares/isAuth"));
const prisma_1 = require("../../../utils/prisma");
const zParse_1 = require("../../../utils/zParse");
const utils_1 = require("../../auth/utils");
const field_schema_1 = require("./field.schema");
const field = (0, express_1.Router)();
field.put("/:id", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(field_schema_1.updateFieldList), async (req, res) => {
    const { body: { fields }, params: { contentId }, } = await (0, zParse_1.zParse)(field_schema_1.updateFieldList, req);
    const updatedFields = [];
    for (const { id, value } of fields) {
        const newField = await prisma_1.prisma.fIeld.update({
            where: { id, contentId },
            data: { value: value || undefined },
        });
        updatedFields.push(newField);
    }
    return res.status(201).json({ updatedFields });
});
exports.default = field;
//# sourceMappingURL=field.js.map