import express from 'express'
import { db } from '../firebase'

const router = express.Router()

router.get('/', async (req, res) => {
  const snapshot = await db.collection('usuarios').get()
  const usuarios = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  res.json(usuarios)
})

router.post('/', async (req, res) => {
  const { nome, email, password } = req.body
  const doc = await db.collection('usuarios').add({ nome, email, senha: password })
  res.status(201).json({ id: doc.id })
})


router.delete('/:id', async (req, res) => {
  await db.collection('usuarios').doc(req.params.id).delete()
  res.sendStatus(200)
})


router.put('/:id', async (req, res) => {
  const { nome, email, password } = req.body
  await db.collection('usuarios').doc(req.params.id).update({
    nome,
    email,
    senha: password
  })
  res.sendStatus(200)
})

export default router
