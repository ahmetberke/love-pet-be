import BreedType from '../models/breed-type.js';

const breedTypeRepo = {
  findBreedType: async (breedTypeId) => {
    return await BreedType.findByPk(breedTypeId);
  },

  findBreedTypes: async () => {
    return await BreedType.findAll();
  },

  createBreedType: async (breedType) => {
    return await BreedType.create(breedType);
  },

  deleteBreedType: async (breedTypeId) => {
    return await BreedType.destroy({
      where: {
        id: breedTypeId,
      },
    });
  },

  updateBreedType: async (breedTypeId, breedType) => {
    return await BreedType.update(breedType, {
      where: {
        id: breedTypeId,
      },
      returning: true,
    });
  },
};

export default breedTypeRepo;
