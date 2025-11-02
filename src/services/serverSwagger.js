const cors = require("cors");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");
const yaml= require("yamljs");
const path = require("path");
const swaggerDocument = yaml.load("./swagger.yaml");

class ServerSwagger {
  constructor(hostname, port) {
    this.hostname = hostname;
    this.port = port;
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
    this.app.listen(this.port, this.hostname, () => {
      console.log(
        `Servidor Swagger ejecutándose en http://${this.hostname}:${this.port}/api-docs`
      );
    });
  }
}

new ServerSwagger("127.0.0.1", 3002);