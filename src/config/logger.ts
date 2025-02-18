import { createLogger, format, transports } from "winston";
const { combine, json, timestamp } = format;
import config from "./";

const logger = createLogger({
  level: config.logger.level,
  format: combine(
    timestamp({
      format: "DD/MM/YYYY-HH:mm:ss",
    }),
    json()
  ),
  transports: [new transports.Console()],
});

export default logger;
