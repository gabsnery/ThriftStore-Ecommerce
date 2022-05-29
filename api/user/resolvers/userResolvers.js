const { GraphQLScalarType } = require('graphql')

const userResolvers = {
  Query: {
    users: (root, args, { dataSources }) =>
      dataSources.UsersAPI.getUsers(),
    user: (root, { id }, { dataSources }) =>
      dataSources.UsersAPI.getUserById(id)
  },
  Mutation: {
    addUser: async (root, { user }, { dataSources }) =>
      dataSources.UsersAPI.addUser(user),
    updateUser: async (root, novosDados, { dataSources }) => {
      return dataSources.UsersAPI.updateUser(novosDados)
    },
    deleteUser: async (root, { id }, { dataSources }) =>
      dataSources.UsersAPI.deleteUser(id)
  }
}

module.exports = userResolvers
