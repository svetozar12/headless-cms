"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setToken = exports.makeRequest = exports.initApi = void 0;
const tslib_1 = require("tslib");
const axios_1 = tslib_1.__importDefault(require("axios"));
const METHOD = {
    GET: "get",
    POST: "post",
    PUT: "put",
    DELETE: "delete",
};
let apiHost;
const initApi = (protocol = "http", host = "localhost", port = 5000) => {
    apiHost = `${protocol}://${host}:${port}`;
    console.log(apiHost);
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
        let errorMessage = "Internal Sdk error";
        if (axios_1.default.isAxiosError(error)) {
            errorMessage = error.response?.data.message;
        }
        throw new Error(errorMessage);
    }
};
exports.makeRequest = makeRequest;
const setToken = (token) => {
    axios_1.default.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};
exports.setToken = setToken;
//# sourceMappingURL=apiUtil.js.map