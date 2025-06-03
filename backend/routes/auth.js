const express = require("express");
const Usuario = require("../models/usuario");

const router = express.Router();

// Rota POST para /api/login
router.post("/login", async (req, res) => {
  const { login, senha } = req.body;

  // Validação básica de entrada
  if (!login || !senha) {
    return res.status(400).json({ message: "Login e senha são obrigatórios." });
  }

  try {
    // Busca o usuário no banco de dados pelo username
    const usuario = await Usuario.findOne({ where: { username: login } });

    // Verifica se o usuário existe e se a senha corresponde (comparação direta - INSEGURA!)
    if (usuario && usuario.password === senha) {
      // Login bem-sucedido (em um app real, aqui geraríamos um token JWT)
      console.log(`Login bem-sucedido para o usuário: ${login}`);
      // Retorna uma resposta simples de sucesso por enquanto
      // Poderíamos retornar dados do usuário (sem a senha) ou um token
      res.status(200).json({ message: "Login bem-sucedido!", userId: usuario.id });
    } else {
      // Usuário não encontrado ou senha incorreta
      console.log(`Tentativa de login falhou para: ${login}`);
      res.status(401).json({ message: "Credenciais inválidas." });
    }
  } catch (error) {
    console.error("Erro durante o login:", error);
    res.status(500).json({ message: "Erro interno do servidor ao tentar fazer login." });
  }
});

module.exports = router;
