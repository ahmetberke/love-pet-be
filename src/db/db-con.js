import {Sequelize} from 'sequelize';
import config from '../middleware/config.js';
import winstonLogger from '../middleware/winston-logger';

const connectionString = 'postgres://' +
    config.db_username + ':' + config.db_password + '@' +
    config.db_host + ':' + config.db_port + '/' + config.db_name;
winstonLogger.info(connectionString);

const sequelize = new Sequelize(connectionString, {
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    freezeTableName: true,
    timestamps: false,
  },
});

if (config.node_env === 'test') {
  sequelize.options.logging = false;
}

if (config.node_env === 'production') {
  sequelize.options.dialectOptions = {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  };
}

export default sequelize;
