import City from '../models/city.js';
import parseOData from 'odata-sequelize';
import sequelize from '../db/db-con.js';

const cityRepo = {
  findCity: async (cityId) => {
    return await City.findByPk(cityId);
  },

  findCities: async (query) => {
    if (query) {
      const seqQuery = parseOData(query, sequelize);
      return await City.findAll(seqQuery);
    } else {
      return await City.findAll();
    }
  },

  createCity: async (city) => {
    return await City.create(city);
  },

  deleteCity: async (cityId) => {
    return await City.destroy({
      where: {
        id: cityId,
      },
    });
  },

  updateCity: async (cityId, city) => {
    return await City.update(city, {
      where: {
        id: cityId,
      },
      returning: true,
    });
  },
};

export default cityRepo;
