const knex = require("../database/knex")
const AppError = require("../utils/AppError")

class MoviesController {
  async create(request, response) {
    const { title, description, rating, tags } = request.body
    const user_id = request.user.id

    const ratingIsNumber = Math.round(rating)

    if (ratingIsNumber < 1 || ratingIsNumber > 5 || isNaN(ratingIsNumber)) {
      throw new AppError("Informe uma nota de 1 a 5.")
    }

    const [movie_id] = await knex("movies").insert({
      title,
      description,
      rating: ratingIsNumber,
      user_id
    })

    const tagsInsert = tags.map(name => {
      return {
        movie_id,
        user_id,
        name
      }
    })

    await knex("tags").insert(tagsInsert)

    return response.json()
  }

  async show(request, response) {
    const { id } = request.params

    const movieWithUser = await knex("movies")
      .select("users.name", "users.avatar", "movies.*")
      .where("movies.id", id)
      .innerJoin("users", "users.id", "movies.user_id",)
      .first();

    const tags = await knex("tags").where({ movie_id: id }).orderBy("name")

    return response.json({
      ...movieWithUser,
      tags
    })
  }

  async delete(request, response) {
    const { id } = request.params

    await knex("movies").where({ id }).delete()

    return response.json()
  }

  async index(request, response) {
    const { title, tags } = request.query
    const user_id = request.user.id

    let movies

    if (tags) {
      const filterTags = tags.split(',').map(tag => tag)

      movies = await knex("tags")
        .select([
          "movies.id",
          "movies.title",
          "movies.user_id"
        ])
        .where("movies.user_id", user_id)
        .whereLike("movies.title", `%${title}%`)
        .whereIn("name", filterTags)
        .innerJoin("movies", "movies.id", "tags.movie_id")
        .groupBy("movies.id")
        .orderBy("movies.title")

    } else {
      movies = await knex("movies")
        .where({ user_id })
        .whereLike("title", `%${title}%`)
        .orderBy("title")
    }

    const userTags = await knex("tags").where({ user_id })
    const moviesWithTags = movies.map(movie => {
      const movieTags = userTags.filter(tag => tag.movie_id === movie.id)

      return {
        ...movie,
        tags: movieTags
      }
    })

    return response.json(moviesWithTags)
  }
}

module.exports = MoviesController