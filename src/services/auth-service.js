import userService from './user-service.js';
import forgetPasswordService from './forget-password-service.js';
import hash from '../middleware/sha256-hasher.js';
import generateUUID from '../middleware/uuid-generator.js';
import {
  signToken,
  validatePassword,
  validateUsername,
} from '../middleware/auth.js';
import mailService from './mail-service.js';
import sequelize from '../db/db-con.js';

const authService = {
  signup: async (userPayload) => {
    const [isValidPassword, passwordValidationMsg] = validatePassword(
        userPayload.password);
    if (!isValidPassword) {
      return [400, null, passwordValidationMsg];
    }
    const [isValidUsername, usernameValidationMsg] = validateUsername(
        userPayload.username);
    if (!isValidUsername) {
      return [400, null, usernameValidationMsg];
    }

    const user = await userService.createUser(userPayload);
    const token = signToken({userId: user.id, userTypeId: user.userTypeId});
    return [200, token, null];
  },

  login: async (userPayload) => {
    const user = await userService.findUserByUsernameOrMail(
        userPayload.usernameOrMail);
    if (user === null) {
      return [400, null, 'Wrong username or mail!'];
    }

    if (hash(user.mail + userPayload.password) !== user.password) {
      return [400, null, 'Wrong password!'];
    }

    const token = signToken({userId: user.id, userTypeId: user.userTypeId},
        userPayload.rememberme);
    return [200, token, null];
  },

  forgetPassword: async (userPayload) => {
    const user = await userService.findUserByUsernameOrMail(
        userPayload.usernameOrMail);
    if (user === null) {
      return [400, 'Email or username not found!'];
    }

    const uuid = generateUUID();
    await forgetPasswordService.createForgetPassword(
        {id: hash(user.id.toString() + uuid)});

    await mailService.sendMail('Password Renewal',
        `Click on the link to renew password. 
        <a>https://localhost:443/#/renewPassword?id=${user.id}&uuid=${uuid}</a>`,
        user.mail);
    return [200, 'Check your email!'];
  },

  renewPassword: async (userPayload) => {
    const user = await userService.findUser(userPayload.userid);
    if (user === null) {
      return [400, 'Wrong link!'];
    }

    const forgetPassword = await forgetPasswordService.findForgetPassword(
        hash(userPayload.userid.toString() + userPayload.uuid));
    if (forgetPassword === null) {
      return [400, 'Wrong link!'];
    }

    // should be renewed in 1 hours after created
    const now = Math.round(Date.now() / 1000);
    const createdAtTs = new Date(forgetPassword.createdAt).getTime();
    const createdAt = Math.round(createdAtTs / 1000);
    if ((now - createdAt) > (60 * 60)) {
      return [400, 'Link is expired!'];
    }

    try {
      await sequelize.transaction(async (t) => {
        await userService.updateUser(userPayload.userid,
            {password: hash(user.mail + userPayload.password)});

        await forgetPasswordService.deleteForgetPassword(forgetPassword.id);
      });

      return [200, 'Password changed!'];
    } catch (error) {
      return [500, ''];
    }
  },

  hasValidUsername: async (username) => {
    const user = await userService.findUserByUsername(username);

    if (user === null) {
      return validateUsername(username);
    } else {
      return [false, 'Duplicate username!'];
    }
  },
};

export default authService;
