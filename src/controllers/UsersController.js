const { hash, compare } = require("bcryptjs")

const AppError = require("../utils/AppError") // Importando o AppError

const knex = require("../database/knex") // Importando o knex

class UsersControllers { // UsersControllers criado através de casse e não de uma função, porque uma classe pode ter várias funções o que vai nos atender melhor nesse caso

  async create(request, response) {
    const { name, email, password } = request.body

    const [checkUserExists] = await knex("users").where({ email }) // Verificando no banco de dados se o e-mail informado já existe

    if (checkUserExists) { // Se o usuário existir, faça
      throw new AppError("Este e-mail já está em uso.") // Tratando a exceção pelo AppError
    }

    const hashedPassword = await hash(password, 8) // Criando uma senha criptografada com fator 8 de complexidade

    await knex("users").insert({ name, email, password: hashedPassword }) // Inserindo os dados de usuário no banco de dados

    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body // Armazenando o nome e o e-mail do corpo da requisição
    const user_id = request.user.id // Armazenando o id informando na requisição

    const [user] = await knex("users").where({ id: user_id }) // Selecionando o usuário que contenha o id informado

    if (!user) { // Se o usuário não existir, faça...
      throw new AppError("Usuário não encontrado.") // Tratando a exceção caso o usuário não seja encontrado
    }

    const [userWithUpdatedEmail] = await knex("users").where({ email }) // // Selecionando o e-mail informando para verificar de já existe no banco de dados

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) { // Se o email informado existir e se o id desse e-mail for diferente do id informado, faça...
      throw new AppError("Este e-mail já está em uso.")
    }

    user.name = name ?? user.name // Atualizando o user.name para o nome informado pelo usuário, se o nome não foi informado, usar o nome que consta no user.name
    user.email = email ?? user.email // Atualizando o user.email para o email informado pelo usuário

    if (password && !old_password) { // Se for informado a nova senha, mas não for informado a senha antiga, faça...
      throw new AppError("Você precisa informa a senha antiga para definir a nova senha.")
    }

    if (password && old_password) { // Se usuário informou a senha nova e a senha antiga, faça
      const checkOldPassword = await compare(old_password, user.password) // Comparando o old_password com o password que temos no banco de dados

      if (!checkOldPassword) { // Se o resultado da comparação for falso, faça...
        throw new AppError("A senha antiga não confere!")
      }

      user.password = await hash(password, 8)//Se a senha conferiu, atualizar o user.password para a nova senha e criptografando a nova senha
    }

    await knex("users").where({ id: user_id }).update({ // Atualizando os dados do usuário no banco de dados
      name: user.name,
      email: user.email,
      password: user.password,
      updated_at: knex.fn.now()
    })

    return response.json() // Retornando uma resposta de sucesso
  }
}

module.exports = UsersControllers