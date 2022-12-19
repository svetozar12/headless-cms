"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvatar = void 0;
const server_1 = require("../env/server");
const uuid_1 = require("uuid");
const { AVATAR_API_HOST, AVATAR_API_PROTOCOL } = server_1.env;
/**
 * Generates random avatar from external api
 * @param {AvatarType} type This is the type of avatar
 */
const getAvatar = (type) => `${AVATAR_API_PROTOCOL}://${AVATAR_API_HOST}/${type}/${(0, uuid_1.v4)()}.svg`;
exports.getAvatar = getAvatar;
//# sourceMappingURL=getAvatar.js.map