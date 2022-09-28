import ProductCategory from '../models/product-category.js';

const productCategoryRepo = {
  findProductCategory: async (productCategoryId) => {
    return await ProductCategory.findByPk(productCategoryId);
  },

  findProductCategories: async () => {
    return await ProductCategory.findAll();
  },

  createProductCategory: async (productCategory) => {
    return await ProductCategory.create(productCategory);
  },

  deleteProductCategory: async (productCategoryId) => {
    return await ProductCategory.destroy({
      where: {
        id: productCategoryId,
      },
    });
  },

  updateProductCategory: async (productCategoryId, productCategory) => {
    return await ProductCategory.update(productCategory, {
      where: {
        id: productCategoryId,
      },
      returning: true,
    });
  },
};

export default productCategoryRepo;
