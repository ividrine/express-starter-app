import winston from "winston";
import config from "./config.js";

const { combine, timestamp, json } = winston.format;
const logger = winston.createLogger({
  level: config.env === "development" ? "debug" : "info",
  format: combine(timestamp(), json()),
  transports: [
    new winston.transports.Console({
      stderrLevels: ["error"]
    })
  ]
});

export default logger;
