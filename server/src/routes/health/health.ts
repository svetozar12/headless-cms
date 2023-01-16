import { Router } from "express";
import isAuth from "../../middlewares/isAuth";
import { jwtType } from "../auth/utils";
import nested from "./nested";

const health = Router();
health.get("/", (req, res) => {
  return res.json({ message: "oek" });
});

health.get("/:id", (req, res) => {
  return res.json({ message: req.params.id });
});

export default health;
