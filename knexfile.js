const path = require("path") // Importando o path

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db") // Informando com o path o caminho do bd
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations") // Informando para o knex onde colocaremos as informações para criar as tabelas de forma automática
    },
    useNullAsDefault: true // Propriedade padrão para trabalhar com o sqlite
  }
};
