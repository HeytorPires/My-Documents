import { useEffect, useState } from "react";
import { api } from "./lib/axios";
import { useNavigate } from "react-router-dom";
import { Container } from "./styles";


function App() {
  const [documents, setDocuments] = useState([])
  const navigate = useNavigate()
  const [initialDate, setInitialDate] = useState('')
  const [finalDate, setFinalDate] = useState('')
  const [approved, setApproved] = useState(false)
  const [author, setAuthor] = useState("")

  async function listDocuments(){
    if(initialDate && finalDate){
    const { data } = await api.get(`/documents?initial_date=${initialDate}&final_date=${finalDate}&approved=${approved}`)

    setDocuments(data)
  }}


  async function findByAuthor(){
    const { data } = await api.get(`/documents/findByAuthor/${author}`)

    setDocuments([data])
    console.log(data)
  } 

   async function approvedDocuments(title){

    await api.patch("/documents/toapprove", {
        title,
        email: "heytor.cacho@seniornortepr.com.br"
    })

    listDocuments()
  } 

  async function deleteDocuments(id){
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
                <button onClick={() => navigate("/forms")}>Criar</button>

                <hr />
                <h2>Filtro de Data</h2>
                    <h3>Data Inicial:</h3>

                    <input type="date" value={initialDate} placeholder='Definir data inicio' onChange={(e) => setInitialDate(e.target.value)}/>

                    <br />
                    <h3>Data Final:</h3>

                    <input type="date" value={finalDate} placeholder='Definir data inicio' onChange={(e) => setFinalDate(e.target.value)} />
                <hr />
                    <h2>Filtro por Aprovado</h2>
                    <input type="checkbox" value={true} onChange={(e) => setApproved(Boolean(e.target.value))}/>
                    <label htmlFor="">aprovado</label>
                <hr />

                <h2>Filtro por Autor</h2>
                <input type="text" placeholder="Nome do Autor" onBlur={(e) => setAuthor(e.target.value)}/>
                <button onClick={() => findByAuthor()}>Buscar</button>
                    <hr />
                    <p>{author}</p>

                {documents.map((document) => {
                    return (
                    <div key={document.id}>
                    <h3>Titulo: {document.title}</h3>  
                    <h3>Aprovado: {document.approved}</h3>
                    <button onClick={() => approvedDocuments(document.title)}>Aprovar</button>  
                    <button onClick={() => deleteDocuments(document.id)}>Deletar</button>
                    <button onClick={() => navigate(`/update/${document.id}`) }>Atualizar</button>
                    </div>
                    )
                })}
    </Container>

  );
}

export default App;
