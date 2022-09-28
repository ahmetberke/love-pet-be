import treatmentRepo from '../repositories/treatment-repository.js';

const treatmentService = {
  findTreatment: async (treatmentId) => {
    return await treatmentRepo.findTreatment(treatmentId);
  },

  findTreatments: async () => {
    return await treatmentRepo.findTreatments();
  },

  createTreatment: async (treatment) => {
    return await treatmentRepo.createTreatment(treatment);
  },

  deleteTreatment: async (treatmentId) => {
    return await treatmentRepo.deleteTreatment(treatmentId);
  },

  updateTreatment: async (treatmentId, treatment) => {
    return await treatmentRepo.updateTreatment(treatmentId, treatment);
  },
};

export default treatmentService;
