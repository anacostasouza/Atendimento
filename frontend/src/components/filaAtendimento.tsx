import { useEffect, useState, useRef } from 'react'
import { db } from '../services/firebase'
import { collection, getDocs } from 'firebase/firestore'
import './FilaAtendimento.css'

interface Atendimento {
  id: string
  nome: string
  servico: string
}

export function FilaAtendimento() {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([])

  const inputNome = useRef<HTMLInputElement>(null)
  const inputServico = useRef<HTMLSelectElement>(null)

  async function getAtendimentos() {
    const querySnapshot = await getDocs(collection(db, 'fila-atendimento'))
    const dados = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Atendimento[]
    setAtendimentos(dados)
  }

  useEffect(() => {
    getAtendimentos()
  }, [])

    function adicionarAtendimento(): void {
        throw new Error('Function not implemented.')
    }

  return (
    <div className="fila-container">
      <h1>Fila de Atendimento</h1>
      <div className="fila-lista">
        {atendimentos.map((atendimento) => (
          <div key={atendimento.id} className="fila-item">
            <h3>{atendimento.nome}</h3>
            <p>
              Serviço: <strong>{atendimento.servico}</strong>
            </p>
          </div>
        ))}
      </div>
      <div className="formulario">
            <input type="text" ref={inputNome} placeholder="Nome" />
            <label htmlFor="servico">Serviço:</label>
            <select id="servico" ref={inputServico}>
            <option value="criação">Criação</option>
            <option value="impressão">Impressão</option>
            <option value="plotagem">Plotagem</option>
            </select>
            <button onClick={adicionarAtendimento}>Adicionar</button>
            </div>
    </div>
  )
}
