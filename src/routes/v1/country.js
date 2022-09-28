import countryService from '../../services/country-service.js';
import express from 'express';
import getQueryString from '../../middleware/querystring.js';

const countryRouter = express.Router();

countryRouter.post('/', async (req, res, next) => {
  try {
    const country = await countryService.createCountry(req.body);
    return res.status(200).json(country);
  } catch (e) {
    next(e);
  }
});

countryRouter.get('/', async (req, res, next) => {
  try {
    const countries = await countryService.findCountries(getQueryString(req));
    return res.status(200).json(countries);
  } catch (e) {
    next(e);
  }
});

countryRouter.get('/:countryId', async (req, res, next) => {
  try {
    const country = await countryService.findCountry(req.params.countryId);
    if (country !== null) {
      return res.status(200).json(country);
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

countryRouter.delete('/:countryId', async (req, res, next) => {
  try {
    await countryService.deleteCountry(req.params.countryId);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

countryRouter.put('/:countryId', async (req, res, next) => {
  try {
    const [, countries] = await countryService.updateCountry(
        req.params.countryId, req.body);
    return res.status(200).json(countries);
  } catch (e) {
    next(e);
  }
});

export default countryRouter;
