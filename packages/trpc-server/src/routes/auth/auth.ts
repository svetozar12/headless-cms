import { z } from "zod";
import { jwtType, signToken, verifyToken } from "./utils";
import User from "../../libs/sql/models/user.model";
import { Router } from "express";
import { authSchema } from "./schema";
import { zParse } from "../../utils/zParse";
import { JwtPayload } from "jsonwebtoken";

const auth = Router();

auth.post("/", async (req, res) => {
  const {
    body: { grant_type },
  } = await zParse(authSchema, req, res);
  if (grant_type === "password") {
    const { body } = await zParse(authSchema, req, res);
    const { grant_type, ...userObj } = body;
    const user = await User.findOne({ where: { ...userObj } });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });
    const accessToken = await signToken(
      jwtType.ACCESS,
      { id: user.get().id },
      60
    );
    const refreshToken = await signToken(
      jwtType.REFRESH,
      { id: user.get().id },
      120
    );
    return res.status(201).json({ accessToken, refreshToken });
  }
  if (grant_type === "refresh_token") {
    const { body } = await zParse(authSchema, req, res);
    const decodedToken = verifyToken(
      jwtType.REFRESH,
      body.refreshToken as string
    ) as typeof req.user;

    if (!decodedToken)
      return res.status(401).json({ message: "Invalid refresh token" });
    console.log(decodedToken.id, "DECODED TOKEN");
    const user = await User.findOne({
      where: { id: decodedToken.id },
    });
    if (!user) return res.status(404).json({ message: "User doesn't exist" });

    const accessToken = await signToken(
      jwtType.ACCESS,
      { id: user.get().id },
      60
    );

    const refreshToken = await signToken(
      jwtType.REFRESH,
      { id: user.get().id },
      120
    );

    return res.status(201).json({ accessToken, refreshToken });
  }
  return res.status(400).json({ message: "Invalid grant type" });
});

export default auth;
