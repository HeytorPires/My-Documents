import { useLocation } from 'react-router-dom'
import { api } from './lib/axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'

function Update() {
  const localizacao = useLocation()
  const LocalizacaoID = localizacao.pathname.slice(8)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const navigate = useNavigate()

  async function updateDocument(event) {
    event.preventDefault()
    await api.put(`/documents/${LocalizacaoID}`, {
      title,
      author,
    })
  }

  async function findById() {
    const { data } = await api.get(`/documents/findById/${LocalizacaoID}`)
    setAuthor(data.author)
    setTitle(data.title)
  }

  useEffect(() => {
    findById()
  }, [])

  return (
    <>
      <h1>Atualizar Documento</h1>
      <form action="" onSubmit={(event) => updateDocument(event)}>
        <h3>Titulo</h3>
        <input
          type="text"
          value={title}
          placeholder="Mudar Titulo"
          onChange={(e) => setTitle(e.target.value)}
        />
        <h3>Autor</h3>
        <input
          type="text"
          value={author}
          placeholder="Mudar Autor"
          onChange={(e) => setAuthor(e.target.value)}
        />
        <br />
        <Stack spacing={2} direction="row">
          <Button variant="contained" type="submit">
            Mudar
          </Button>
        </Stack>
        <br />
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={() => navigate('/')}>
            Voltar
          </Button>
        </Stack>
      </form>
    </>
  )
}
export default Update
