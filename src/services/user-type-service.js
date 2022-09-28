import userTypeRepo from '../repositories/user-type-repository.js';

const userTypeService = {
  findUserType: async (userTypeId) => {
    return await userTypeRepo.findUserType(userTypeId);
  },

  findUserTypes: async () => {
    return await userTypeRepo.findUserTypes();
  },

  createUserType: async (userType) => {
    return await userTypeRepo.createUserType(userType);
  },

  deleteUserType: async (userTypeId) => {
    return await userTypeRepo.deleteUserType(userTypeId);
  },

  updateUserType: async (userTypeId, userType) => {
    return await userTypeRepo.updateUserType(userTypeId, userType);
  },
};

export default userTypeService;
