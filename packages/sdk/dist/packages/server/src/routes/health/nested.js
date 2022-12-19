"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const nested = (0, express_1.Router)({ mergeParams: true });
nested.get("/", (req, res) => {
    return res.json({ message: "ok" });
});
nested.get("/:id", (req, res) => {
    return res.json({ message: req.params.id });
});
exports.default = nested;
//# sourceMappingURL=nested.js.map