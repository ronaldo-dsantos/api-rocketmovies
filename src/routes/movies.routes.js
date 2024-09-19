const { Router } = require("express")

const NotesControllers = require("../controllers/NotesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const moviesRoutes = Router()

const notesControllers = new NotesControllers()

moviesRoutes.use(ensureAuthenticated) // Aplicando o middleware para todas as rotas

moviesRoutes.post("/", notesControllers.create)
moviesRoutes.get("/:id", notesControllers.show)
moviesRoutes.delete("/:id", notesControllers.delete)
moviesRoutes.get("/", notesControllers.index)

module.exports = moviesRoutes