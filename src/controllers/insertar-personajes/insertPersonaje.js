const express = require("express");
const cors = require("cors");
const Personaje = require("../../models/personajes");
const sequelize = require("../../models/db");

class InsertPersonaje {
  constructor(hostname, port) {
    this.hostname = hostname;
    this.port = port;
    this.app = express();
    this.app.use(cors());
    this.app.use(express.json());
    this.conectardb();
    this.rutas();
    this.iniciarServidor();
  }
  async conectardb() {
    try {
      await sequelize.authenticate();
      console.log("Conexión a la base de datos establecida correctamente.");
      await sequelize.sync();
      console.log("Modelos sincronizados con la base de datos.");
    } catch (error) {
      console.error("No se pudo conectar a la base de datos:", error);
    }
  }
  rutas() {
    this.app.post("/insertar-personajes", async (req, res) => {
      try {
        const { nombre, edad, altura, constelacion, urlImagen } = req.body;
        const nuevoPersonaje = await Personaje.create({
          nombre,
          edad,
          altura,
          constelacion,
          urlImagen,
        });
        res.status(201).json(nuevoPersonaje);
      } catch (error) {
        console.error("Error al insertar el personaje:", error);
        res.status(500).json({ error: "Error al insertar el personaje" });
      }
    });
  }

  iniciarServidor() {
    this.app.listen(this.port, this.hostname, () => {
      console.log(
        `Servidor ejecutándose en http://${this.hostname}:${this.port}`
      );
    });
  }
}

new InsertPersonaje("127.0.0.1", 3000);