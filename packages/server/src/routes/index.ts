import health from "./health";
import { Application, NextFunction, Request, Response, Router } from "express";
// routes
import auth from "./auth";
import user from "./user";
import contentModel from "./contentModel";
import content from "./content";
// middlewares
import isAuth from "../middlewares/isAuth";
import { jwtType } from "./auth/utils";
import nested from "./health/nested";
import field from "./content/field";
import fieldType from "./contentModel/fieldType";

interface IRoute {
  path: string;
  router: Router;
  middlewares?: Array<(req: Request, res: Response, next: NextFunction) => any>;
}

const routes: IRoute[] = [
  { path: "/health", router: health },
  { path: "/health/:healthId/nested", router: nested },
  { path: "/auth", router: auth },
  { path: "/user", router: user },
  {
    path: "/contentModel",
    router: contentModel,
    middlewares: [isAuth(jwtType.ACCESS)],
  },
  {
    path: "/contentModel/:contentModelId/fieldType",
    router: fieldType,
  },
  { path: "/content", router: content },
  { path: "/content/:contentId/field", router: field },
];

const initRoutes = (app: Application) => {
  routes.forEach((route) => {
    const { path, router, middlewares } = route;
    if (middlewares) return app.use(path, middlewares, router);
    return app.use(path, router);
  });
};

export default initRoutes;
