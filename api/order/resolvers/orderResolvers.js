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
      dataSources.OrdersAPI.getOrders().then(r =>
        r.map(i => {
          console.log('aquió', i)
          return {
            id: i.id,
            User: users.find(x => x.id == i.user_id),
            total: i.total,
            created_at: i.created_at,
            modified_at: i.modified_at,
            items: items
              .filter(x => x.order_id == i.id)
              .map(k => ({
                id: k.id,
                quantity: k.quantity,
                created_at: k.created_at,
                modified_at: k.modified_at,
                product: dataSources.ProductsAPI.getProductById(k.product_id)
              }))
          }
        })
      ),
    order: (root, { id }, { dataSources }) => {
      return dataSources.OrdersAPI.getOrder(id)
    }
  },
  Mutation: {
    addOrder: async (root, { order }, { dataSources }) =>
      dataSources.OrdersAPI.addOrder(order),
    updateOrder: async (root, novosDados, { dataSources }) => {
      console.log(novosDados)
      return dataSources.OrdersAPI.updateProduct(novosDados)
    },
    deleteOrder: async (root, { id }, { dataSources }) =>
      dataSources.OrdersAPI.deleteProduct(id)
  }
}

module.exports = orderResolvers
