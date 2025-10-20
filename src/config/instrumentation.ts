import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { OTLPMetricExporter } from "@opentelemetry/exporter-metrics-otlp-http";
import { PeriodicExportingMetricReader } from "@opentelemetry/sdk-metrics";
import { resourceFromAttributes } from "@opentelemetry/resources";
import { OTLPLogExporter } from "@opentelemetry/exporter-logs-otlp-http";
import { SimpleLogRecordProcessor } from "@opentelemetry/sdk-logs";
import {
  ATTR_SERVICE_NAME,
  ATTR_SERVICE_VERSION
} from "@opentelemetry/semantic-conventions";

import packageJson from "../../package.json" with { type: "json" };

/**
 * This module is responsible for instrumenting the application to collect
 * and export traces, metrics, and logs in OTLP format to Alloy via HTTP.
 *
 * It uses a suite of @opentelemetry packages, namely @opentelemetry/auto-instrumentations-node
 * to automatically instrument common node packages - for us that is winston, http and express.
 *
 * @see {@link https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/auto-instrumentations-node}
 *
 * Log records are automatically sent to OpenTelemetry Logging SDK
 * simply by having @opentelemetry/winston-transport installed when using
 * @opentelemetry/instrumentation-winston. Which applies here since
 * we are using it via @opentelemetry/auto-instrumentations-node, so
 * there is no need to configure a transport explicitly for winston.
 *
 * @see {@link https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/winston-transport}
 */

const { version } = packageJson;

if (!process.env.OTEL_COLLECTOR_URL) {
  throw new Error("OTEL_COLLECTOR_URL is not defined");
}

const collectorUrl = process.env.OTEL_COLLECTOR_URL;

// Create a resource with service name and version for Node SDK

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: "node-app",
  [ATTR_SERVICE_VERSION]: version
});

// Define otel exporters

const traceExporter = new OTLPTraceExporter({
  url: `${collectorUrl}/v1/traces`,
  headers: {}
});

const metricExporter = new OTLPMetricExporter({
  url: `${collectorUrl}/v1/metrics`,
  headers: {}
});

const logsExporter = new OTLPLogExporter({
  url: `${collectorUrl}/v1/logs`,
  headers: {}
});

// Define metric reader

const metricReader = new PeriodicExportingMetricReader({
  exporter: metricExporter,
  exportIntervalMillis: 10000 // Export metrics every 10s
});

// Define log record processor

const logRecordProcessor = new SimpleLogRecordProcessor(logsExporter);

// Initialize Node SDK

const sdk = new NodeSDK({
  resource,
  traceExporter,
  metricReader,
  logRecordProcessors: [logRecordProcessor],
  instrumentations: [
    getNodeAutoInstrumentations({
      "@opentelemetry/instrumentation-winston": {
        logHook: (span, record) => {
          span.setAttribute("log.message", record.message);
          span.setAttribute("log.level", record.level);
        }
      }
    })
  ]
});

sdk.start();

// Graceful shutdown
process.on("SIGTERM", () => {
  sdk.shutdown();
});
