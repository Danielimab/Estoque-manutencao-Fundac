const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Recurso = sequelize.define("Recurso", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Mantendo a restrição UNIQUE do SQL
  },
  unidade_medida: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantidade: {
    type: DataTypes.FLOAT, // No SQL é NUMERIC, FLOAT é uma aproximação. DECIMAL seria mais preciso se necessário.
    allowNull: false,
    defaultValue: 0.0,
  },
}, {
  tableName: "recurso",
  timestamps: false,
});

module.exports = Recurso;

