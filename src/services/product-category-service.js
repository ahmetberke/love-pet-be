import productCategoryRepo
  from '../repositories/product-category-repository.js';

const productCategoryService = {
  findProductCategory: async (productCategoryId) => {
    return await productCategoryRepo.findProductCategory(productCategoryId);
  },

  findProductCategories: async () => {
    return await productCategoryRepo.findProductCategories();
  },

  createProductCategory: async (productCategory) => {
    return await productCategoryRepo.createProductCategory(productCategory);
  },

  deleteProductCategory: async (productCategoryId) => {
    return await productCategoryRepo.deleteProductCategory(productCategoryId);
  },

  updateProductCategory: async (productCategoryId, productCategory) => {
    return await productCategoryRepo.updateProductCategory(productCategoryId,
        productCategory);
  },
};

export default productCategoryService;
