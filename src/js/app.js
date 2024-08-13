const express = require("express")
const cors = require("cors")
const rotas = require('./routes')

const app = express()
app.use(express.json());
const port = 3000

app.use(cors())
app.use(rotas)


app.listen(port, () => {
  console.log(`servidor rodando na porta ${port}`)
})
