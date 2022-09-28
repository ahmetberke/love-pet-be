import createDb from './db/create-db';
import winstonLogger from './middleware/winston-logger';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import v1Router from './routes/v1Router.js';
import initDbData from './db/init-data';
import config from './middleware/config';

async function getApp() {
  await createDb();
  if (config.node_env === 'dev') {
      await initDbData();
  }

  const app = express();

  app.use(cors());
  app.use(morgan('combined', {stream: winstonLogger.stream}));
  app.use(express.json());
  app.use(express.urlencoded({extended: false}));
  app.use(cookieParser());
  app.use(express.static(path.join(path.resolve(), 'public')));
  app.use('/api', v1Router);

  // set error handler
  const jsonErrorHandler = async (err, req, res, next) => {
    winstonLogger.error(`${err.status || 500} - ${err.message} - 
      ${req.originalUrl} - ${req.method} - ${req.ip}`);

    res.status(500).json({error: err});
  };
  app.use(jsonErrorHandler);
  return app;
}

export default getApp;
