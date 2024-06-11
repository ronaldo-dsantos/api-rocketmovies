const AppError = require("../utils/AppError") // Importando o AppError

class UsersControllers { // UsersControllers criado através de casse e não de uma função, porque uma classe pode ter várias funções o que vai nos atender melhor nesse caso
  
  create(request, response) { // Controller create
    const { name, email , password} = request.body

    if (!name) { // Tratativa de erro para caso o nome não seja inserido
      throw new AppError("Nome é obrigatório") // Passando a mensagem para o AppError
    }

    response.json({ name , email, password })
  }
}

module.exports = UsersControllers