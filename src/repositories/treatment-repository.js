import Treatment from '../models/treatment.js';

const treatmentRepo = {
  findTreatment: async (treatmentId) => {
    return await Treatment.findByPk(treatmentId);
  },

  findTreatments: async () => {
    return await Treatment.findAll();
  },

  createTreatment: async (treatment) => {
    return await Treatment.create(treatment);
  },

  deleteTreatment: async (treatmentId) => {
    return await Treatment.destroy({
      where: {
        id: treatmentId,
      },
    });
  },

  updateTreatment: async (treatmentId, treatment) => {
    return await Treatment.update(treatment, {
      where: {
        id: treatmentId,
      },
      returning: true,
    });
  },
};

export default treatmentRepo;
