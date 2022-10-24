import { jwtType, verifyToken } from "../routes/auth/utils";
import { NextFunction, Request, Response } from "express";
import { CustomError } from "../common/errorModel";

const isAuth = (tokenType: jwtType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader === "undefined")
      return next(CustomError.unauthorized("Unauthorized"));
    const token = bearerHeader.split(" ")[1];
    if (!token) return next(CustomError.unauthorized("Unauthorized"));
    req.user = verifyToken(tokenType, token) as typeof req.user;
    if (!req.user) return next(CustomError.unauthorized("Unauthorized"));
    return next();
  };
};

export default isAuth;
