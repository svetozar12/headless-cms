"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToken = exports.makeRequest = exports.initApi = void 0;
const axios_1 = require("axios");
const METHOD = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
};
let apiHost;
const initApi = (protocol = "http", host = "localhost", port = 5000) => {
    apiHost = `${protocol}${host}:${port}`;
};
exports.initApi = initApi;
const makeRequest = async (method, path, reqObject, data, options) => {
    if (!apiHost)
        throw new Error("Please initialize sdk");
    try {
        const res = await axios_1.default[method](`${apiHost}${path}`, data, options);
        return reqObject ? res.data[reqObject] : res.data;
    }
    catch (error) {
        return error;
    }
};
exports.makeRequest = makeRequest;
const setToken = (token) => (axios_1.default.defaults.headers.common["Authorization"] = `Bearer ${token}`);
exports.setToken = setToken;
//# sourceMappingURL=apiUtil.js.map