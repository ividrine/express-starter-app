import app from "./app.js";
import config from "./config/config.js";
import logger from "./config/logger.js";
import { initSql, closeSql } from "./lib/prisma/index.js";

(async () => {
  await Promise.all([initSql()]);

  const server = app.listen(config.port, () => {
    logger.info(`Listening on port ${config.port}`);
  });

  const shutdown = async () => {
    await Promise.allSettled([closeSql()]);
    server.close();
  };

  const unexpectedErrorHandler = (error: Error) => {
    logger.error(error);
    shutdown();
  };

  process.on("uncaughtException", unexpectedErrorHandler);
  process.on("unhandledRejection", unexpectedErrorHandler);

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
})();
