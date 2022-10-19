import { z } from "zod";
import User from "../../libs/sql/models/user.model";
import { Router } from "express";
import { userSchema } from "./schema";
import { zParse } from "../../utils/zParse";
import isAuth from "../../middlewares/isAuth";
import { jwtType } from "../auth/utils";
import { userMeSchema } from "../../common/schema";

const user = Router();

user.get("/me", isAuth(jwtType.ACCESS), async (req, res) => {
  const {
    user: { id },
  } = await zParse(userMeSchema, req, res);
  const user = await User.findOne({ where: { id } });
  if (!user) return res.status(404).json({ message: "User doesn't exist" });
  console.log(user.get(), "USER");
  return res.status(200).json({ ...user.get() });
});

user.post("/", async (req, res) => {
  const { body } = await zParse(userSchema, req, res);
  const isUserExist = await User.findOne({ where: body });
  if (isUserExist)
    return res.status(409).json({ message: "User already exist" });
  const user = await User.create(body);
  return res.status(201).json({ ...user.get() });
});

user.delete("/me", isAuth(jwtType.ACCESS), async (req, res) => {
  const {
    user: { id },
  } = await zParse(userMeSchema, req, res);
  const user = await User.findOne({ where: { id } });
  if (!user) return res.status(404).json({ message: "User doesn't exist" });
  await user.destroy();
  return res.status(204);
});

export default user;
