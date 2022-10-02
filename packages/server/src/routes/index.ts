import { Application, Router } from "express";
import health from "./health";
import auth from "./auth";
const routes: { path: string; route: Router }[] = [
  { path: "/health", route: health },
  { path: "/auth", route: auth },
];

const initRoutes = (app: Application) => {
  routes.forEach((routeItem) => {
    const { path, route } = routeItem;
    app.use(path, route);
  });
};

export default initRoutes;
