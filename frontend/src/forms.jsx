import { useState } from 'react'
import { api } from './lib/axios'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

function Forms() {
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  async function createDocument(event) {
    setLoading(true)
    event.preventDefault()
    await api.post('/documents', {
      title,
      author,
    })

    alert('Documento Criado com Sucesso')
    navigate('/')
  }

  return (
    <>
      <h1>Criar Novo Documento</h1>
      <form action="" onSubmit={(event) => createDocument(event)}>
        <h3>Titulo</h3>
        <input
          type="text"
          placeholder="Digite um Titulo"
          onBlur={(e) => setTitle(e.target.value)}
        />
        <br />
        <h3>Autor</h3>
        <input
          type="text"
          placeholder="Digite o Autor"
          onBlur={(e) => setAuthor(e.target.value)}
        />
        <br />
        <br />
        <Stack spacing={2} direction="row">
          <Button variant="contained" type="submit" disabled={loading}>
            Criar
          </Button>
        </Stack>
      </form>
      <br />
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => navigate('/')}>
          Voltar
        </Button>
      </Stack>
    </>
  )
}

export default Forms
