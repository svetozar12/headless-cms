import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import logger from "../utils/logger";
import { CustomError } from "../common/errorModel";
import { ZodError } from "zod";

/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */

const handleError = (
  err: ErrorRequestHandler,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger([err, "errorHandler"]);

  if (err instanceof CustomError) {
    return res.status(err.status).json({ message: err.message });
  }
  if (err instanceof ZodError) {
    return res.status(400).json({ message: err.message });
  }

  logger(["error", err]);
  return res.status(500).json({ Message: "Internal server error" });
};

export default handleError;
