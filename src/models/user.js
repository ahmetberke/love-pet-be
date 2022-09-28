import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/db-con.js';
import hash from '../middleware/sha256-hasher.js';

class User extends Model {
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rating: {
    type: DataTypes.FLOAT,
    defaultValue : 0
  },
  token: {
    type: DataTypes.VIRTUAL,
  },
}, {
  sequelize,
  modelName: 'User',
});

User.beforeCreate(async (user, options) => {
  user.password = hash(user.mail + user.password);
});

User.beforeUpdate(async (user, options) => {
  user.password = hash(user.mail + user.password);
});

export default User;
