const { GraphQLScalarType } = require('graphql')

const orderResolvers = {
  Query: {
    orders: (root, args, { dataSources }) => dataSources.OrdersAPI.getOrders(),
    order: (root, { id }, { dataSources }) => {
      return dataSources.OrdersAPI.getOrder(id)
    }
  },
  Mutation: {
    addOrder: async (root, { order }, { dataSources }) => {
      return dataSources.OrdersAPI.addOrder(order)
    },
    updateOrder: async (root, novosDados, { dataSources }) => {
      return dataSources.OrdersAPI.updateProduct(novosDados)
    },
    updateOrderItems: async (root, novosDados, { dataSources }) => {
      return dataSources.OrdersAPI.updateOrderItems(novosDados)
    },
    deleteOrder: async (root, { id }, { dataSources }) =>
      dataSources.OrdersAPI.deleteProduct(id)
  }
}

module.exports = orderResolvers
