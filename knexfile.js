const path = require("path") 

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, "src", "database", "database.db") // Informando com o path o caminho do bd
    },
    pool: { // pool é rodar uma função toda vez que o BD for conectado
      afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb) // Habilitando a funcionalidade de apagar em cascata que no sqlite é desabilitada por padrão
    },
    migrations: {
      directory: path.resolve(__dirname, "src", "database", "knex", "migrations") // Informando para o knex onde colocaremos as informações para criar as tabelas de forma automática
    },
    useNullAsDefault: true // Propriedade padrão para trabalhar com o sqlite
  }
};
