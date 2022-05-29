const { SQLDataSource } = require('datasource-sql')

class ItemsAPI extends SQLDataSource {
  constructor (dbConfig) {
    super(dbConfig)
  }

  async getItems () {
    const Items = await this.db.select('*').from('Item')
    return Items.map(async Item => ({
      id: Item.id,
      name: Item.name,
      desc: Item.desc,
      SKU: Item.SKU,
      price: Item.price
    }))
  }

  async getItemById (id) {
    const Item = await this.db
    .select('*')
    .from('Item')
    .where({ id: Number(id) })
    return ({
      id: Item[0].id,
      name: Item[0].name,
      desc: Item[0].desc,
      SKU: Item[0].SKU,
      price: Item[0].price
    })
  }

  async addItem (Item) {
    const Item_id = await this.db
    .insert(Item)
    .returning('id')
    .into('Item')
    return {
      ...Item,
      id: Item_id
    }
  }

  async updateItem (novosDados) {
    const category = await this.get(
      `categories?type=${novosDados.Item.category}`
    )
    await this.put(`Items/${novosDados.id}`, {
      ...novosDados.Item,
      category: category[0].id
    })
    return {
      ...this.respostaCustom,
      ItemAtualizado: {
        ...novosDados.Item,
        category: category[0]
      }
    }
  }

  async removeItem (id) {
    await this.delete(`Items/${id}`)
    return this.respostaCustom
  }
}

module.exports = ItemsAPI
