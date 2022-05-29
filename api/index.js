const { ApolloServer } = require('apollo-server')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const path = require('path')

const productSchema = require('./product/schema/product.graphql')
const productResolvers = require('./product/resolvers/productResolvers')
const ProductsAPI = require('./product/datasource/product')

const orderSchema = require('./order/schema/order.graphql')
const orderResolvers = require('./order/resolvers/orderResolvers')
const OrdersAPI = require('./order/datasource/order')

const userSchema = require('./user/schema/user.graphql')
const userResolvers = require('./user/resolvers/userResolvers')
const UsersAPI = require('./user/datasource/user')

const entrySchema = require('./entry/schema/entry.graphql')
const entryResolvers = require('./entry/resolvers/entryResolvers')
const EntriesAPI = require('./entry/datasource/entry')

const typeDefs = mergeTypeDefs([
  productSchema,
  orderSchema,
  userSchema,
  entrySchema
])
const resolvers = [
  productResolvers,
  orderResolvers,
  userResolvers,
  entryResolvers
]
const dbConfig = {
  client: 'mysql',
  useNullAsDefault: true,
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'novaSenha1',
    database: 'thriftstore'
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      ProductsAPI: new ProductsAPI(dbConfig),
      OrdersAPI: new OrdersAPI(dbConfig),
      UsersAPI: new UsersAPI(dbConfig),
      EntriesAPI: new EntriesAPI(dbConfig)
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Servidor rodando na porta ${url}`)
})
