import { NextFunction, Request, Response } from "express";
import {
  httpRequestsInFlight,
  httpRequestDuration,
  httpRequestsTotal,
  httpErrorsTotal
} from "../config/metrics.js";
import logger from "../config/logger.js";

const onResponseFinished =
  (req: Request, res: Response, start: number) => () => {
    // Calculate / setup
    const duration = (Date.now() - start) / 1000;

    const labels = {
      method: req.method,
      path: req.path,
      status: res.statusCode
    };

    const isError = res.statusCode >= 400;

    // Record the duration of the request
    httpRequestDuration.record(duration, labels);

    // Increment the total counter
    httpRequestsTotal.add(1, labels);

    // Increment the error counter if the status code is >= 400
    if (isError) {
      httpErrorsTotal.add(1, labels);
    }

    // Decrement the in-flight counter
    httpRequestsInFlight.add(-1, { method: req.method, path: req.path });

    const logData = {
      method: req.method,
      path: req.path,
      status: res.statusCode
    };

    if (isError) {
      logger.error("Http Request Error", logData);
    } else {
      logger.info("Http Request", logData);
    }
  };

const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Increment the in-flight counter
  httpRequestsInFlight.add(1, { method: req.method, path: req.path });

  // Record the start time
  const start = Date.now();

  // Set up the finish handler
  res.on("finish", onResponseFinished(req, res, start));

  // Continue processing the request
  next();
};

export default metricsMiddleware;
