const sqlite3 = require("sqlite3") // Importando o drive que iremos utilizar, que é o mesmo que a versão que iremos utilizar, nesse caso o sqlite3
const sqlite = require("sqlite") // importando o sqlite
const path = require("path") // Importando o path 

async function sqliteConnection(){
  const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db"), // Informando o arquivo de banco de dados que iremos utilizar, caso ainda não esteja criado, ele vai criar o arquivo
    driver: sqlite3.Database // Informando o driver que iremos utilizar
  })

  return database
}

module.exports = sqliteConnection