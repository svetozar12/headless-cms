"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const schema_1 = require("../../common/schema");
const isAuth_1 = tslib_1.__importDefault(require("../../middlewares/isAuth"));
const preMiddleware_1 = require("../../utils/pre/preMiddleware");
const prisma_1 = require("../../utils/prisma");
const withPagination_1 = require("../../utils/withPagination");
const zParse_1 = require("../../utils/zParse");
const utils_1 = require("../auth/utils");
const contentModel_schema_1 = require("./contentModel.schema");
const contentModel = (0, express_1.Router)();
// current level routes
contentModel.get("/", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(contentModel_schema_1.getAllModelSchema), async (req, res) => {
    const { user: { id }, query: { page, pageSize }, } = await (0, zParse_1.zParse)(contentModel_schema_1.getAllModelSchema, req);
    const totalContentModels = await prisma_1.prisma.contentModel.count();
    const contentModel = await prisma_1.prisma.contentModel.findMany({
        where: { userId: id },
        include: { FIeld: true, Content: true },
        ...(0, withPagination_1.withPagination)(page, pageSize),
    });
    if (contentModel.length === 0)
        return res
            .status(404)
            .json({ message: "You don't have content models !" });
    return res.json({
        contentModel,
        pagination: { page, pageSize, total: totalContentModels },
    });
});
contentModel.get("/:id", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(contentModel_schema_1.getModelSchema), (0, preMiddleware_1.preResource)([preMiddleware_1.Resource.User, preMiddleware_1.Resource.ContentModel]), async (req, res) => {
    const { params: { id }, user: { id: userId }, } = await (0, zParse_1.zParse)(contentModel_schema_1.getModelSchema, req);
    const model = await prisma_1.prisma.contentModel.findFirst({
        where: { id, userId },
        include: { FIeld: true, Content: true },
    });
    return res.json({ contentModel: model });
});
contentModel.put("/:id", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(contentModel_schema_1.updateContentModelSchema), async (req, res) => {
    const { body: { title }, params: { id }, user: { id: userId }, } = await (0, zParse_1.zParse)(contentModel_schema_1.updateContentModelSchema, req);
    const updateContent = await prisma_1.prisma.contentModel.update({
        where: {
            id,
            userId,
        },
        data: {
            title,
        },
    });
    return res.status(201).json({ contentModel: updateContent });
});
contentModel.post("/", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(contentModel_schema_1.createModelSchema), (0, preMiddleware_1.preResource)([preMiddleware_1.Resource.User]), async (req, res) => {
    const { body } = await (0, zParse_1.zParse)(contentModel_schema_1.createModelSchema, req);
    const { id } = req.pre.user;
    const contentModel = await prisma_1.prisma.contentModel.create({
        data: { ...body, userId: id },
    });
    return res.status(201).json({ contentModel });
});
contentModel.delete("/:id", (0, isAuth_1.default)(utils_1.jwtType.ACCESS), (0, zParse_1.zMiddleware)(schema_1.commonIdParamSchema.merge(schema_1.commonUserSchema)), (0, preMiddleware_1.preResource)([preMiddleware_1.Resource.User, preMiddleware_1.Resource.ContentModel]), async (req, res) => {
    const { model } = req.pre;
    await prisma_1.prisma.contentModel.delete({ where: { id: model.id } });
    return res.status(204).json({ message: "Model was deleted" });
});
exports.default = contentModel;
//# sourceMappingURL=contentModel.js.map