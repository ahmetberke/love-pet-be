import orderRepo from '../repositories/order-repository.js';

const orderService = {
  findOrder: async (orderId) => {
    return await orderRepo.findOrder(orderId);
  },

  findOrders: async () => {
    return await orderRepo.findOrders();
  },

  createOrder: async (order) => {
    return await orderRepo.createOrder(order);
  },

  deleteOrder: async (orderId) => {
    return await orderRepo.deleteOrder(orderId);
  },

  updateOrder: async (orderId, order) => {
    return await orderRepo.updateOrder(orderId, order);
  },
};

export default orderService;
