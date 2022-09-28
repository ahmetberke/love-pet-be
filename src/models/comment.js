import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/db-con.js';

class Comment extends Model {
}

Comment.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  sendDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  star: {
    type: DataTypes.SMALLINT,
  },
  text: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [0, 250],
    },
  },
}, {
  sequelize,
  modelName: 'Comment',
});

export default Comment;
