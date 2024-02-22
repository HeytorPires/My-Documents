const { v4: uuidv4 } = require("uuid");
const documents = require("../database/documents");
const users = require("../database/user");

class DocumentsController {
  findAll(request, response) {
    const { initial_date, final_date, approved } = request.query;
    approved == "true" ? true : false;

    if (!initial_date || !final_date) {
      return response
        .status(400)
        .json({
          status: "error",
          message: "Data inicial e final são obrigatórias",
        })
        .send();
    }

    const documentsFiltered = [];

    documents.forEach((doc) => {
      if (
        doc.updated_at >= new Date(initial_date) &&
        doc.updated_at <= new Date(final_date)
      ) {
        documentsFiltered.push(doc);
      }
    });

    const documentFinal = [];
    console.log(typeof approved);
    documentsFiltered.forEach((doc) => {
      if (approved === "true") {
        if (doc.approved) {
          documentFinal.push(doc);
        }
      } else {
        documentFinal.push(doc);
      }
    });

    console.log(documentFinal);

    if (!documentFinal.length) {
      return response.status(400).json({
        message: "documentos não encontrados",
      });
    }

    const orderedDocuments = documentFinal.sort(function (a, b) {
      if (a.updated_at > b.updated_at) {
        return 1;
      }
      if (a.updated_at < b.updated_at) {
        return -1;
      }
      return 0;
    });

    return response.json(orderedDocuments).send();
  }

  findById(request, response) {
    const { id } = request.params;
    if (!id) {
      return response
        .status(400)
        .json({
          status: "error",
          message: "Id é obrigatório",
        })
        .send();
    }

    const document = documents.find((doc) => doc.id === id);
    if (!document) {
      return response.status(400).json({
        message: "Documento não encontrado",
      });
    }
    return response.json(document).send();
  }

  findByAuthor(request, response) {
    const { author } = request.params;

    if (!author) {
      return response
        .status(400)
        .json({
          status: "error",
          message: "Author é Obrigatório",
        })
        .send();
    }

    const document = documents.find((doc) => doc.author === author);
    if (!document) {
      return response.status(400).json({
        message: "Documento não encontrado",
      });
    }
    return response.status(200).json(document).send();
  }

  create(request, response) {
    const { author, title } = request.body;

    if (!author) {
      return response
        .status(400)
        .json({
          status: "error",
          message: "Parâmetro author é obrigatório",
        })
        .send();
    }

    if (!title) {
      return response
        .status(400)
        .json({
          status: "error",
          message: "Parâmetro title é obrigatório",
        })
        .send();
    }

    documents.push({
      id: uuidv4(),
      author,
      title,
      updated_at: new Date(),
    });

    return response.status(201).json({
      message: "Criado com Sucesso",
    });
  }

  toapprove(request, response) {
    const { title, email } = request.body;

    if (!title) {
      return response.status(400).json({
        message: "Titulo Obrigatório",
      });
    }

    if (!email) {
      return response.status(400).json({
        message: "email Obrigatório",
      });
    }

    const titleExist = documents.find((doc) => doc.title === title);
    if (!titleExist) {
      return response.status(400).json({
        message: "Não há esse titulo",
      });
    }

    documents.forEach((doc) => {
      if (doc.title === title) {
        doc.approved = new Date();
        doc.userEmail = email;
      }
    });

    const userEmailExist = users.find((user) => user.email === email);
    if (!userEmailExist) {
      return response.status(400).json({
        message: "Email não existente",
      });
    }

    return response.status(200).json({
      message: "approved",
    });
  }

  update(request, response) {
    const { id } = request.params;
    const { author, title } = request.body;

    const index = documents.findIndex((doc) => doc.id === id);

    if (!author) {
      return response
        .status(400)
        .json({
          status: "error",
          message: "Parâmetro author é obrigatório",
        })
        .send();
    }

    if (!title) {
      return response
        .status(400)
        .json({
          status: "error",
          message: "Parâmetro title é obrigatório",
        })
        .send();
    }

    documents[index] = {
      id,
      author,
      title,
      updated_at: new Date(),
    };
    return response.status(204).json({
      message: "Atualizado",
    });
  }

  delete(request, response) {
    const { id } = request.params;

    const index = documents.findIndex((doc) => doc.id === id);

    documents.splice(index, 1);

    return response.status(204).send();
  }
}

module.exports = DocumentsController;
