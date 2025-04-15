import { useState, useRef, useEffect } from 'react'
import './style.css'
import EditIcon from '../../assets/icons/edit.svg'
import TrashIcon from '../../assets/icons/trash.svg'
import { api } from '../services/api.ts'

function Home() {
  interface User {
    id: number;
    nome: string;
    email: string;
    password: string;
  }

  const [users, setUsers] = useState<User[]>([])

  const inputName = useRef<HTMLInputElement>(null)
  const inputEmail = useRef<HTMLInputElement>(null)
  const inputSenha = useRef<HTMLInputElement>(null)

  async function getUsers() {
    try {
      const response = await api.get('/usuarios')
      if (response.status === 200) {
        setUsers(response.data)
      }
    } catch (error) {
      console.error('Erro ao buscar usuários', error)
    }
  }

  async function createUsers() {
    try {
      const response = await api.post('/usuarios', {
        nome: inputName.current?.value ?? '',
        email: inputEmail.current?.value ?? '',
        password: inputSenha.current?.value ?? ''
      })

      if (response.status === 201) {
        alert('Usuário cadastrado com sucesso!')
        getUsers()
      } else {
        alert('Erro ao cadastrar usuário')
      }
    } catch (error) {
      alert('Erro ao cadastrar usuário')
      console.error(error)
    }
  }

  async function deleteUsers(id: number) {
    try {
      const response = await api.delete(`/usuarios/${id}`)
      if (response.status === 200) {
        alert('Usuário deletado com sucesso!')
        getUsers()
      } else {
        alert('Erro ao deletar usuário')
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function updateUsers(id: number) {
    try {
      const response = await api.put(`/usuarios/${id}`, {
        nome: inputName.current?.value ?? '',
        email: inputEmail.current?.value ?? '',
        password: inputSenha.current?.value ?? ''
      })

      if (response.status === 200) {
        alert('Usuário atualizado com sucesso!')
        getUsers()
      } else {
        alert('Erro ao atualizar usuário')
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input name='nome' type='text' placeholder='Nome' ref={inputName} />
        <input name='email' type='text' placeholder='Email' ref={inputEmail} />
        <input name='senha' type='password' placeholder='Senha' ref={inputSenha} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='container-table'>
          <div className='table'>
            <p>Nome: <span>{user.nome}</span></p>
            <p>Email: <span>{user.email}</span></p>
            <p>Senha: <span>******</span></p>
          </div>
          <button onClick={() => updateUsers(user.id)} title="Edit User">
            <EditIcon />
          </button>
          <button onClick={() => deleteUsers(user.id)} title="Delete User">
            <TrashIcon />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
