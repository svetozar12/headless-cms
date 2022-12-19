import { jwtType } from "../routes/auth/utils";
import { NextFunction, Request, Response } from "express";
declare const isAuth: (tokenType: jwtType) => (req: Request, res: Response, next: NextFunction) => void;
export default isAuth;
