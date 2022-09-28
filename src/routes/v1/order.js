import orderService from '../../services/order-service.js';
import {verifyToken} from '../../middleware/auth.js';
import express from 'express';

const orderRouter = express.Router();
orderRouter.use(verifyToken);

orderRouter.post('/', async (req, res, next) => {
  try {
    const order = await orderService.createOrder(req.body);
    return res.status(200).json(order.toJSON());
  } catch (e) {
    next(e);
  }
});

orderRouter.get('/', async (req, res, next) => {
  try {
    const orders = await orderService.findOrders();
    return res.status(200).json(JSON.stringify(orders));
  } catch (e) {
    next(e);
  }
});

orderRouter.get('/:orderId', async (req, res, next) => {
  try {
    const order = await orderService.findOrder(req.params.orderId);
    if (order !== null) {
      return res.status(200).json(order.toJSON());
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

orderRouter.delete('/:orderId', async (req, res, next) => {
  try {
    await orderService.deleteOrder(req.params.orderId);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

orderRouter.put('/:orderId', async (req, res, next) => {
  try {
    const [, orders] = await orderService.updateOrder(req.params.orderId,
        req.body);
    return res.status(200).json(JSON.stringify(orders));
  } catch (e) {
    next(e);
  }
});

export default orderRouter;
