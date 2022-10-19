import { Router } from "express";
import isAuth from "../../middlewares/isAuth";
import { jwtType } from "../auth/utils";

const health = Router();
health.get("/", (req, res) => {
  return res.json({ message: "ok" });
});

export default health;
