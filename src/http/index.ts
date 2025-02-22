import { Router } from "express";
import routes from "./routes";
import path from "path";

const appRouter = Router();

Object.keys(routes).forEach((key) => {
  const _route = routes[key];

  appRouter.use(path.join("/", key), _route);
});

export default appRouter;
