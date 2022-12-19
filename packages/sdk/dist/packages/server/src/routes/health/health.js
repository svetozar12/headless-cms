"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const health = (0, express_1.Router)();
health.get("/", (req, res) => {
    return res.json({ message: "oek" });
});
health.get("/:id", (req, res) => {
    return res.json({ message: req.params.id });
});
exports.default = health;
//# sourceMappingURL=health.js.map