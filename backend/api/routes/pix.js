const express = require("express")
const router = express.Router()
const { Usuario } = require("../models") // importando do index.js do models

router.post("/pix", async (req, res) => {
  const { remetenteId, destinatarioId, valor } = req.body

  try {
    if (!remetenteId || !destinatarioId || !valor) {
      return res
        .status(400)
        .json({ erro: "Dados inválidos para transferência" })
    }

    const remetente = await Usuario.findByPk(remetenteId)
    const destinatario = await Usuario.findByPk(destinatarioId)

    if (!remetente || !destinatario) {
      return res.status(404).json({ erro: "Usuário(s) não encontrado(s)" })
    }

    if (parseFloat(remetente.saldo) < parseFloat(valor)) {
      return res.status(400).json({ erro: "Saldo insuficiente" })
    }

    // Atualiza os saldos
    remetente.saldo = parseFloat(remetente.saldo) - parseFloat(valor)
    destinatario.saldo = parseFloat(destinatario.saldo) + parseFloat(valor)

    await remetente.save()
    await destinatario.save()

    // Retorna ambos atualizados, garantindo saldo como número
    res.status(200).json({
      remetente: {
        ...remetente.toJSON(),
        saldo: Number(remetente.saldo),
      },
      destinatario: {
        ...destinatario.toJSON(),
        saldo: Number(destinatario.saldo),
      },
    })
  } catch (err) {
    res.status(500).json({ erro: "Erro ao processar o Pix: " + err.message })
  }
})

module.exports = router
