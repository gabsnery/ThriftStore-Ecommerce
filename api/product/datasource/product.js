const { SQLDataSource } = require('datasource-sql')

class ProductsAPI extends SQLDataSource {
  constructor (dbConfig) {
    super(dbConfig)
  }

  async getProducts () {
    const products = await this.db.select('*').from('product')
    return products.map(async product => ({
      id: product.id,
      name: product.name,
      desc: product.desc,
      SKU: product.SKU,
      price: product.price
    }))
  }

  async getProductById (id) {
    const product = await this.db
    .select('*')
    .from('product')
    .where({ id: Number(id) })
    return product
  }

  async addProduct (product) {
    const product_id = await this.db
    .insert(product)
    .returning('id')
    .into('product')
    return {
      ...product,
      id: product_id
    }
  }

  async atualizaProduct (novosDados) {
    const category = await this.get(
      `categories?type=${novosDados.product.category}`
    )
    await this.put(`products/${novosDados.id}`, {
      ...novosDados.product,
      category: category[0].id
    })
    return {
      ...this.respostaCustom,
      productAtualizado: {
        ...novosDados.product,
        category: category[0]
      }
    }
  }

  async deletaProduct (id) {
    await this.delete(`products/${id}`)
    return this.respostaCustom
  }
}

module.exports = ProductsAPI
