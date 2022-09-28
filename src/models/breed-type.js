import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/db-con.js';

class BreedType extends Model {
}

BreedType.init({
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
  modelName: 'BreedType',
});

export default BreedType;
