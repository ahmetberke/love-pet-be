import productCategoryService from '../../services/product-category-service.js';
import {verifyToken} from '../../middleware/auth.js';
import express from 'express';

const productCategoryRouter = express.Router();
productCategoryRouter.use(verifyToken);

productCategoryRouter.post('/', async (req, res, next) => {
  try {
    const productCategory = await productCategoryService.createProductCategory(
        req.body);
    return res.status(200).json(productCategory.toJSON());
  } catch (e) {
    next(e);
  }
});

productCategoryRouter.get('/', async (req, res, next) => {
  try {
    const productCategories =
      await productCategoryService.findProductCategories();
    return res.status(200).json(JSON.stringify(productCategories));
  } catch (e) {
    next(e);
  }
});

productCategoryRouter.get('/:productCategoryId', async (req, res, next) => {
  try {
    const productCategory = await productCategoryService.findProductCategory(
        req.params.productCategoryId);
    if (productCategory !== null) {
      return res.status(200).json(productCategory.toJSON());
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

productCategoryRouter.delete('/:productCategoryId', async (req, res, next) => {
  try {
    await productCategoryService.deleteProductCategory(
        req.params.productCategoryId);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

productCategoryRouter.put('/:productCategoryId', async (req, res, next) => {
  try {
    const [, productCategories] =
      await productCategoryService.updateProductCategory(
          req.params.productCategoryId, req.body,
      );
    return res.status(200).json(JSON.stringify(productCategories));
  } catch (e) {
    next(e);
  }
});

export default productCategoryRouter;
