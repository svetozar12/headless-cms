"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const tslib_1 = require("tslib");
//resources
const user_1 = require("./resources/user");
const auth_1 = require("./resources/auth");
const content_1 = require("./resources/content/content");
const contentModel_1 = require("./resources/contentModel/contentModel");
exports.api = {
    user: user_1.user,
    auth: auth_1.auth,
    content: content_1.content,
    contentModel: contentModel_1.contentModel,
};
tslib_1.__exportStar(require("./apiUtil"), exports);
//# sourceMappingURL=index.js.map