const config = require("../../../knexfile") // Importando o arquivo de configuração do knex
const knex = require("knex") // Importando o knex

const connection = knex(config.development) // Criando a conexão

module.exports = connection // Exportando a conexão do knex com o banco de dados