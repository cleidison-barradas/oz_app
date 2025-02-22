import UserRouter from "./user.route";
import RegionRouter from "./regions.route";

export default {
  "/users": UserRouter,
  "/regions": RegionRouter,
};
