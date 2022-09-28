import productService from '../../services/product-service.js';
import {verifyToken} from '../../middleware/auth.js';
import express from 'express';

const productRouter = express.Router();
productRouter.use(verifyToken);

productRouter.post('/', async (req, res, next) => {
  try {
    const product = await productService.createProduct(req.body);
    return res.status(200).json(product.toJSON());
  } catch (e) {
    next(e);
  }
});

productRouter.get('/', async (req, res, next) => {
  try {
    const products = await productService.findProducts();
    return res.status(200).json(JSON.stringify(products));
  } catch (e) {
    next(e);
  }
});

productRouter.get('/:productId', async (req, res, next) => {
  try {
    const product = await productService.findProduct(req.params.productId);
    if (product !== null) {
      return res.status(200).json(product.toJSON());
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

productRouter.delete('/:productId', async (req, res, next) => {
  try {
    await productService.deleteProduct(req.params.productId);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

productRouter.put('/:productId', async (req, res, next) => {
  try {
    const [, products] =
      await productService.updateProduct(req.params.productId, req.body);
    return res.status(200).json(JSON.stringify(products));
  } catch (e) {
    next(e);
  }
});

export default productRouter;
