const { GraphQLScalarType } = require('graphql')

const entryResolvers = {
  Query: {
    products: (root, args, { dataSources }) =>
      dataSources.ProductsAPI.getProducts(),
    product: (root, { id }, { dataSources }) =>
      dataSources.ProductsAPI.getProduct(id)
  },
  Mutation: {
    addProduct: async (root, { product }, { dataSources }) =>
      dataSources.ProductsAPI.addProduct(product),
    updateProduct: async (root, novosDados, { dataSources }) => {
      return dataSources.ProductsAPI.updateProduct(novosDados)
    },
    deleteProduct: async (root, { id }, { dataSources }) =>
      dataSources.ProductsAPI.deleteProduct(id)
  }
}

module.exports = entryResolvers
