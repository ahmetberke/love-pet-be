#!/usr/bin/env node

import getApp from './app.js';
import config from './middleware/config';
import winstonLogger from './middleware/winston-logger';
import https from 'https';
import http from 'http';
import fs from 'fs';
import appRoot from 'app-root-path';
import { error } from 'console';

const options = {
  key: fs.readFileSync(`${appRoot}/secrets/tls/server.key`),
  cert: fs.readFileSync(`${appRoot}/secrets/tls/server.cert`),
};

const normalizePort = (val) => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      winstonLogger.error('Bind requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      winstonLogger.error('Bind is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  winstonLogger.info(`Server started to listen at ${process.env.PORT || normalizePort(config.http_server_port)}`);
};

async function getServer() {
  
  const app = await getApp();

  const port = normalizePort(config.http_server_port);
  app.set('port', port);

  var server;
  
  if (config.node_env == 'dev') {
    server = http.createServer(app);
  }else {
    server = https.createServer(options, app);
  }

  server.listen(process.env.PORT || port);
  server.on('error', onError);
  server.on('listening', onListening);

  return server
}

if (config.node_env !== 'test') {
  getServer();
}

export default getServer;
