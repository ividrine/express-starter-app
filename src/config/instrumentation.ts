import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { PrismaInstrumentation } from "@prisma/instrumentation";
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

import config from "./config";
import logger from "./logger";

import packageJson from "../../package.json" with { type: "json" };

/**
 * This file is responsible for instrumenting the application and
 * exporting telemetry data using OTLP/HTTP.
 *
 * To accomplish this, it uses a suite of @opentelemetry packages for
 * auto instrumenting packages and exporting traces, metrics, and logs.
 *
 * @see {@link https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/auto-instrumentations-node}
 *
 * Log records are automatically sent to OpenTelemetry Logging SDK
 * simply by having @opentelemetry/winston-transport installed, so
 * there is no need to configure a transport explicitly for winston.
 *
 * @see {@link https://github.com/open-telemetry/opentelemetry-js-contrib/tree/main/packages/winston-transport}
 *
 * Also added here is @prisma/instrumentation to instrument the Prisma client.
 *
 * @see {@link https://github.com/prisma/prisma/tree/main/packages/instrumentation}
 */

const { name, version } = packageJson;

const addInstrumentation = () => {
  // Create a resource with service name and version for Node SDK
  const resource = resourceFromAttributes({
    [ATTR_SERVICE_NAME]: name,
    [ATTR_SERVICE_VERSION]: version
  });

  // Define OTLP exporters
  const traceExporter = new OTLPTraceExporter({
    url: `${config.otel_collector_url}/v1/traces`
  });

  const metricExporter = new OTLPMetricExporter({
    url: `${config.otel_collector_url}/v1/metrics`
  });

  const logsExporter = new OTLPLogExporter({
    url: `${config.otel_collector_url}/v1/logs`
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
      getNodeAutoInstrumentations(),
      new PrismaInstrumentation()
    ]
  });

  sdk.start();

  // Graceful shutdown
  process.on("SIGTERM", () => {
    sdk.shutdown();
  });
};

if (!config.otel_collector_url) {
  logger.warn(
    "OTEL_COLLECTOR_URL is not defined. Telemetry data will not be collected."
  );
} else {
  addInstrumentation();
}
