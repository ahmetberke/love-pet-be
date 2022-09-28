import treatmentService from '../../services/treatment-service.js';
import {verifyToken} from '../../middleware/auth.js';
import express from 'express';

const treatmentRouter = express.Router();
treatmentRouter.use(verifyToken);

treatmentRouter.post('/', async (req, res, next) => {
  try {
    const treatment = await treatmentService.createTreatment(req.body);
    return res.status(200).json(treatment.toJSON());
  } catch (e) {
    next(e);
  }
});

treatmentRouter.get('/', async (req, res, next) => {
  try {
    const treatments = await treatmentService.findTreatments();
    return res.status(200).json(JSON.stringify(treatments));
  } catch (e) {
    next(e);
  }
});

treatmentRouter.get('/:treatmentId', async (req, res, next) => {
  try {
    const treatment = await treatmentService.findTreatment(
        req.params.treatmentId);
    if (treatment !== null) {
      return res.status(200).json(treatment.toJSON());
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

treatmentRouter.delete('/:treatmentId', async (req, res, next) => {
  try {
    await treatmentService.deleteTreatment(req.params.treatmentId);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

treatmentRouter.put('/:treatmentId', async (req, res, next) => {
  try {
    const [, treatments] = await treatmentService.updateTreatment(
        req.params.treatmentId, req.body);
    return res.status(200).json(JSON.stringify(treatments));
  } catch (e) {
    next(e);
  }
});

export default treatmentRouter;
