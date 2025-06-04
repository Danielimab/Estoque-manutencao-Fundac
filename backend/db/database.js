require('dotenv').config(); // Carrega variáveis de ambiente do .env
const { Sequelize } = require('sequelize');

// Define o caminho para o arquivo do banco de dados SQLite
// Usaremos um caminho relativo à raiz do projeto backend
const storagePath = process.env.DATABASE_PATH || 'db/controleRecursos.db';

console.log(`Inicializando Sequelize com SQLite em: ${storagePath}`);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath, // Caminho para o arquivo do banco de dados
  logging: console.log, // Mostra os comandos SQL no console (útil para debug)
});

module.exports = sequelize;

