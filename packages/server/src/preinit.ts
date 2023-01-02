import { NextFunction, Request, Response } from "express";

export const init = (res: Response, req: Request, next: NextFunction) => {
  req.pre = {} as any;
  next();
};
