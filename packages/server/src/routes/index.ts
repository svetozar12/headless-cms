import health from "./health";
import { Application } from "express";
// routes
import auth from "./auth";
import user from "./user";
import contentModel from "./contentModel";
import content from "./content";

const routes = [
  { path: "/health", router: health },
  { path: "/auth", router: auth },
  { path: "/user", router: user },
  { path: "/contentModel.ts", router: contentModel },
  { path: "/content", router: content },
];

const initRoutes = (app: Application) => {
  routes.forEach((route) => {
    const { path, router } = route;
    app.use(path, router);
  });
};

export default initRoutes;
