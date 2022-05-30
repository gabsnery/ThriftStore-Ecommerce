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
      type: await this.getUserType(User.user_type_id)
    }))
  }

  async getUserType(id) {
    return this.db.select('*').first().from('user_type').where({id:id})
  }

  async getUserTypeByName(name) {
    return this.db.select('*').first().from('user_type').where({name:name})
  }
  async getUser(id) {
    const User = await this.db
    .select('*')
    .from('User')
    .where({ id: Number(id) })
    return ({
      id: User[0].id,
      name: User[0].name,
      type: await this.getUserType(User[0].user_type_id)
    })
  }

  async addUser (User) {
    const user_type_id = await this.getUserTypeByName(User.type)
    const User_id = await this.db
    .insert({name:User.name,user_type_id:+user_type_id.id})
    .returning('id')
    .into('user')
    const new_user = await this.getUser(User_id[0])
    return new_user
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
