require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db/database");

// Importar modelos para que o Sequelize os reconheça e crie as tabelas
const Usuario = require("../models/usuario");
const Recurso = require("../models/recurso");
const Transferencia = require("../models/transferencia");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilita CORS para todas as origens
app.use(express.json()); // Permite que o Express entenda JSON no corpo das requisições

// Rota de Health Check básica
app.get("/health", (req, res) => {
  res.status(200).send("Backend Node.js com Express e Sequelize está rodando!");
});

// Registrar rotas da API (serão criadas depois em arquivos separados)
// Exemplo: const authRoutes = require('./routes/auth');
// app.use('/api/auth', authRoutes);

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync({ force: false }) // force: false para não recriar as tabelas a cada reinício
  .then(() => {
    console.log("Banco de dados sincronizado com sucesso.");
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });

