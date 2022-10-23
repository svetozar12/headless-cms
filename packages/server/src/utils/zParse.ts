import type { NextFunction, Request, Response } from "express";
import { AnyZodObject, z } from "zod";
import { CustomError } from "../common/errorModel";

const zParse = async <T extends AnyZodObject>(
  schema: T,
  req: Request
): Promise<z.infer<T>> => {
  const zSchema = await schema.safeParseAsync(req);
  if (!zSchema.success)
    return CustomError.badRequest(zSchema.error.message) as any;
  return zSchema.data;
};

// zod middleware to validate schema before parsing
const zMiddleware = <T extends AnyZodObject>(schema: T) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const zSchema = await schema.safeParseAsync(req);
    if (!zSchema.success) {
      const {
        error: { issues },
      } = zSchema;
      issues.forEach((issue) => {
        next(CustomError.badRequest(issue.message));
      });
    }
    next();
  };
};

export { zParse, zMiddleware };
