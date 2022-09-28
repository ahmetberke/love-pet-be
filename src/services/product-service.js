import productRepo from '../repositories/product-repository.js';

const productService = {
  findProduct: async (productId) => {
    return await productRepo.findProduct(productId);
  },

  findProducts: async () => {
    return await productRepo.findProducts();
  },

  createProduct: async (product) => {
    return await productRepo.createProduct(product);
  },

  deleteProduct: async (productId) => {
    return await productRepo.deleteProduct(productId);
  },

  updateProduct: async (productId, product) => {
    return await productRepo.updateProduct(productId, product);
  },
};

export default productService;
