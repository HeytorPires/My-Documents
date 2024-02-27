import { useState } from 'react'
import { api } from './lib/axios'
import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

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
         <Box
      component="form"
      sx={{
        '& > :not(style)': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <TextField 
      id="outlined-basic" 
      label="Titulo" 
      variant="outlined" 
      type="text"
      placeholder="Digite um Titulo"
      onBlur={(e) => setTitle(e.target.value)}/>
   
        <br />
        <h3>Autor</h3>
        <TextField 
        id="outlined-basic" 
        label="Autor" 
        variant="outlined" 
        type="text"
        placeholder="Digite o autor"
        onBlur={(e) => setAuthor(e.target.value)}/>
         </Box>
        
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
