const express = require("express")
const router = express.Router()
const { Transacao, Usuario } = require("../models") // importando via index.js para associações

// GET: listar transações com dados dos usuários origem e destino
router.get("/", async (req, res) => {
  try {
    const transacoes = await Transacao.findAll({
      include: [
        { model: Usuario, as: "origem", attributes: ["id", "nome"] },
        { model: Usuario, as: "destino", attributes: ["id", "nome"] },
      ],
    })
    res.json(transacoes)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

// POST: nova transação com validação simples
router.post("/", async (req, res) => {
  const { valor, origem_id, destino_id, descricao } = req.body

  if (!valor || !origem_id || !destino_id) {
    return res.status(400).json({ erro: "Campos obrigatórios faltando." })
  }

  try {
    const transacao = await Transacao.create({
      valor,
      origem_id,
      destino_id,
      descricao,
    })
    res.status(201).json(transacao)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
})

module.exports = router