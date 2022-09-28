import cityService from '../../services/city-service.js';
import getQueryString from '../../middleware/querystring.js';
import express from 'express';

const cityRouter = express.Router();

cityRouter.post('/', async (req, res, next) => {
  try {
    const city = await cityService.createCity(req.body);
    return res.status(200).json(city);
  } catch (e) {
    next(e);
  }
});

cityRouter.get('/', async (req, res, next) => {
  try {
    const cities = await cityService.findCities(getQueryString(req));
    return res.status(200).json(cities);
  } catch (e) {
    next(e);
  }
});

cityRouter.get('/:cityId', async (req, res, next) => {
  try {
    const city = await cityService.findCity(req.params.cityId);
    if (city !== null) {
      return res.status(200).json(city);
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

cityRouter.delete('/:cityId', async (req, res, next) => {
  try {
    await cityService.deleteCity(req.params.cityId);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

cityRouter.put('/:cityId', async (req, res, next) => {
  try {
    const [, cities] =
      await cityService.updateCity(req.params.cityId, req.body);
    return res.status(200).json(cities);
  } catch (e) {
    next(e);
  }
});

export default cityRouter;
