import treatmentTypeRepo from '../repositories/treatment-type-repository.js';

const treatmentTypeService = {
  findTreatmentType: async (treatmentTypeId) => {
    return await treatmentTypeRepo.findTreatmentType(treatmentTypeId);
  },

  findTreatmentTypes: async () => {
    return await treatmentTypeRepo.findTreatmentTypes();
  },

  createTreatmentType: async (treatmentType) => {
    return await treatmentTypeRepo.createTreatmentType(treatmentType);
  },

  deleteTreatmentType: async (treatmentTypeId) => {
    return await treatmentTypeRepo.deleteTreatmentType(treatmentTypeId);
  },

  updateTreatmentType: async (treatmentTypeId, treatmentType) => {
    return await treatmentTypeRepo.updateTreatmentType(treatmentTypeId,
        treatmentType);
  },
};

export default treatmentTypeService;
