import { extractToken, jwtType, verifyToken } from "../routes/auth/utils";
import { Request, Response, NextFunction } from "express";

const isAuth = (tokenType: jwtType) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader === "undefined")
      return res.status(403).send("Forbidden");
    const token = bearerHeader.split(" ")[1];
    if (!token) return res.status(403).send("Forbidden");
    req.user = verifyToken(tokenType, token) as typeof req.user;
    if (req.user) return next();
    else return res.status(403).send("Forbidden");
  };
};

export default isAuth;
