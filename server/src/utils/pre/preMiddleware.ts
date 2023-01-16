import { NextFunction, Request, Response } from "express";
import userMe from "./user";
import contentModel from "./contentModel";
import { CustomError } from "../../common/errorModel";
import { preContent } from "./content";

export enum Resource {
  User = "user",
  ContentModel = "contentModel",
  Content = "content",
}

/**
 * Checks if resource is throwing error*/
export const preResource = (resources: Resource[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    let resourceResult: any;
    for (const resource of resources) {
      switch (resource) {
        case Resource.User:
          resourceResult = await userMe(req);
          if (resourceResult instanceof CustomError) next(resourceResult);
          break;
        case Resource.ContentModel:
          resourceResult = await contentModel(req);
          if (resourceResult instanceof CustomError) next(resourceResult);
          break;
        case Resource.Content:
          resourceResult = await preContent(req);
      }
    }
    next();
  };
};
