import Country from '../models/country.js';
import City from '../models/city.js';
import Province from '../models/province.js';
import parseOData from 'odata-sequelize';
import sequelize from '../db/db-con.js';

const countryRepo = {
  findCountry: async (countryId) => {
    return await Country.findByPk(countryId);
  },

  findCountries: async (query) => {
    if (query) {
      const seqQuery = parseOData(query, sequelize);
      if (query.indexOf('$expand') >= 0) {
        seqQuery['include'] = {model: City, include: {model: Province}};
      }

      return await Country.findAll(seqQuery);
    } else {
      return await Country.findAll();
    }
  },

  createCountry: async (country) => {
    return await Country.create(country);
  },

  deleteCountry: async (countryId) => {
    return await Country.destroy({
      where: {
        id: countryId,
      },
    });
  },

  updateCountry: async (countryId, country) => {
    return await Country.update(country, {
      where: {
        id: countryId,
      },
      returning: true,
    });
  },
};

export default countryRepo;
