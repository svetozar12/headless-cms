import { jwtType, verifyToken } from "../routes/auth/utils";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../common/errorModel";

const isAuth = (tokenType: jwtType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader === "undefined")
      return next(CustomError.unauthorized("Forbidden"));
    const token = bearerHeader.split(" ")[1];
    if (!token) return res.status(403).send("Forbidden");
    req.user = verifyToken(tokenType, token) as typeof req.user;
    if (!req.user) res.status(403).send("Forbidden");
    return next();
  };
};

export default isAuth;
