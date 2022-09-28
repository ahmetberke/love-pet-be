import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/db-con.js';

class ProductCategory extends Model {
}

ProductCategory.init({
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
  modelName: 'ProductCategory',
});

export default ProductCategory;
