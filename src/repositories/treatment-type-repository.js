import TreatmentType from '../models/treatment-type.js';

const treatmentTypeRepo = {
  findTreatmentType: async (treatmentTypeId) => {
    return await TreatmentType.findByPk(treatmentTypeId);
  },

  findTreatmentTypes: async () => {
    return await TreatmentType.findAll();
  },

  createTreatmentType: async (treatmentType) => {
    return await TreatmentType.create(treatmentType);
  },

  deleteTreatmentType: async (treatmentTypeId) => {
    return await TreatmentType.destroy({
      where: {
        id: treatmentTypeId,
      },
    });
  },

  updateTreatmentType: async (treatmentTypeId, treatmentType) => {
    return await TreatmentType.update(treatmentType, {
      where: {
        id: treatmentTypeId,
      },
      returning: true,
    });
  },
};

export default treatmentTypeRepo;
