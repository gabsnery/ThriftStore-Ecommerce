const { RESTDataSource } = require('apollo-datasource-rest')

class ProductsAPI extends RESTDataSource {
  constructor () {
    super()
    this.baseURL = 'http://localhost:3000'
    this.respostaCustom = {
      code: 201,
      mensagem: 'operação feita com sucesso'
    }
  }

  async getProducts () {
    const products = await this.get('/products')
    return products.map(async product => ({
      id: product.id,
      name: product.name,
      desc: product.desc,
      SKU: product.SKU,
      price: product.price,
      category: await this.get(`/categories/${product.category_id}`)
    }))
  }

  async getProductById (id) {
    const product = await this.get(`/products/${id}`)
    product.category = await this.get(`/categories/${product.category_id}`)
    return product
  }

  async addProduct (product) {
    const products = await this.get('/products')
    product.id = products.length + 1
    const role = await this.get(`categories?name=${product.category}`)
    await this.post('products', { ...product, category: category[0].id })
    return {
      ...product,
      role: role[0]
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
