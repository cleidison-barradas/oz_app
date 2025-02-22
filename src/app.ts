import express, { Application } from "express";
import cors from "cors";
import routes from "./http";
import logger from "./config/logger";
import morganConfig from "./config/morgan";
import { errorHandlerMiddleware } from "./http/middleware/errorHandler.middleware";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(morganConfig(logger));

app.use("/api", routes);

app.use(errorHandlerMiddleware);

export default app;
