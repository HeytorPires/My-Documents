const express = require("express");

const DocumentsController = require("../controller/DocumentsController");
const ensureAutenticated = require("../middleware/ensureAuthenticated");
const ensureAdministrator = require("../middleware/ensureAdministrator");

const documentsRouter = express.Router();

const documentsController = new DocumentsController();

// documentsRouter.use(ensureAutenticated);

documentsRouter.get("/", documentsController.findAll);
documentsRouter.get("/findById/:id", documentsController.findById);
documentsRouter.get("/findByAuthor/:author", documentsController.findByAuthor)

// documentsRouter.use(ensureAdministrator);
documentsRouter.post("/", documentsController.create);
documentsRouter.put("/:id", documentsController.update);
documentsRouter.delete("/:id", documentsController.delete);
documentsRouter.patch("/toapprove", documentsController.toapprove)


module.exports = documentsRouter;
