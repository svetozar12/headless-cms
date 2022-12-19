import { NextFunction, Request, Response } from "express";
export declare enum Resource {
    User = "user",
    ContentModel = "contentModel",
    Content = "content"
}
/**
 * Checks if resource is throwing error*/
export declare const preResource: (resources: Resource[]) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
