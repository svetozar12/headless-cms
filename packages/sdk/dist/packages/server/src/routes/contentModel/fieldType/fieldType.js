"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const isAuth_1 = tslib_1.__importDefault(require("../../../middlewares/isAuth"));
const prisma_1 = require("../../../utils/prisma");
const zParse_1 = require("../../../utils/zParse");
const utils_1 = require("../../auth/utils");
const fieldType_schema_1 = require("./fieldType.schema");
const fieldType = (0, express_1.Router)();
fieldType.get("/", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(fieldType_schema_1.getFieldType), async (req, res) => {
    const { params: { contentModelId }, } = await (0, zParse_1.zParse)(fieldType_schema_1.getFieldType, req);
    const fieldTypes = await prisma_1.prisma.fieldType.findMany({
        where: { contentModelId },
    });
    return res.status(201).json({ fieldTypes });
});
fieldType.post("/", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(fieldType_schema_1.createFieldType), async (req, res) => {
    const { body: { title, type }, params: { contentModelId }, } = await (0, zParse_1.zParse)(fieldType_schema_1.createFieldType, req);
    const fieldType = await prisma_1.prisma.fieldType.create({
        data: { title, type, contentModelId },
    });
    // await prisma.contentModel.update({where:{id}})
    return res.status(201).json({ fieldType });
});
fieldType.put("/:id", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(fieldType_schema_1.updateFieldType), async (req, res) => {
    const { body: { title }, params: { contentModelId, id }, } = await (0, zParse_1.zParse)(fieldType_schema_1.updateFieldType, req);
    const fieldType = await prisma_1.prisma.fieldType.update({
        where: { id, contentModelId },
        data: { title },
    });
    return res.status(201).json({ fieldType });
});
fieldType.delete("/:id", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(fieldType_schema_1.deleteFieldType), async (req, res) => {
    const { params: { id, contentModelId }, } = await (0, zParse_1.zParse)(fieldType_schema_1.deleteFieldType, req);
    await prisma_1.prisma.fieldType.delete({
        where: { id, contentModelId },
    });
    return res.status(204).json({ message: "Field was deleted" });
});
exports.default = fieldType;
//# sourceMappingURL=fieldType.js.map