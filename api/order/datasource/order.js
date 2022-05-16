const { SQLDataSource } = require('datasource-sql')

class OrdersAPI extends SQLDataSource {
  constructor (dbConfig) {
    super(dbConfig)
  }
  async getOrders () {
    const orders = await this.db.select('*').from('order_details');
    return (orders.map(i => {
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
    }))
  }
  async getOrder (id) {
    const order = await this.db
      .select('*')
      .from('order_details')
      .where({ id: Number(id) })
    const items = await this.getOrderItemsByOrder(id)
    const i = order[0]

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
    return orderItems
  }
  async addOrder (order) {
    const orderId = await this.db
      .insert({
        total: order.total,
        created_at: new Date(),
        modified_at: new Date(),
        user_id: order.user_id
      })
      .into('order_details')
    await order.Items.map(async it => {
      await this.db
        .insert({ ...it,created_at: new Date(), order_id: orderId[0] })
        .into('order_items')
    })
    const addedOrder = await this.getOrder(orderId[0])
    return { ...addedOrder }
  }
  async updateOrderItems ({orderId,Items}) {
    const order_items= await this.getOrderItemsByOrder(orderId)
    const itemsToRemove=order_items.filter(x => !Items.map(i=>+i.id).includes(+x.id))
    const itemsToAdd=Items.filter(x=>x.id == undefined)
    const itemsToUpdate=Items.filter(x => order_items.map(i=>+i.id).includes(+x.id))
    itemsToRemove.map(async i=>{
      await this.db
      .from('order_items')
      .where({ id: Number(i.id) }).del()
    })
    itemsToAdd.map(async it=>{
      await this.db
        .insert({ ...it,created_at: new Date(), order_id: orderId })
        .returning('id')
        .into('order_items')
    })
    itemsToUpdate.map(async it=>{
      await this.db
      .from('order_items')
      .where({ id: Number(it.id) }).update(it)
    })
    const finalItems= await this.getOrderItemsByOrder(orderId)

    return {code:200,
      mensagem:"FOi"}
  }
  
}
module.exports = OrdersAPI
