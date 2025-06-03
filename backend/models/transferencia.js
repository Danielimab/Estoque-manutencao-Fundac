const { DataTypes } = require("sequelize");
const sequelize = require("../db/database");
const Usuario = require("./usuario"); // Importa para definir a chave estrangeira
const Recurso = require("./recurso"); // Importa para definir a chave estrangeira

const Transferencia = sequelize.define("Transferencia", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Usuario,
      key: "id",
    },
  },
  recurso_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Recurso,
      key: "id",
    },
  },
  quantidade_transferida: {
    type: DataTypes.FLOAT, // No SQL é NUMERIC
    allowNull: false,
  },
  localizacao: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_transferencia: {
    type: DataTypes.DATE, // Equivalente ao TIMESTAMP do SQL
    allowNull: false,
    defaultValue: DataTypes.NOW, // Define o valor padrão como o momento atual
  },
}, {
  tableName: "transferencia",
  timestamps: false, // Não cria createdAt/updatedAt automaticamente
});

// Define as associações (relacionamentos)
// Um usuário pode ter várias transferências
Usuario.hasMany(Transferencia, { foreignKey: "usuario_id" });
Transferencia.belongsTo(Usuario, { foreignKey: "usuario_id" });

// Um recurso pode estar em várias transferências
Recurso.hasMany(Transferencia, { foreignKey: "recurso_id" });
Transferencia.belongsTo(Recurso, { foreignKey: "recurso_id" });

module.exports = Transferencia;

