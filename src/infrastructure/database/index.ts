import mongoose from "mongoose";
import config from "../../config";
import logger from "../../config/logger";

export default async function connectDatabase(): Promise<void> {
  try {
    await mongoose.connect(config.database.uri);

    mongoose.connection.on("connected", () => {
      logger.debug(
        `MongoDB connected event connected at: ${config.database.uri}`
      );
    });

    mongoose.connection.on("error", (err) => {
      logger.error(`MongoDB event error: ${err}`);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn(`MongoDB event: disconnected`);
    });

    process.on("SIGINT", async () => {
      await mongoose.connection.close();
      logger.info("MongoDB connection closed due to app termination");
      process.exit(0);
    });
  } catch (error) {
    logger.error(`Error connecting to the database: ${error}`);
    process.exit(1);
  }
}
