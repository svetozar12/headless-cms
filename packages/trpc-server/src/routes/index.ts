import health from "./health";
import { Application } from "express";
import auth from "./auth";
import user from "./user";

const routes = [
  { path: "/health", router: health },
  { path: "/auth", router: auth },
  { path: "/user", router: user },
];

const initRoutes = (app: Application) => {
  routes.forEach((route) => {
    const { path, router } = route;
    return app.use(path, router);
  });
};

export default initRoutes;
