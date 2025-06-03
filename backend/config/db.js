require('dotenv').config(); 
const { Sequelize } = require('sequelize');

const storagePath = process.env.DATABASE_PATH || 'db/controleRecursos.db';

console.log(`Inicializando Sequelize com SQLite em: ${storagePath}`);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storagePath, 
  logging: console.log, 
});

module.exports = sequelize;

