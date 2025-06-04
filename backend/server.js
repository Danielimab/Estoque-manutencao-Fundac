require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sequelize = require("./db/database");

// Importar modelos para que o Sequelize os reconheça e crie as tabelas
const Usuario = require("./models/usuario");
const Recurso = require("./models/recurso");
const Transferencia = require("./models/transferencia");

// Importar rotas
const authRoutes = require('./routes/auth');
const recursosRoutes = require('./routes/recursos');
const transferenciasRoutes = require('./routes/transferencias'); // <<< Adicionado

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors()); // Habilita CORS para todas as origens
app.use(express.json()); // Permite que o Express entenda JSON no corpo das requisições

// Rota de Health Check básica
app.get("/health", (req, res) => {
  res.status(200).send("Backend Node.js com Express e Sequelize está rodando!");
});

// Registrar rotas da API
app.use('/api', authRoutes); // usando /api como prefixo
app.use('/api', recursosRoutes);
app.use('/api', transferenciasRoutes); // <<< Adicionado

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

  // Adicionar após a sincronização do banco de dados
sequelize.sync({ force: false })
  .then(async () => {
    console.log("Banco de dados sincronizado com sucesso.");
    
    // Criar usuário admin se não existir
    try {
      const [user, created] = await Usuario.findOrCreate({
        where: { username: "admin" },
        defaults: {
          password: "admin"
        }
      });
      
      if (created) {
        console.log("Usuário 'admin' criado com sucesso!");
      } else {
        console.log("Usuário 'admin' já existe.");
      }
    } catch (error) {
      console.error("Erro ao criar usuário admin:", error);
    }
    
    // Iniciar o servidor
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Erro ao sincronizar o banco de dados:", error);
  });

