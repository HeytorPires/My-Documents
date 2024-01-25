const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");

const swaggerFile = require("./docs/swagger.json");

const documentsRouter = require("./router/documents.routes");
const sessionRouter = require("./router/session.routes");

const app = express();

app.use(express.json());

app.use(cors());

const PORT = 3000;

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/session", sessionRouter);
app.use("/documents", documentsRouter);

app.listen(PORT, () => {
  console.log(`Servidor executando na porta ${PORT}`);
});
