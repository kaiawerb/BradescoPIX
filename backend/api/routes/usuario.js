const express = require("express")
const router = express.Router()
const db = require("../models")

const Usuario = db.Usuario

// GET: listar todos os usuários
router.get("/", async (req, res) => {
  try {
    const usuarios = await Usuario.findAll()
    res.json(usuarios)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

// POST: criar um novo usuário
router.post("/", async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body)
    res.status(201).json(usuario)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
})

// GET por id
router.get("/:id", async (req, res) => {
  const { id } = req.params
  try {
    const usuario = await Usuario.findByPk(id)
    if (usuario) {
      res.json(usuario)
    } else {
      res.status(404).json({ message: "Usuário não encontrado" })
    }
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

module.exports = router
