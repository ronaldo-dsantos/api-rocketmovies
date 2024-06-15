const knex = require("../database/knex")

class NotesController{
  async create(request, response){
    const { title, description, rating, tags } = request.body
    const { user_id } = request.params

    const [ note_id ] = await knex("notes").insert({ // Inserindo a nota no banco de dados e armazenando o note_id da nota criada, estamos colocando ele dentro de um array porque o knex está devolvendo o note_id dentro de um array
      title,
      description,
      rating,
      user_id
    })

    const tagsInsert = tags.map(name => { // Percorrendo cada tag informada e para cada tag retornar o o note_id, user_id e o name
      return {
        note_id,
        user_id,
        name
      }
    })

    await knex("tags").insert(tagsInsert) // Inserindo as tags no banco de dados com os dados capturados acima, como estamos passando um vetor ele já entende que é para inserir todos de uma vez

    response.json()
  }

  async show(request, response){
    const { id } = request.params

    const note = await knex("notes").where({ id }).first() // Selecionando as notas onde o id seja iguar ao id informado e pegar a primeira
    const tags = await knex("tags").where({ note_id: id }).orderBy("name") // Selecionando as tags onde o note_id seja igual ao id informado e ordenar por nome

    return response.json({ // Retornar um objeto despejando todas as notas e as tags
      ...note,
      tags
    })
  }

  async delete(request, response){
    const { id } = request.params

    await knex("notes").where({ id }).delete() // Acessar a tabela notas onde o id é igual ao id informado e deletar

    return response.json()  
  }

  async index(request, response){
    const { user_id, title, tags } = request.query

    let notes

    if (tags) { // Se foi informado uma tag faça a busca por tag
      const filterTags = tags.split(',').map(tag => tag) // convertendo a tags de um texto simples para um vetor, realizado um map para pegar só a tag
      
      notes = await knex("tags")
      .select([
        "notes.id",
        "notes.title",
        "notes.user_id"
      ])
      .where("notes.user_id", user_id)
      .whereLike("notes.title", `%${title}%`)
      .whereIn("name", filterTags) // Busque na tabela notes e compare os nomes com os nomes informados no vetor
      .innerJoin("notes", "notes.id", "tags.note_id") // Realizando busca em duas tabelas usando o innerJoin
      .orderBy("notes.title")

    } else { // Se não foi informado uma tag faça a busca por notas
      notes = await knex("notes")
      .where({ user_id, })
      .whereLike("title", `%${title}%`)
      .orderBy("title") // Busque na tabela notes onde o user id seja igual ao informado e onde o titulo contenha a palavra informada e ordene por título
    }

    const userTags = await knex("tags").where({ user_id }) // Buscando na tabela tags as tags que pertencem ao user_id informado
    const notesWithTags = notes.map(note => { // Juntando as notas e as tags
      const noteTags = userTags.filter(tag => tag.note_id === note.id)
      
      return {
        ...note,
        tags: noteTags
      }
    })
    
    return response.json(notesWithTags)  
  }
}

module.exports = NotesController