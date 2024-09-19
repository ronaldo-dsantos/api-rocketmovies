const { Router } = require("express")

const MoviesControllers = require("../controllers/MoviesController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const moviesRoutes = Router()

const moviesControllers = new MoviesControllers()

moviesRoutes.use(ensureAuthenticated) // Aplicando o middleware para todas as rotas

moviesRoutes.post("/", moviesControllers.create)
moviesRoutes.get("/:id", moviesControllers.show)
moviesRoutes.delete("/:id", moviesControllers.delete)
moviesRoutes.get("/", moviesControllers.index)

module.exports = moviesRoutes