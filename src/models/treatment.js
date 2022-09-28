import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/db-con.js';

class Treatment extends Model {
}

Treatment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
}, {
  sequelize,
  modelName: 'Treatment',
});

export default Treatment;
