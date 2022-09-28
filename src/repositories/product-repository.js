import Product from '../models/product.js';

const productRepo = {
  findProduct: async (productId) => {
    return await Product.findByPk(productId);
  },

  findProducts: async () => {
    return await Product.findAll();
  },

  createProduct: async (product) => {
    return await Product.create(product);
  },

  deleteProduct: async (productId) => {
    return await Product.destroy({
      where: {
        id: productId,
      },
    });
  },

  updateProduct: async (productId, product) => {
    return await Product.update(product, {
      where: {
        id: productId,
      },
      returning: true,
    });
  },
};

export default productRepo;
