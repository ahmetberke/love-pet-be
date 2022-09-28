import Breed from '../models/breed.js';

const breedRepo = {
  findBreed: async (breedId) => {
    return await Breed.findByPk(breedId);
  },

  findBreeds: async () => {
    return await Breed.findAll();
  },

  createBreed: async (breed) => {
    return await Breed.create(breed);
  },

  deleteBreed: async (breedId) => {
    return await Breed.destroy({
      where: {
        id: breedId,
      },
    });
  },

  updateBreed: async (breedId, breed) => {
    return await Breed.update(breed, {
      where: {
        id: breedId,
      },
      returning: true,
    });
  },
};

export default breedRepo;
