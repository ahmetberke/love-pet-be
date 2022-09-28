import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/db-con.js';

class ForgetPassword extends Model {
}

ForgetPassword.init({
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'ForgetPassword',
  timestamps: true,
  updatedAt: false,
});

export default ForgetPassword;
