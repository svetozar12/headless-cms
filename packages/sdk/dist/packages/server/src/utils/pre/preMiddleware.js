"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.preResource = exports.Resource = void 0;
const user_1 = require("./user");
const contentModel_1 = require("./contentModel");
const errorModel_1 = require("../../common/errorModel");
const content_1 = require("./content");
var Resource;
(function (Resource) {
    Resource["User"] = "user";
    Resource["ContentModel"] = "contentModel";
    Resource["Content"] = "content";
})(Resource = exports.Resource || (exports.Resource = {}));
/**
 * Checks if resource is throwing error*/
const preResource = (resources) => {
    return async (req, res, next) => {
        let resourceResult;
        for (const resource of resources) {
            switch (resource) {
                case Resource.User:
                    resourceResult = await (0, user_1.default)(req);
                    if (resourceResult instanceof errorModel_1.CustomError)
                        next(resourceResult);
                    break;
                case Resource.ContentModel:
                    resourceResult = await (0, contentModel_1.default)(req);
                    if (resourceResult instanceof errorModel_1.CustomError)
                        next(resourceResult);
                    break;
                case Resource.Content:
                    resourceResult = await (0, content_1.preContent)(req);
            }
        }
        next();
    };
};
exports.preResource = preResource;
//# sourceMappingURL=preMiddleware.js.map