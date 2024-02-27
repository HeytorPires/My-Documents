import { useLocation } from 'react-router-dom'
import { api } from './lib/axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
    alert('Documento alterado com Sucesso')
    navigate('/')
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
        <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '20ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
      id="outlined-basic" 
      label="Mudar Titulo" 
      variant="outlined" 
      value={title}
      type="text"
      placeholder="Nome do Titulo"
      onChange={(e) => setTitle(e.target.value)}/>
        <h3>Autor</h3>
       
      <TextField 
      id="outlined-basic" 
      label="Mudar Autor" 
      variant="outlined" 
      type="text"
      value={author}
      placeholder="Nome do autor"
      onChange={(e) => setAuthor(e.target.value)}/>
      </Box>
        <br />
        <Stack spacing={2} direction="row">
          <Button variant="contained" type="submit">
            Mudar
          </Button>
        </Stack>
        <br />
        <Stack spacing={2} direction="row" >
          <Button variant="contained" onClick={() => navigate('/')}>
            Voltar
          </Button>
        </Stack>
      </form>
    </>
  )
}
export default Update
