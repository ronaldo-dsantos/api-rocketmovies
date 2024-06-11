// Classe criada para padronizar o tipo de mensagem que vai aparecer quando houver algum tipo de exceção

class AppError { // Criando uma casse para tratamento de exceções
  message // Declarando message para que toda a classe AppError tenha conhecimento que ela exista e possa acessar ela dentro de qualquer funcionalidade
  statuscode // Declarando statuscode para que toda a classe AppError tenha conhecimento que ele exista e possa acessar ele dentro de qualquer funcionalidade

  constructor(message, statuscode = 400) { // O método construtor e carregado automaticamente toda vez que a classe é instanciada, toda vez que classe for instanciada vamos querer informar o message e o statuscode
    this.message = message
    this.statuscode = statuscode
  }
}

module.exports = AppError