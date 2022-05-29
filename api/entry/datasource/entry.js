const { SQLDataSource } = require('datasource-sql')

class EntriesAPI extends SQLDataSource {
  constructor (dbConfig) {
    super(dbConfig)
  }

  async getEntries () {
    const Entries = await this.db.select('*').from('Entry')
    return Entries.map(async Entry => ({
      id: Entry.id,
    }))
  }

  async getEntryById (id) {
    const Entry = await this.db
    .select('*')
    .from('Entry')
    .where({ id: Number(id) })
    return ({
      id: Entry[0].id,
    })
  }

  async addEntry (Entry) {
    const Entry_id = await this.db
    .insert(Entry)
    .returning('id')
    .into('Entry')
    return {
      ...Entry,
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
