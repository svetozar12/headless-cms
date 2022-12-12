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

interface IRoute {
  path: string;
  router: Router;
  middlewares?: Array<(req: Request, res: Response, next: NextFunction) => any>;
}

const routes: IRoute[] = [
  { path: "/health", router: health },
  { path: "/auth", router: auth },
  { path: "/user", router: user },
  {
    path: "/contentModel",
    router: contentModel,
    middlewares: [isAuth(jwtType.ACCESS)],
  },
  { path: "/content", router: content },
];

const initRoutes = (app: Application) => {
  routes.forEach((route) => {
    const { path, router, middlewares } = route;
    if (middlewares) return app.use(path, middlewares, router);
    return app.use(path, router);
  });
};

export default initRoutes;
