import Province from '../models/province.js';

const provinceRepo = {
  findProvince: async (provinceId) => {
    return await Province.findByPk(provinceId);
  },

  findProvinces: async (query) => {
    if (query) {
      return await Province.findAll({
        where: query,
      });
    } else {
      return await Province.findAll();
    }
  },

  createProvince: async (province) => {
    return await Province.create(province);
  },

  deleteProvince: async (provinceId) => {
    return await Province.destroy({
      where: {
        id: provinceId,
      },
    });
  },

  updateProvince: async (provinceId, province) => {
    return await Province.update(province, {
      where: {
        id: provinceId,
      },
      returning: true,
    });
  },
};

export default provinceRepo;
