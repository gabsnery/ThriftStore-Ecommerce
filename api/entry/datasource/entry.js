const { SQLDataSource } = require('datasource-sql')

class EntriesAPI extends SQLDataSource {
  constructor (dbConfig) {
    super(dbConfig)
  }

  async getEntries () {
    const Entries = await this.db.select('*').from('entry_details')
    return Entries.map(async i => {
      const items = await this.getEntryItemsByOrder(i.id)
      console.log(items)
      return {
        id: i.id,
        total: i.total,
        User: await this.context.dataSources.UsersAPI.getUser(i.user_id),
        created_at: i.created_at,
        modified_at: i.modified_at,
        deleted_at: i.deleted_at,
        items: items.map(async k => ({
          id: k.id,
          quantity: k.quantity,
          created_at: k.created_at,
          modified_at: k.modified_at,
          product: await this.context.dataSources.ProductsAPI.getProduct(
            k.product_id
          )
        }))
      }
    })
  }

  async getEntryItemsByOrder (id) {
    const entryItems = await this.db
      .select('*')
      .from('entry_items')
      .where({ entry_id: Number(id) })
    return entryItems
  }
  async getEntry (id) {
    const i = await this.db
      .select('*')
      .first()
      .from('entry_details')
      .where({ id: Number(id) })
    const items = await this.getEntryItemsByOrder(id)
    return {
      id: i.id,
      total: i.total,
      User: await this.context.dataSources.UsersAPI.getUser(i.user_id),
      created_at: i.created_at,
      modified_at: i.modified_at,
      deleted_at: i.deleted_at,
      items: items.map(async k => ({
        id: k.id,
        quantity: k.quantity,
        created_at: k.created_at,
        modified_at: k.modified_at,
        Product: await this.context.dataSources.ProductsAPI.getProduct(
          k.product_id
        )
      }))
    }
  }

  async addEntry (Entry) {
    const Entry_id = await this.db
      .insert({
        user_id: Entry.user_id,
        total: Entry.total,
        created_at: new Date(),
        modified_at: new Date(),
      })
      .into('entry_details')
    console.log(Entry_id)
    console.log(Entry)
    const Items = Entry.items ?? []
    console.log(Items)
    Items.map(async item => {
      if (item.Product.id) {
        this.addEntryItem({
          product_id: item.Product.id,
          quantity: item.quantity,
          entry_id: Entry_id
        })
      } else {
        const new_product = await this.context.dataSources.ProductsAPI.addProduct(
          item.Product
        )
        this.addEntryItem({
          product_id: new_product.id,
          quantity: item.quantity,
          entry_id: Entry_id
        })
      }
    })
    return await this.getEntry(Entry_id)
  }
  async addEntryItem (EntryItem) {
    const Entry_id = await this.db
      .insert(EntryItem)
      .returning('id')
      .into('entry_items')
    return {
      ...EntryItem,
      id: Entry_id
    }
  }
  async updateEntry (novosDados) {
    const category = await this.get(
      `categories?type=${novosDados.Entry.category}`
    )
    await this.put(`Entries/${novosDados.id}`, {
      ...novosDados.Entry,
      category: category[0].id
    })
    return {
      ...this.respostaCustom,
      EntryAtualizado: {
        ...novosDados.Entry,
        category: category[0]
      }
    }
  }

  async removeEntry (id) {
    await this.delete(`Entries/${id}`)
    return this.respostaCustom
  }
}

module.exports = EntriesAPI
