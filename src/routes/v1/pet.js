import petService from '../../services/pet-service.js';
import {verifyToken} from '../../middleware/auth.js';
import express from 'express';

const petRouter = express.Router();
petRouter.use(verifyToken);

petRouter.post('/', async (req, res, next) => {
  try {
    const pet = await petService.createPet(req.body);
    return res.status(200).json(pet);
  } catch (e) {
    next(e);
  }
});

petRouter.get('/', async (req, res, next) => {
  try {
    const pets = await petService.findPets();
    return res.status(200).json(pets);
  } catch (e) {
    next(e);
  }
});

petRouter.get('/:petId', async (req, res, next) => {
  try {
    const pet = await petService.findPet(req.params.petId);
    if (pet !== null) {
      return res.status(200).json(pet);
    } else {
      return res.sendStatus(404);
    }
  } catch (e) {
    next(e);
  }
});

petRouter.delete('/:petId', async (req, res, next) => {
  try {
    await petService.deletePet(req.params.petId);
    return res.sendStatus(200);
  } catch (e) {
    next(e);
  }
});

petRouter.put('/:petId', async (req, res, next) => {
  try {
    const [, pets] = await petService.updatePet(req.params.petId, req.body);
    return res.status(200).json(pets);
  } catch (e) {
    next(e);
  }
});

export default petRouter;
