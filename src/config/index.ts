export default {
  http: {
    port: Number(process.env.HTTP_SERVER_PORT || process.env.PORT || 8001),
  },
  database: {
    uri: `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${
      process.env.MONGO_INITDB_ROOT_PASSWORD
    }@${process.env.MONGO_INITDB_HOST || "localhost"}:${
      process.env.MONGO_INITDB_PORT || 27017
    }/${process.env.MONGO_INITDB_DATABASE || "mydb"}?authSource=admin`,
  },
  logger: {
    level: process.env.LOG_LEVEL || "info",
  },
  geocoding: {
    geocoding_api_url: process.env.GEOCODING_API_URL,
    reverse_geocoding_api_url: process.env.REVERSE_API_URL,
    geocoding_api_key: process.env.GEOCODING_API_TOKEN,
  },
};
