"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preContent = void 0;
const tslib_1 = require("tslib");
const prisma_1 = require("../prisma");
const contentModel_1 = tslib_1.__importDefault(require("./contentModel"));
const errorModel_1 = require("../../common/errorModel");
const logger_1 = tslib_1.__importDefault(require("../logger"));
const preContent = async (req) => {
    await (0, contentModel_1.default)(req);
    const { model } = req.pre;
    const content = await prisma_1.prisma.content.findFirst({
        where: { contentModelId: model.id },
    });
    //@ts-ignore
    if (!content)
        return errorModel_1.CustomError.notFound("You don't have content !");
    (0, logger_1.default)([content, "biggerstas"]);
    req.pre.content = content;
};
exports.preContent = preContent;
//# sourceMappingURL=content.js.map