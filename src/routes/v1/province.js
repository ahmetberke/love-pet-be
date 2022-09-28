import provinceService from '../../services/province-service.js';
import express from 'express';
import getQueryString from '../../middleware/querystring.js';

const provinceRouter = express.Router();

provinceRouter.post('/', async (req, res, next) => {
  try {
    const province = await provinceService.createProvince(req.body);
    return res.status(200).json(province);
  } catch (e) {
    next(e);
  }
});

provinceRouter.get('/', async (req, res, next) => {
  try {
    const provinces = await provinceService.findProvinces(getQueryString(req));
    return res.status(200).json(provinces);
  } catch (e) {
    next(e);
  }
});

provinceRouter.get('/:provinceId', async (req, res, next) => {
  try {
    const province = await provinceService.findProvince(req.params.provinceId);
    if (province !== null) {
      return res.status(200).json(province);
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

provinceRouter.delete('/:provinceId', async (req, res, next) => {
  try {
    await provinceService.deleteProvince(req.params.provinceId);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

provinceRouter.put('/:provinceId', async (req, res, next) => {
  try {
    const [, provinces] = await provinceService.updateProvince(
        req.params.provinceId, req.body);
    return res.status(200).json(provinces);
  } catch (e) {
    next(e);
  }
});

export default provinceRouter;
