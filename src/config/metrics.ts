import { metrics, ValueType } from "@opentelemetry/api";

/**
 * This file defines application metrics
 */

const meter = metrics.getMeter("node-app-meter");

// HTTP request metrics

export const httpRequestDuration = meter.createHistogram(
  "http_request_duration_seconds",
  {
    description: "Duration of HTTP requests in seconds",
    unit: "seconds",
    valueType: ValueType.DOUBLE,
    advice: {
      explicitBucketBoundaries: [0.01, 0.05, 0.1, 0.5, 1, 2, 5]
    }
  }
);

export const httpRequestsTotal = meter.createCounter("http_requests_total", {
  description: "Total number of HTTP requests",
  unit: "1",
  valueType: ValueType.INT
});

export const httpRequestsInFlight = meter.createUpDownCounter(
  "http_requests_in_flight",
  {
    description: "Number of HTTP requests currently in flight",
    unit: "1",
    valueType: ValueType.INT
  }
);

export const httpRequestSizeBytes = meter.createHistogram(
  "http_request_size_bytes",
  {
    description: "Size of HTTP request bodies in bytes",
    unit: "bytes",
    valueType: ValueType.INT,
    advice: {
      explicitBucketBoundaries: [100, 1000, 10000, 100000, 1000000]
    }
  }
);

export const httpResponseSizeBytes = meter.createHistogram(
  "http_response_size_bytes",
  {
    description: "Size of HTTP response bodies in bytes",
    unit: "bytes",
    valueType: ValueType.INT,
    advice: {
      explicitBucketBoundaries: [100, 1000, 10000, 100000, 1000000]
    }
  }
);

// Business metrics

export const userRegistrationsTotal = meter.createCounter(
  "user_registrations_total",
  {
    description: "Total number of user registrations",
    unit: "1",
    valueType: ValueType.INT
  }
);
