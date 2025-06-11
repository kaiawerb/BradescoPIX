const express = require("express")
const router = express.Router()
const db = require("../models")

const Denuncia = db.Denuncia

// GET: todas as denúncias ou filtra por denunciante
router.get("/", async (req, res) => {
  const { id_denunciante } = req.query

  try {
    const denuncias = await Denuncia.findAll({
      where: id_denunciante ? { id_denunciante } : undefined,
      include: [
        {
          model: db.Usuario,
          as: "denunciado",
          attributes: ["id", "nome", "cpf"], // ou outros campos relevantes
        },
      ],
      order: [["data_denuncia", "DESC"]],
    })

    res.json(denuncias)
  } catch (err) {
    res.status(500).json({ erro: err.message })
  }
})

// POST: nova denúncia
router.post("/", async (req, res) => {
  try {
    const denuncia = await Denuncia.create(req.body)
    res.status(201).json(denuncia)
  } catch (err) {
    res.status(400).json({ erro: err.message })
  }
})

module.exports = router
