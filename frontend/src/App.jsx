import { useEffect, useState } from "react";
import { api } from "./lib/axios";

function App() {
  const [documents, setDocuments] = useState([])
  const [title, setTitle] = useState()
  const [author, setAuthor] = useState()

  async function listDocuments(){
    const { data } = await api.get('/documents?initial_date=2020-01-01&final_date=2026-01-01')


    setDocuments(data)
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
  async function createDocument(event){
    event.preventDefault()
    await api.post("/documents",{
      title,
      author
    })
    listDocuments()
  }

  useEffect(() => {
    listDocuments()
  }, [])

console.log(title)

  return (
    <>
      <h1>Olá Mundo</h1>
      {documents.map((document) => {
        return (
        <div key={document.id}>
           <p>Titulo: {document.title}</p>  
           <p>Aprovado: {document.approved}</p>
           <button onClick={() => approvedDocuments(document.title)}>Aprovar</button>  
           <button onClick={() => deleteDocuments(document.id)}>Deletar</button>
        </div>
        )
      })}
      <h1>Criar Novo Documento</h1>
      <form action="" onSubmit={(event) => createDocument(event)}>
        <h3>Titulo</h3>
        <input type="text" placeholder="Digite um Titulo" onBlur={(e) => setTitle(e.target.value)}/>
        <br />
        <h3>Autor</h3>
        <input type="text" placeholder="Digite o Autor" onBlur={(e) => setAuthor(e.target.value)}/>
        <br />
        <button type="submit">Criar</button>
      </form>
    </>
  );
}

export default App;
