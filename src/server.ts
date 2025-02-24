import "dotenv/config";
import app from "./app";
import config from "./config";
import logger from "./config/logger";
import connectDatabase from "./infrastructure/database";

async function startServer() {
  try {
    await connectDatabase();

    app.listen(config.http.port, () => {
      logger.info(`Server listening on port: ${config.http.port}`);
    });
  } catch (error) {
    logger.error("Error starting server: ", error);
    process.exit(1);
  }
}

startServer();
