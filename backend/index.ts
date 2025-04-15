import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import usuariosRoutes from './src/routes/usuarios.ts'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use('/usuarios', usuariosRoutes)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`)
})
