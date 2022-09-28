import ForgetPasswordRepo from '../repositories/forget-password-repository.js';

const ForgetPasswordService = {
  findForgetPassword: async (forgetPasswordId) => {
    return await ForgetPasswordRepo.findForgetPassword(forgetPasswordId);
  },

  createForgetPassword: async (forgetPassword) => {
    return await ForgetPasswordRepo.createForgetPassword(forgetPassword);
  },

  deleteForgetPassword: async (forgetPasswordId) => {
    return await ForgetPasswordRepo.deleteForgetPassword(forgetPasswordId);
  },
};

export default ForgetPasswordService;
