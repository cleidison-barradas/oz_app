import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import logger from "./config/logger";

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(
  morgan(
    (tokens, req, res) => {
      return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: Number.parseFloat(tokens.status(req, res)),
        content_length: tokens.res(req, res, "content-length"),
        response_time: Number.parseFloat(tokens["response-time"](req, res)),
      });
    },
    {
      stream: {
        write: (message) => {
          logger.http(JSON.parse(message));
        },
      },
    }
  )
);

app.use("/health", (_, res) => {
  const healthcheck = {
    message: "OK",
    uptime: process.uptime(),
    timestamp: Date.now(),
  };

  res.send(healthcheck);
});

export default app;
