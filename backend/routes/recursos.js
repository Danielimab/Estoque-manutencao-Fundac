const express = require("express");
const Recurso = require("../models/recurso");

const router = express.Router();

// GET /api/recursos - Listar todos os recursos
router.get("/recursos", async (req, res) => {
  try {
    const recursos = await Recurso.findAll();
    res.status(200).json(recursos);
  } catch (error) {
    console.error("Erro ao buscar recursos:", error);
    res.status(500).json({ message: "Erro ao buscar recursos." });
  }
});

// POST /api/recursos - Adicionar um novo recurso
router.post("/recursos", async (req, res) => {
  const { nome, unidade_medida, quantidade } = req.body;

  // Validação básica
  if (!nome || !unidade_medida || quantidade === undefined) {
    return res.status(400).json({ 
      message: "Nome, unidade de medida e quantidade são obrigatórios." 
    });
  }

  try {
    // Verifica se já existe um recurso com o mesmo nome
    const recursoExistente = await Recurso.findOne({ where: { nome } });
    if (recursoExistente) {
      return res.status(400).json({ 
        message: "Já existe um recurso com este nome." 
      });
    }

    // Cria o novo recurso
    const novoRecurso = await Recurso.create({
      nome,
      unidade_medida,
      quantidade: parseFloat(quantidade)
    });

    res.status(201).json({
      message: "Recurso adicionado com sucesso!",
      recurso: novoRecurso
    });
  } catch (error) {
    console.error("Erro ao adicionar recurso:", error);
    res.status(500).json({ message: "Erro ao adicionar recurso." });
  }
});

// GET /api/recursos/:id - Buscar um recurso específico pelo ID
router.get("/recursos/:id", async (req, res) => {
  const { id } = req.params;
  
  try {
    const recurso = await Recurso.findByPk(id);
    if (!recurso) {
      return res.status(404).json({ message: "Recurso não encontrado." });
    }
    res.status(200).json(recurso);
  } catch (error) {
    console.error(`Erro ao buscar recurso com ID ${id}:`, error);
    res.status(500).json({ message: "Erro ao buscar recurso." });
  }
});

module.exports = router;
