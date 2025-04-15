// src/pages/Home.tsx
import './Home.css'
import { useEffect, useRef, useState } from 'react'
import { EditIcon } from '../assets/icons/editIcon'
import { TrashIcon } from '../assets/icons/trashIcon'
import { api } from '../services/api'

interface Usuario {
  id: string
  nome: string
  email: string
  senha: string
}

export function Home() {
  const [users, setUsers] = useState<Usuario[]>([])

  const inputName = useRef<HTMLInputElement>(null)
  const inputEmail = useRef<HTMLInputElement>(null)
  const inputSenha = useRef<HTMLInputElement>(null)

  async function getUsers() {
    const response = await api.get('/usuarios')
    if (response.status === 200) {
      setUsers(response.data)
    }
  }

  async function createUsers() {
    await api.post('/usuarios', {
      nome: inputName.current?.value,
      email: inputEmail.current?.value,
      senha: inputSenha.current?.value
    })
    alert('Usuário criado com sucesso!')
    getUsers()
  }

  async function deleteUsers(id: string) {
    await api.delete(`/usuarios/${id}`)
    alert('Usuário deletado com sucesso!')
    getUsers()
  }

  async function updateUsers(id: string) {
    await api.put(`/usuarios/${id}`, {
      nome: inputName.current?.value,
      email: inputEmail.current?.value,
      senha: inputSenha.current?.value
    })
    alert('Usuário atualizado com sucesso!')
    getUsers()
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className="container">
      <form>
        <h1>Cadastro de Usuários</h1>
        <input type="text" placeholder="Nome" ref={inputName} />
        <input type="text" placeholder="Email" ref={inputEmail} />
        <input type="password" placeholder="Senha" ref={inputSenha} />
        <button type="button" onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className="container-table">
          <div className="table">
            <p>Nome: <span>{user.nome}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <p>Senha: <span>{user.senha}</span></p>
          </div>
          <button onClick={() => updateUsers(user.id)} title="Editar usuário">
            <EditIcon />
          </button>
          <button onClick={() => deleteUsers(user.id)} title="Deletar usuário">
            <TrashIcon />
          </button>
        </div>
      ))}
    </div>
  )
}
