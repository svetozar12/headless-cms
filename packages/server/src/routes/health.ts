import { Router } from "express";

const health = Router();

health.get("/", (req, res) => {
  res.send("OK").status(200);
});

export default health;
