import fs from "fs";
import path from "path";
import mongoose from "mongoose";

import config from "../../config";
import logger from "../../config/logger";

export default async function connectDatabase(): Promise<void> {
  try {
    const database = await mongoose.connect(config.database.uri);

    database.connection.on("connected", () => {
      logger.debug(
        `MongoDB connected event connected at: ${config.database.uri}`
      );
    });

    database.connection.on("error", (err) => {
      logger.error(`MongoDB event error: ${err}`);
    });

    database.connection.on("disconnected", () => {
      logger.warn(`MongoDB event: disconnected`);
    });

    process.on("SIGINT", async () => {
      await database.connection.close();
      logger.info("MongoDB connection closed due to app termination");
      process.exit(0);
    });

    const modelsPath = path.join(__dirname, "./models");

    const files = fs.readdirSync(modelsPath);

    for await (const file of files) {
      try {
        if (file.endsWith(".model.ts") || file.endsWith(".model.js")) {
          const modelSchema = require(path.join(modelsPath, file)).default;

          const model = database.model(
            modelSchema._schemaName.toLowerCase(),
            modelSchema._schemaDefinition
          );

          modelSchema._setModel(model);

          await model.syncIndexes();
        }
      } catch (error) {
        throw error;
      }
    }
  } catch (error) {
    logger.error(`Error connecting to the database: ${error}`);
    process.exit(1);
  }
}
