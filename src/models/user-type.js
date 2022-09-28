import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/db-con.js';

class UserType extends Model {
}

UserType.init({
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
  modelName: 'UserType',
});

export default UserType;
