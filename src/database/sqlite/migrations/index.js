const sqliteConnection = require("../../sqlite")

const createUsers = require("./createUsers")

async function migrationsRun(){ // Criando uma função assincrona para criar as tabelas
  const schemas = [
    createUsers
  ].join('') // Criando uma vetor para armazenar as tabelas que serão criadas | .join('') para separar por nada

  sqliteConnection() // Executando o sqliteConnection
  .then(db => db.exec(schemas)) // Promessa para executar as tabelas
  .catch(error => console.error(error)) // Tratando as exceções
}

module.exports = migrationsRun