import UserType from '../models/user-type.js';

const userTypeRepo = {
  findUserType: async (userTypeId) => {
    return await UserType.findByPk(userTypeId);
  },

  findUserTypes: async () => {
    return await UserType.findAll();
  },

  createUserType: async (userType) => {
    return await UserType.create(userType);
  },

  deleteUserType: async (userTypeId) => {
    return await UserType.destroy({
      where: {
        id: userTypeId,
      },
    });
  },

  updateUserType: async (userTypeId, userType) => {
    return await UserType.update(userType, {
      where: {
        id: userTypeId,
      },
      returning: true,
    });
  },
};

export default userTypeRepo;
