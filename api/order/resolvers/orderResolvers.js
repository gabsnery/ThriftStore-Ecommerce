const { GraphQLScalarType } = require('graphql')

const items = [
  {
    id: 2,
    quantity: 2,
    created_at: new Date('Sept 24, 22 13:20:18'),
    modified_at: new Date('Sept 24, 22 13:20:18'),
    deleted_at: new Date('Sept 24, 22 13:20:18'),
    order_id: 1,
    product_id: 1
  },
  {
    id: 3,
    quantity: 2,
    created_at: new Date('Sept 24, 22 13:20:18'),
    modified_at: new Date('Sept 24, 22 13:20:18'),
    deleted_at: new Date('Sept 24, 22 13:20:18'),
    order_id: 1,
    product_id: 2
  },
  {
    id: 4,
    quantity: 2,
    created_at: new Date('Sept 24, 22 13:20:18'),
    modified_at: new Date('Sept 24, 22 13:20:18'),
    deleted_at: new Date('Sept 24, 22 13:20:18'),
    order_id: 2,
    product_id: 2
  }
]
const users = [
  {
    id: 1,
    name: 'Gabriela Nery'
  },
  {
    id: 2,
    name: 'Douglas Ian'
  }
]
const orderResolvers = {
  Query: {
    orders: (root, args, { dataSources }) =>
      dataSources.OrdersAPI.getOrders(),
    order: (root, { id }, { dataSources }) => {
      return dataSources.OrdersAPI.getOrder(id)
    }
  },
  Mutation: {
    addOrder: async (root, { order }, { dataSources }) =>
      dataSources.OrdersAPI.addOrder(order),
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
