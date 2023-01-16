import { Router } from "express";

const nested = Router({ mergeParams: true });
nested.get("/", (req, res) => {
  return res.json({ message: "ok" });
});

nested.get("/:id", (req, res) => {
  return res.json({ message: req.params.id });
});

export default nested;
