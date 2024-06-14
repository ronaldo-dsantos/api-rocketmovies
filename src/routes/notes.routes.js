const { Router } = require("express") // Importando o Router de dentro do próprio express

const NotesControllers = require("../controllers/NotesController")// Importando o arquivo UsersController

const notesRoutes = Router() // Inicializando o Router do express

const notesControllers = new NotesControllers() // Instanciando o UsersControllers, como ele é uma classe, precisamos alocar ele na memória para que póssamos utilizá-la

notesRoutes.post("/:user_id", notesControllers.create) // Ao ser acessada a rota de usuários, está direcionando para a classe usersController e acessando o método create
notesRoutes.get("/:id", notesControllers.show)
notesRoutes.delete("/:id", notesControllers.delete)
notesRoutes.post("/", notesControllers.index)

module.exports = notesRoutes // Exportando o usersRoutes para que o server.js possa utilizá-lo