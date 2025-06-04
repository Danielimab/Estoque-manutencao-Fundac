const sequelize = require("../db/database");
const Usuario = require("../models/usuario");

async function seedUser() {
  try {
    // Sincroniza o banco (garante que a tabela exista)
    await sequelize.sync();
    console.log("Banco de dados sincronizado.");

    // Procura pelo usuário 'admin'
    const [user, created] = await Usuario.findOrCreate({
      where: { username: "admin" },
      defaults: {
        password: "admin", // Lembrete: SENHA EM TEXTO PLANO! Mudar para hash depois.
      },
    });

    if (created) {
      console.log("Usuário 'admin' criado com sucesso!");
    } else {
      console.log("Usuário 'admin' já existe.");
    }
  } catch (error) {
    console.error("Erro ao criar usuário seed:", error);
  } finally {
    // Fecha a conexão com o banco de dados
    await sequelize.close();
    console.log("Conexão com o banco fechada.");
  }
}

seedUser();
