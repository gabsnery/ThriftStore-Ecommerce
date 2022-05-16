const { SQLDataSource } = require('datasource-sql')

class OrdersAPI extends SQLDataSource {
  constructor (dbConfig) {
    super(dbConfig)
  }
  async getOrders () {
    return this.db.select('*').from('order_details')
  }
  
  async getOrder (id) {
    const order = await this.db
      .select('*')
      .from('order_details')
      .where({ id: Number(id) })
    const items = await this.getOrderItemsByOrder(id)
    const i = order[0]
    console.log('getOrder', i)
    console.log('getOrderitems', items)
    return {
      id: i.id,
      total: i.total,
      created_at: i.created_at,
      modified_at: i.modified_at,
      deleted_at: i.deleted_at,
      items: items.map(k => ({
        id: k.id,
        quantity: k.quantity,
        created_at: k.created_at,
        modified_at: k.modified_at,
        product: this.context.dataSources.ProductsAPI.getProductById(
          k.product_id
        )
      }))
    }
  }
  async getOrderItemsByOrder (order_id) {
    const orderItems = await this.db
      .select('*')
      .from('order_items')
      .where({ order_id: Number(order_id) })
    console.log('getOrderItemsByOrder', orderItems)
    return orderItems
  }
  async addOrder (order) {
    const orderId = await this.db
      .insert({
        total: order.total,
        created_at: order.created_at,
        modified_at: order.modified_at,
        user_id: order.user_id
      })
      .returning('id')
      .into('order_details')
    await order.Items.map(async it => {
      await this.db
        .insert({ ...it, order_id: orderId[0] })
        .returning('id')
        .into('order_items')
    })
    const addedOrder = await this.getOrder(orderId[0])
    return { ...addedOrder }
  }
}
module.exports = OrdersAPI
