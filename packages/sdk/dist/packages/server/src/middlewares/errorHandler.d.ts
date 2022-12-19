import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
/**
 * Custom error handler to standardize error objects returned to
 * the client
 *
 * @param err Error caught by Express.js
 * @param req Request object provided by Express
 * @param res Response object provided by Express
 * @param next NextFunction function provided by Express
 */
declare const handleError: (err: ErrorRequestHandler, req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
export default handleError;
