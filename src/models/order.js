import {DataTypes, Model} from 'sequelize';
import sequelize from '../db/db-con.js';

class Order extends Model {
}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
}, {
  sequelize,
  modelName: 'Order',
});

export default Order;
