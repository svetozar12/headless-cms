"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const isAuth_1 = require("../../middlewares/isAuth");
const prisma_1 = require("../../utils/prisma");
const withPagination_1 = require("../../utils/withPagination");
const zParse_1 = require("../../utils/zParse");
const utils_1 = require("../auth/utils");
const content_schema_1 = require("./content.schema");
const content = (0, express_1.Router)();
// current level routes
content.get("/", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(content_schema_1.getContentListSchema), async (req, res) => {
    const { query: { page, pageSize }, body: { contentModelId }, user: { id: userId }, } = await (0, zParse_1.zParse)(content_schema_1.getContentListSchema, req);
    const totalContent = await prisma_1.prisma.content.count();
    const content = await prisma_1.prisma.content.findMany({
        where: { contentModelId, userId },
        include: { FIeld: true },
        ...(0, withPagination_1.withPagination)(page, pageSize),
    });
    return res
        .status(200)
        .json({ content, pagination: { page, pageSize, total: totalContent } });
});
content.get("/:id", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(content_schema_1.getContentSchema), async (req, res) => {
    const { params: { id }, body: { contentModelId }, user: { id: userId }, } = await (0, zParse_1.zParse)(content_schema_1.getContentSchema, req);
    const content = await prisma_1.prisma.content.findMany({
        where: { id, contentModelId, userId },
    });
    return res.status(200).json({ content });
});
content.post("/", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(content_schema_1.createContentSchema), async (req, res) => {
    const { body: { title, contentModelId }, user: { id: userId }, } = await (0, zParse_1.zParse)(content_schema_1.createContentSchema, req);
    const content = await prisma_1.prisma.content.create({
        data: {
            title,
            contentModelId,
            userId,
        },
    });
    const fieldTypes = await prisma_1.prisma.fieldType.findMany({
        where: { id: contentModelId },
    });
    const { id: contentId } = content;
    for (const { id: fieldTypeId, title } of fieldTypes) {
        await prisma_1.prisma.fIeld.create({
            data: { fieldTypeId, contentId, title },
        });
    }
    return res.status(201).json({ content });
});
content.put("/:id", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(content_schema_1.updateContentSchema), async (req, res) => {
    const { body: { title, contentModelId }, params: { id }, user, } = await (0, zParse_1.zParse)(content_schema_1.updateContentSchema, req);
    const updateContent = await prisma_1.prisma.content.update({
        where: {
            id,
            userId: user.id,
            contentModelId,
        },
        data: {
            title: title,
        },
    });
    return res.status(201).json({ content: updateContent });
});
content.delete("/:id", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(content_schema_1.deleteContentSchema), async (req, res) => {
    const { body: { contentModelId }, params: { id }, user: { id: userId }, } = await (0, zParse_1.zParse)(content_schema_1.deleteContentSchema, req);
    await prisma_1.prisma.content.delete({
        where: { id, contentModelId, userId },
    });
    return res.status(204).json({ message: "Content was deleted" });
});
exports.default = content;
//# sourceMappingURL=content.js.map