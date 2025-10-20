import { metrics } from "@opentelemetry/api";

const meter = metrics.getMeter("node-app-meter");

export const httpRequestDuration = meter.createHistogram(
  "http_request_duration_seconds",
  {
    description: "Duration of HTTP requests in seconds",
    unit: "seconds",
    valueType: 1,
    advice: {
      explicitBucketBoundaries: [0.01, 0.05, 0.1, 0.5, 1, 2, 5]
    }
  }
);

export const httpRequestsTotal = meter.createCounter("http_requests_total", {
  description: "Total number of HTTP requests",
  unit: "1",
  valueType: 0
});

export const httpErrorsTotal = meter.createCounter("http_errors_total", {
  description: "Total number of HTTP errors (4xx, 5xx)",
  unit: "1",
  valueType: 0
});

export const httpRequestsInFlight = meter.createUpDownCounter(
  "http_requests_in_flight",
  {
    description: "Number of HTTP requests currently in flight",
    unit: "1",
    valueType: 0
  }
);
