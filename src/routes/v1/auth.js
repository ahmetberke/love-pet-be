import authService from '../../services/auth-service.js';
import express from 'express';

const authRouter = express.Router();

authRouter.post('/signup', async (req, res, next) => {
  try {
    if (req.body.provinceId == undefined) {
      return res.status(400).send({"error":"provinceId can't be null"});
    }
    if (req.body.userTypeId == undefined) {
      return res.status(400).send({"error":"userTypeId can't be null"});
    }
    const [statusCode, token, msg] = await authService.signup(req.body);
    return res.status(statusCode).json({token: token, msg: msg});
  } catch (e) {
    next(e);
  }
});

authRouter.post('/login', async (req, res, next) => {
  try {
    const [statusCode, token, msg] = await authService.login(req.body);
    return res.status(statusCode).json({token: token, msg: msg});
  } catch (e) {
    next(e);
  }
});

authRouter.post('/forgetPassword', async (req, res, next) => {
  try {
    const [statusCode, msg] = await authService.forgetPassword(req.body);
    return res.status(statusCode).json({msg: msg});
  } catch (e) {
    next(e);
  }
});

authRouter.post('/renewPassword', async (req, res, next) => {
  try {
    const [statusCode, msg] = await authService.renewPassword(req.body);
    return res.status(statusCode).json({msg: msg});
  } catch (e) {
    next(e);
  }
});

authRouter.get('/validateUsername', async (req, res, next) => {
  try {
    const [valid, msg] = await authService.hasValidUsername(req.query.username);
    return res.status(200).json({valid: valid, msg: msg});
  } catch (e) {
    next(e);
  }
});

export default authRouter;
