require("express-async-errors") // Importando o express async errors que é a bibliteca que instalamos para lidar com os erros

const migrationsRun = require("./database/sqlite/migrations") // Importando o arquivo do banco de dados

const AppError = require("./utils/AppError") // Importando o AppError

const express = require("express") // Importando o express

const routes = require("./routes") // Importando o arquivo de rotas

migrationsRun() // Executando o banco de dados 

const app = express() // Inicializando o express

app.use(express.json()) // Informando para o express qual o padrão que iremos trabalhar no corpo das requisiçãos, neste exemplo será o json

app.use(routes) // Informando para o express utilizar as rotas que criamos

app.use((error, request, response, next) => { // Middleware para capturar e tratar o erro
  if (error instanceof AppError) {
    return response.status(error.statuscode).json({
      status: "error",
      message: error.message
    })
  }


  console.error(error)

  return response.status(500).json({
    status: "error",
    message: "Internal server error"
  })
})

const PORT = 3333 // Definindo a porta que iremos trabalhar

app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)) // .listen = ficar ouvindo as requisições vindas da porta 3333 e uma mensagem de qual porta o servidor está rodando
