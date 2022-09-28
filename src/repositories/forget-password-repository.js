import ForgetPassword from '../models/forget-password.js';

const ForgetPasswordRepo = {
  findForgetPassword: async (forgetPasswordId) => {
    return await ForgetPassword.findByPk(forgetPasswordId);
  },

  createForgetPassword: async (forgetPassword) => {
    return await ForgetPassword.create(forgetPassword);
  },

  deleteForgetPassword: async (forgetPasswordId) => {
    return await ForgetPassword.destroy({
      where: {
        id: forgetPasswordId,
      },
    });
  },
};

export default ForgetPasswordRepo;
