const express = require("express");
const Transferencia = require("../models/transferencia");
const Recurso = require("../models/recurso");
const Usuario = require("../models/usuario");

const router = express.Router();

// POST /api/transferencias - Registrar uma nova transferência
router.post("/transferencias", async (req, res) => {
  const { usuario_id, recurso_id, quantidade_transferida, localizacao } = req.body;

  // Validação básica
  if (!usuario_id || !recurso_id || !quantidade_transferida || !localizacao) {
    return res.status(400).json({ 
      message: "Todos os campos são obrigatórios: usuario_id, recurso_id, quantidade_transferida e localizacao." 
    });
  }

  try {
    // Verificar se o usuário existe
    const usuario = await Usuario.findByPk(usuario_id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Verificar se o recurso existe
    const recurso = await Recurso.findByPk(recurso_id);
    if (!recurso) {
      return res.status(404).json({ message: "Recurso não encontrado." });
    }

    // Verificar se há quantidade suficiente do recurso
    if (recurso.quantidade < quantidade_transferida) {
      return res.status(400).json({ 
        message: "Quantidade insuficiente do recurso para transferência." 
      });
    }

    // Iniciar uma transação para garantir que ambas as operações (atualizar recurso e criar transferência) sejam concluídas
    const t = await Transferencia.sequelize.transaction();

    try {
      // Atualizar a quantidade do recurso
      await recurso.update(
        { quantidade: recurso.quantidade - parseFloat(quantidade_transferida) },
        { transaction: t }
      );

      // Criar o registro de transferência
      const novaTransferencia = await Transferencia.create(
        {
          usuario_id,
          recurso_id,
          quantidade_transferida: parseFloat(quantidade_transferida),
          localizacao
        },
        { transaction: t }
      );

      // Confirmar a transação
      await t.commit();

      res.status(201).json({
        message: "Transferência registrada com sucesso!",
        transferencia: novaTransferencia
      });
    } catch (error) {
      // Se houver erro, desfaz a transação
      await t.rollback();
      throw error;
    }
  } catch (error) {
    console.error("Erro ao registrar transferência:", error);
    res.status(500).json({ message: "Erro ao registrar transferência." });
  }
});

// GET /api/transferencias - Listar todas as transferências
router.get("/transferencias", async (req, res) => {
  try {
    const transferencias = await Transferencia.findAll({
      include: [
        { model: Usuario, attributes: ['username'] },
        { model: Recurso, attributes: ['nome', 'unidade_medida'] }
      ]
    });
    res.status(200).json(transferencias);
  } catch (error) {
    console.error("Erro ao buscar transferências:", error);
    res.status(500).json({ message: "Erro ao buscar transferências." });
  }
});

module.exports = router;
