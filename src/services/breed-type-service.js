import breedTypeRepo from '../repositories/breed-type-repository.js';

const breedTypeService = {
  findBreedType: async (breedTypeId) => {
    return await breedTypeRepo.findBreedType(breedTypeId);
  },

  findBreedTypes: async () => {
    return await breedTypeRepo.findBreedTypes();
  },

  createBreedType: async (breedType) => {
    return await breedTypeRepo.createBreedType(breedType);
  },

  deleteBreedType: async (breedTypeId) => {
    return await breedTypeRepo.deleteBreedType(breedTypeId);
  },

  updateBreedType: async (breedTypeId, breedType) => {
    return await breedTypeRepo.updateBreedType(breedTypeId, breedType);
  },
};

export default breedTypeService;
