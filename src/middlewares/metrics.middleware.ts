import { NextFunction, Request, Response } from "express";
import {
  httpRequestsInFlight,
  httpRequestDuration,
  httpRequestsTotal,
  httpRequestSizeBytes,
  httpResponseSizeBytes
} from "../config/metrics";

/**
 * Middleware for recording http request/response metrics
 */

const metricsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Increment the in-flight counter
  httpRequestsInFlight.add(1);

  // Record the start time
  const start = Date.now();

  // Set up the finish handler
  res.on("finish", () => {
    const duration = (Date.now() - start) / 1000;
    const path = req.route?.path ?? req.path;
    const method = req.method;
    const requestSize = parseInt(req.get("content-length") || "0", 10);
    const responseSize = parseInt(res.get("content-length") || "0", 10);
    const status = res.statusCode;

    // Record request duration
    httpRequestDuration.record(duration, { method, path, status });

    // Increment total requests
    httpRequestsTotal.add(1, { method, path, status });

    // Record request size
    if (requestSize > 0) {
      httpRequestSizeBytes.record(requestSize, { method: req.method, path });
    }

    // Record response size
    if (responseSize > 0) {
      httpResponseSizeBytes.record(responseSize, { method: req.method, path });
    }

    // Decrement requests in flight
    httpRequestsInFlight.add(-1);
  });

  // Continue processing the request
  next();
};

export default metricsMiddleware;
