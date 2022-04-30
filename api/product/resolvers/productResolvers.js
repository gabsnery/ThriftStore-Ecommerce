const { GraphQLScalarType } = require('graphql')

const productResolvers = {
  CategoriesName: {
    ESTUDANTE: 'ESTUDANTE',
    DOCENTE: 'DOCENTE',
    COORDENACAO: 'COORDENACAO'
  },
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'string de data e hora no formato ISO-8601',
    serialize: value => value.toISOString(),
    parseValue: value => new Date(value),
    parseLiteral: ast => new Date(ast.value)
  }),
  Query: {
    products: (root, args, { dataSources }) =>
      dataSources.ProductsAPI.getProducts(),
    product: (root, { id }, { dataSources }) =>
      dataSources.ProductsAPI.getProductById(id)
  },
  Mutation: {
    addProduct: async (root, { user }, { dataSources }) =>
      dataSources.ProductsAPI.addProduct(user),
    updateProduct: async (root, novosDados, { dataSources }) => {
      console.log(novosDados)
      return dataSources.ProductsAPI.updateProduct(novosDados)
    },
    deleteProduct: async (root, { id }, { dataSources }) =>
      dataSources.ProductsAPI.deleteProduct(id)
  }
}

module.exports = productResolvers
