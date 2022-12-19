"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../prisma");
const zParse_1 = require("../zParse");
const schema_1 = require("../../common/schema");
const errorModel_1 = require("../../common/errorModel");
const contentModel = async (req) => {
    const { user: { id }, params: { id: modelId }, } = await (0, zParse_1.zParse)(schema_1.commonUserSchema.merge(schema_1.commonIdParamSchema), req);
    const model = await prisma_1.prisma.contentModel.findFirst({
        where: { userId: id, id: modelId },
    });
    //@ts-ignore
    if (!model)
        return errorModel_1.CustomError.notFound("You don't have content models !");
    req.pre.model = model;
};
exports.default = contentModel;
//# sourceMappingURL=contentModel.js.map