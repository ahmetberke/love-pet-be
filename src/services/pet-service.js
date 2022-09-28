import petRepo from '../repositories/pet-repository.js';

const petService = {
  findPet: async (petId) => {
    return await petRepo.findPet(petId);
  },

  findPets: async () => {
    return await petRepo.findPets();
  },

  createPet: async (pet) => {
    return await petRepo.createPet(pet);
  },

  deletePet: async (petId) => {
    return await petRepo.deletePet(petId);
  },

  updatePet: async (petId, pet) => {
    return await petRepo.updatePet(petId, pet);
  },
};

export default petService;
