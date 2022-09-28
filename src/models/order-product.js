import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/db-con.js';

class OrderProduct extends Model {
}

OrderProduct.init({
  cost: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'OrderProduct',
});

export default OrderProduct;
