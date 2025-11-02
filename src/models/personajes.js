const {DataTypes} = require("sequelize");
const sequelize = require("./db");

const Personaje = sequelize.define("Personaje", {
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  edad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  altura: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  constelacion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  urlImagen: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
},
{
  tableName: "personajes",
  timestamps: false,
});

module.exports = Personaje;