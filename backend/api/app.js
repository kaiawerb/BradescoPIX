const express = require("express")
const cors = require("cors")

const db = require("./models") // importando o index.js das models que já instancia sequelize e associa

const app = express()
app.use(cors())
app.use(express.json())

app.use("/usuarios", require("./routes/usuario"))
app.use("/denuncias", require("./routes/denuncia"))
app.use("/transacoes", require("./routes/transacao"))
app.use("/", require("./routes/pix"))

db.sequelize.sync().then(() => {
  console.log("DB sincronizado")
  app.listen(3001, () => console.log("API rodando em http://localhost:3001"))
})
