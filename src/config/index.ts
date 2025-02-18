export default {
  http: {
    port: Number(process.env.HTTP_SERVER_PORT || process.env.PORT || 8001),
  },
  database: {
    uri: `mongodb://${process.env.MONGO_INITDB_HOST || "localhost"}:${
      process.env.MONGO_INITDB_PORT || 27017
    }/${process.env.MONGO_INITDB_DATABASE || "mydb"}`,
  },
  logger: {
    level: process.env.LOG_LEVEL || "info",
  },
};
