import Order from '../models/order.js';

const orderRepo = {
  findOrder: async (orderId) => {
    return await Order.findByPk(orderId);
  },

  findOrders: async () => {
    return await Order.findAll();
  },

  createOrder: async (order) => {
    return await Order.create(order);
  },

  deleteOrder: async (orderId) => {
    return await Order.destroy({
      where: {
        id: orderId,
      },
    });
  },

  updateOrder: async (orderId, order) => {
    return await Order.update(order, {
      where: {
        id: orderId,
      },
      returning: true,
    });
  },
};

export default orderRepo;
