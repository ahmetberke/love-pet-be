import breedRepo from '../repositories/breed-repository.js';

const breedService = {
  findBreed: async (breedId) => {
    return await breedRepo.findBreed(breedId);
  },

  findBreeds: async () => {
    return await breedRepo.findBreeds();
  },

  createBreed: async (breed) => {
    return await breedRepo.createBreed(breed);
  },

  deleteBreed: async (breedId) => {
    return await breedRepo.deleteBreed(breedId);
  },

  updateBreed: async (breedId, breed) => {
    return await breedRepo.updateBreed(breedId, breed);
  },
};

export default breedService;
