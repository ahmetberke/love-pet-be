import userRepo from '../repositories/user-repository.js';

const userService = {
  findUserByUsername: async (username) => {
    return await userRepo.findUserByUsername(username);
  },

  findUserByUsernameOrMail: async (usernameOrMail) => {
    return await userRepo.findUserByUsernameOrMail(usernameOrMail);
  },

  findUsers: async () => {
    return await userRepo.findUsers();
  },

  findUser: async (userId) => {
    return await userRepo.findUser(userId);
  },

  createUser: async (user) => {
    return await userRepo.createUser(user);
  },

  deleteUser: async (userId) => {
    return await userRepo.deleteUser(userId);
  },

  updateUser: async (userId, user) => {
    return await userRepo.updateUser(userId, user);
  },
};

export default userService;
