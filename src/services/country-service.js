import countryRepo from '../repositories/country-repository.js';

const countryService = {
  findCountry: async (countryId) => {
    return await countryRepo.findCountry(countryId);
  },

  findCountries: async (query) => {
    return await countryRepo.findCountries(query);
  },

  createCountry: async (country) => {
    return await countryRepo.createCountry(country);
  },

  deleteCountry: async (countryId) => {
    return await countryRepo.deleteCountry(countryId);
  },

  updateCountry: async (countryId, country) => {
    return await countryRepo.updateCountry(countryId, country);
  },
};

export default countryService;
