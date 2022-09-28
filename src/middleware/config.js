import dotenv from 'dotenv';
import appRoot from 'app-root-path';

dotenv.config({path: `${appRoot}/secrets/.env`});

const config = {
  db_host: process.env.DB_HOST,
  db_port: process.env.DB_PORT,
  db_name: process.env.DB_NAME,
  db_username: process.env.DB_USERNAME,
  db_password: process.env.DB_PASSWORD,
  token_key: process.env.TOKEN_KEY,
  mail_username: process.env.MAIL_USERNAME,
  mail_password: process.env.MAIL_PASSWORD,
  http_server_port: process.env.HTTP_SERVER_PORT,
  node_env: process.env.NODE_ENV,
};

export default config;
