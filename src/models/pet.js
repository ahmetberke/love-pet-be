import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/db-con.js';

class Pet extends Model {
}

Pet.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  birthDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
}, {
  sequelize,
  modelName: 'Pet',
});

export default Pet;
