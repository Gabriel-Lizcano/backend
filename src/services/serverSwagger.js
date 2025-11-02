const cors = require("cors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const yaml= require("yamljs");
const path = require("path");
const swaggerDocument = yaml.load(path.join(__dirname, "swagger.yaml"));

class ServerSwagger {
  constructor() {
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.rutas();
    this.iniciarServidor();
  }
    rutas() {
    this.app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
    iniciarServidor() {
      const port = process.env.PORT  || 3002;
      const host = "0.0.0.0";
    this.app.listen(port, host, () => {
      console.log(
        `Servidor Swagger ejecutándose en http://${host}:${port}/api-docs`
      );
    });
  }
}

new ServerSwagger();