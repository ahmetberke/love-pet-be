import User from '../models/user.js';
import {Op} from 'sequelize';

const userRepo = {
  findUserByUsername: async (username) => {
    return await User.findOne({
      where: {
        username: username,
      },
    });
  },

  findUserByUsernameOrMail: async (usernameOrMail) => {
    return await User.findOne({
      where: {
        [Op.or]: {
          username: usernameOrMail,
          mail: usernameOrMail,
        },
      },
    });
  },

  findUser: async (userId) => {
    return await User.findByPk(userId);
  },

  findUsers: async () => {
    return await User.findAll();
  },

  createUser: async (user) => {
    return await User.create(user);
  },

  deleteUser: async (userId) => {
    return await User.destroy({
      where: {
        id: userId,
      },
    });
  },

  updateUser: async (userId, user) => {
    return await User.update(user, {
      where: {
        id: userId,
      },
      returning: true,
    });
  },
};

export default userRepo;
