import Pet from '../models/pet.js';

const petRepo = {
  findPet: async (petId) => {
    return await Pet.findByPk(petId);
  },

  findPets: async () => {
    return await Pet.findAll();
  },

  createPet: async (pet) => {
    return await Pet.create(pet);
  },

  deletePet: async (petId) => {
    return await Pet.destroy({
      where: {
        id: petId,
      },
    });
  },

  updatePet: async (petId, pet) => {
    return await Pet.update(pet, {
      where: {
        id: petId,
      },
      returning: true,
    });
  },
};

export default petRepo;
