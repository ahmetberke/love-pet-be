import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/db-con.js';

class Country extends Model {
}

Country.init({
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
  modelName: 'Country',
});

export default Country;
