import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    try {

      const sequelize = OrderModel.sequelize

      await sequelize.transaction(async transaction => {
        await OrderItemModel.destroy({
          where: {
            order_id: entity.id
          },
          transaction
        })

        const items = entity.items.map(item => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
          order_id: entity.id
        }))

        await OrderItemModel.bulkCreate(items, {
          transaction
        })

        await OrderModel.update(
          { total: entity.total() },
          { where: { id: entity.id }, transaction }
        )
      })


    } catch (err) {
      console.log(err)
    }
  }
  async find(id: string): Promise<Order> {
    try {

      const order = await OrderModel.findOne({
        where: {
          id
        },
        include: ["items"],
      })

      const orderItems = order.items.map(item => new OrderItem(
        item.id,
        item.name,
        item.price,
        item.product_id,
        item.quantity
      ))
      return new Order(order.id, order.customer_id, orderItems)

    } catch (err) {
      console.log(err)
    }
  }


  async findAll(): Promise<Order[]> {
    try {
      const orders = await OrderModel.findAll({
        include: ["items"],
      })
      const ordersResult: Order[] = []

      for (const order of orders) {
        const orderItems = order.items.map(item => new OrderItem(
          item.id,
          item.name,
          item.price,
          item.product_id,
          item.quantity
        ))
        ordersResult.push(new Order(order.id, order.customer_id, orderItems))
      }
      return ordersResult
    } catch (err) {
      console.log(err)
    }



  }
}
