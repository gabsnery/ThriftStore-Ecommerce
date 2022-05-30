const { GraphQLScalarType } = require('graphql')

const entryResolvers = {
  Query: {
    entries: (root, args, { dataSources }) =>
      dataSources.EntriesAPI.getEntries(),
    entry: (root, { id }, { dataSources }) =>
      dataSources.EntriesAPI.getEntry(id)
  },
  Mutation: {
    addEntry: async (root, { Entry }, { dataSources }) =>
      dataSources.EntriesAPI.addEntry(Entry),
    updateEntry: async (root, novosDados, { dataSources }) => {
      return dataSources.EntriesAPI.updateEntry(novosDados)
    },
    deleteEntry: async (root, { id }, { dataSources }) =>
      dataSources.EntriesAPI.deleteEntry(id)
  }
}

module.exports = entryResolvers
