import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/db-con.js';

class Product extends Model {
}

Product.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  cost: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Product',
});

export default Product;
