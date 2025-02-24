import morgan from "morgan";
import winston from "winston";

export default function morganConfig(logger: winston.Logger) {
  return morgan(
    (tokens, req, res) => {
      if (parseInt(tokens.status(req, res), 10) !== 200) {
        return JSON.stringify({
          method: tokens.method(req, res),
          url: tokens.url(req, res),
          status: parseInt(tokens.status(req, res), 10),
          response_time: `${tokens["response-time"](req, res)} ms`,
        });
      }
    },
    {
      stream: {
        write: (message) => {
          logger.info(JSON.parse(message));
        },
      },
    }
  );
}
