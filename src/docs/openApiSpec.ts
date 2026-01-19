import swaggerJsdoc from "swagger-jsdoc";
import packageJson from "../../package.json" with { type: "json" };
import config from "../config/config.js";

const { version } = packageJson;

const options = {
  definition: {
    openapi: "3.1.1",
    info: {
      title: "Express App API Documentation",
      version,
      description: "",
      license: {
        name: "MIT",
        url: "https://github.com/ividrine/express-starter-app/blob/main/LICENSE"
      }
    },
    servers: [
      {
        url: `http://localhost:${config.port}/v1`
      }
    ]
  },
  apis: ["src/docs/*.yaml", "src/routes/v1/*.ts"]
};

const openApiSpec = swaggerJsdoc(options);

export default openApiSpec;
