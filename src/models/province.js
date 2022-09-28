import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/db-con.js';

class Province extends Model {
}

Province.init({
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
  modelName: 'Province',
});

export default Province;
