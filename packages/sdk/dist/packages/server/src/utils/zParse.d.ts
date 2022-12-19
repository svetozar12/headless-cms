import type { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";
declare const zParse: <T extends AnyZodObject>(schema: T, req: Request) => Promise<z.TypeOf<T>>;
declare const zMiddleware: <T extends AnyZodObject>(schema: T) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
export { zParse, zMiddleware };
