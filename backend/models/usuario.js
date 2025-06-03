const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");

const Usuario = sequelize.define("Usuario", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING, // No SQL original é TEXT, STRING é adequado. Lembrete sobre hash!
    allowNull: false,
  },
}, {
  tableName: "usuario", // Garante que o nome da tabela seja o mesmo do SQL
  timestamps: false, // Não adiciona colunas createdAt e updatedAt automaticamente
});

module.exports = Usuario;

