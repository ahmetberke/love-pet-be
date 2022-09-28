import treatmentTypeService from '../../services/treatment-type-service.js';
import {verifyToken} from '../../middleware/auth.js';
import express from 'express';

const treatmentTypeRouter = express.Router();
treatmentTypeRouter.use(verifyToken);

treatmentTypeRouter.post('/', async (req, res, next) => {
  try {
    const treatmentType = await treatmentTypeService.createTreatmentType(
        req.body);
    return res.status(200).json(treatmentType.toJSON());
  } catch (e) {
    next(e);
  }
});

treatmentTypeRouter.get('/', async (req, res, next) => {
  try {
    const treatmentTypes = await treatmentTypeService.findTreatmentTypes();
    return res.status(200).json(JSON.stringify(treatmentTypes));
  } catch (e) {
    next(e);
  }
});

treatmentTypeRouter.get('/:treatmentTypeId', async (req, res, next) => {
  try {
    const treatmentType = await treatmentTypeService.findTreatmentType(
        req.params.treatmentTypeId);
    if (treatmentType !== null) {
      return res.status(200).json(treatmentType.toJSON());
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

treatmentTypeRouter.delete('/:treatmentTypeId', async (req, res, next) => {
  try {
    await treatmentTypeService.deleteTreatmentType(req.params.treatmentTypeId);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

treatmentTypeRouter.put('/:treatmentTypeId', async (req, res, next) => {
  try {
    const [, treatmentTypes] = await treatmentTypeService.updateTreatmentType(
        req.params.treatmentTypeId, req.body);
    return res.status(200).json(JSON.stringify(treatmentTypes));
  } catch (e) {
    next(e);
  }
});

export default treatmentTypeRouter;
