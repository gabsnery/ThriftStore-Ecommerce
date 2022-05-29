const { SQLDataSource } = require('datasource-sql')

class UsersAPI extends SQLDataSource {
  constructor (dbConfig) {
    super(dbConfig)
  }

  async getUsers () {
    const Users = await this.db.select('*').from('user')
    return Users.map(async User => ({
      id: User.id,
      name: User.name,
    }))
  }

  async getUserById (id) {
    const User = await this.db
    .select('*')
    .from('User')
    .where({ id: Number(id) })
    return ({
      id: User[0].id,
      name: User[0].name,
      desc: User[0].desc,
      SKU: User[0].SKU,
      price: User[0].price
    })
  }

  async addUser (User) {
    const User_id = await this.db
    .insert(User)
    .returning('id')
    .into('User')
    return {
      ...User,
      id: User_id
    }
  }

  async updateUser (novosDados) {
    const category = await this.get(
      `categories?type=${novosDados.User.category}`
    )
    await this.put(`Users/${novosDados.id}`, {
      ...novosDados.User,
      category: category[0].id
    })
    return {
      ...this.respostaCustom,
      UserAtualizado: {
        ...novosDados.User,
        category: category[0]
      }
    }
  }

  async removeUser (id) {
    await this.delete(`Users/${id}`)
    return this.respostaCustom
  }
}

module.exports = UsersAPI
