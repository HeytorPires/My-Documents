import { useEffect, useState } from 'react'
import { api } from './lib/axios'
import { useNavigate } from 'react-router-dom'
import { Container } from './styles'
import * as React from 'react'
import Stack from '@mui/material/Stack'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function App() {
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } }
  const [documents, setDocuments] = useState([])
  const navigate = useNavigate()
  const [initialDate, setInitialDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [approved, setApproved] = useState(false)
  const [author, setAuthor] = useState('')

  async function listDocuments() {
    if (initialDate && finalDate) {
      const { data } = await api.get(
        `/documents?initial_date=${initialDate}&final_date=${finalDate}&approved=${approved}`,
      )

      setDocuments(data)
    }
  }

  async function findByAuthor() {
    const { data } = await api.get(`/documents/findByAuthor/${author}`)

    setDocuments([data])
    console.log(data)
  }

  async function approvedDocuments(title) {
    await api.patch('/documents/toapprove', {
      title,
      email: 'heytor.cacho@seniornortepr.com.br',
    })

    listDocuments()
  }

  async function deleteDocuments(id) {
    await api.delete(`/documents/${id}`)

    listDocuments()
  }

  //   useEffect(() => {
  //     listDocuments()
  //   }, [])

  useEffect(() => {
    listDocuments()
  }, [initialDate, finalDate])

  useEffect(() => {
    listDocuments()
  }, [approved])

  return (
    <Container>
      <h1>Lista de Documentos</h1>
      <h2>Criar Documento</h2>
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => navigate('/forms')}>
          Criar
        </Button>
      </Stack>
      <hr />
      <h2>Filtro de Data</h2>
      <h3>Data Inicial:</h3>
      <input
        type="date"
        value={initialDate}
        placeholder="Definir data inicio"
        onChange={(e) => setInitialDate(e.target.value)}
      />

      <br />

      <h3>Data Final:</h3>

      <input
        type="date"
        value={finalDate}
        placeholder="Definir data inicio"
        onChange={(e) => setFinalDate(e.target.value)}
      />
      <hr />
      <h2>Filtro por Aprovado</h2>

      <Checkbox
        {...label}
        type="checkbox"
        value={true}
        onChange={(e) => setApproved(Boolean(e.target.value))}
      />
      <label htmlFor="">aprovado</label>
      <hr />

      <h2>Filtro por Autor</h2>
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
      label="Autor" 
      variant="outlined" 
      type="text"
      placeholder="Nome do autor"
      onBlur={(e) => setAuthor(e.target.value)}/>
      </Box>
      <br />
      <br />
      <Stack spacing={2} direction="row">
        <Button variant="contained" onClick={() => findByAuthor()}>
          Buscar
        </Button>
      </Stack>
      <hr />
      <h3>Pesquisa do Filtro: {author}</h3>

      {documents.map((document) => {
        return (
          <div key={document.id}>
            <h2>Titulo: {document.title}</h2>
            <h2>Autor(a): {document.author}</h2>
            <h3>Aprovado: {document.approved}</h3>

            <ButtonGroup variant="contained" aria-label="Basic button group">
              <Button onClick={() => approvedDocuments(document.title)}>
                Aprovar
              </Button>
              <Button onClick={() => deleteDocuments(document.id)}>
                Deletar
              </Button>
              <Button onClick={() => navigate(`/update/${document.id}`)}>
                Atualizar
              </Button>
            </ButtonGroup>
          </div>
        )
      })}
    </Container>
  )
}

export default App
