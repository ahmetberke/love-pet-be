import userService from '../../services/user-service.js';
import {validateEmail, validatePhone, validateUsername, verifyToken} from '../../middleware/auth.js';
import express from 'express';

const userRouter = express.Router();
userRouter.use(verifyToken);

userRouter.post('/', async (req, res, next) => {
  try {
  
    if (req.body.provinceId == undefined) {
      return res.status(400).send({"error":"provinceId can't be null"});
    }
    if (req.body.userTypeId == undefined) {
      return res.status(400).send({"error":"userTypeId can't be null"});
    }

    const user = await userService.createUser(req.body);
    return res.status(200).json(user);
  } catch (e) {
    next(e);
  }
});

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await userService.findUsers();
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
});

userRouter.get('/:userId', async (req, res, next) => {
  try {
    const user = await userService.findUser(req.params.userId);
    if (user !== null) {
      return res.status(200).json(user);
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

userRouter.delete('/:userId', async (req, res, next) => {
  try {
    await userService.deleteUser(req.params.userId);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

userRouter.put('/:userId', async (req, res, next) => {
  try {
    var user = {
      userId : req.params.userId
    }
    if (req.body.username != undefined) {
      var usernameCheck = validateUsername(req.body.username);
      if (!usernameCheck[0]) {
        return res.status(400).send({"error":usernameCheck[1]});
      }else {
        user.username = req.body.username;
      }
    }
    /* must be edited for email verification
    if (req.body.mail != undefined) {
      var emailCheck = validateEmail(req.body.username);
      if (!emailCheck[0]) {
        return res.status(400).send({"error":emailCheck[1]});
      }else {
        user.email = req.body.email;
      }
    }
    */
    if (req.body.phone != undefined) {
      var phoneCheck = validatePhone(req.body.phone);
      if (!phoneCheck[0]) {
        return res.status(400).send({"error":phoneCheck[1]});
      }else {
        user.phone = req.body.phone;
      }
    }

    if (req.body.address != undefined) {
      user.address = req.body.address;
    }

    const [, users] = await userService.updateUser(user.userId, user);
    return res.status(200).json(users);
  } catch (e) {
    next(e);
  }
});

export default userRouter;
