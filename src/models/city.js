import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/db-con.js';

class City extends Model {
}

City.init({
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
  modelName: 'City',
});

export default City;
