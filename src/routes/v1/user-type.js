import userTypeService from '../../services/user-type-service.js';
import {verifyToken} from '../../middleware/auth.js';
import express from 'express';

const userTypeRouter = express.Router();
userTypeRouter.use(verifyToken);

userTypeRouter.post('/', async (req, res, next) => {
  try {
    const userType = await userTypeService.createUserType(req.body);
    return res.status(200).json(userType.toJSON());
  } catch (e) {
    next(e);
  }
});

userTypeRouter.get('/', async (req, res, next) => {
  try {
    const userTypes = await userTypeService.findUserTypes();
    return res.status(200).json(JSON.stringify(userTypes));
  } catch (e) {
    next(e);
  }
});

userTypeRouter.get('/:userTypeId', async (req, res, next) => {
  try {
    const userType = await userTypeService.findUserType(req.params.userTypeId);
    if (userType !== null) {
      return res.status(200).json(userType.toJSON());
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

userTypeRouter.delete('/:userTypeId', async (req, res, next) => {
  try {
    await userTypeService.deleteUserType(req.params.userTypeId);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

userTypeRouter.put('/:userTypeId', async (req, res, next) => {
  try {
    const [, userTypes] = await userTypeService.updateUserType(
        req.params.userTypeId, req.body);
    return res.status(200).json(JSON.stringify(userTypes));
  } catch (e) {
    next(e);
  }
});

export default userTypeRouter;
