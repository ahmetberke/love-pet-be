import {transports, createLogger as CreateLogger} from 'winston';
import appRoot from 'app-root-path';
import config from './config';

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    silent: (config.node_env === 'test') ? true : false,
  },
};

const winstonLogger = new CreateLogger({
  transports: [
    // new transports.File(options.file),
    new transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

winstonLogger.stream = {
  write: function(message, encoding) {
    winstonLogger.info(message);
  },
};

export default winstonLogger;
