const { ApolloServer } = require('apollo-server')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const path = require('path')
const productSchema = require('./product/schema/product.graphql')
const productResolvers = require('./product/resolvers/productResolvers')
const ProductsAPI = require('./product/datasource/product')

const orderSchema = require('./order/schema/order.graphql')
const orderResolvers = require('./order/resolvers/orderResolvers')
const OrdersAPI = require('./order/datasource/order')

const typeDefs = mergeTypeDefs([productSchema, orderSchema])
const resolvers = [productResolvers, orderResolvers]
const dbConfig = {
  client: 'mysql',
  useNullAsDefault: true,
  connection: {
    host: '127.0.0.1',
    port: 3308,
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
      ProductsAPI: new ProductsAPI(),
      OrdersAPI: new OrdersAPI(dbConfig)
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Servidor rodando na porta ${url}`)
})
