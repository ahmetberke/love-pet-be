import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/db-con.js';

class TreatmentType extends Model {
}

TreatmentType.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'TreatmentType',
});

export default TreatmentType;
