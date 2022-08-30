import winston from "winston";

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: '/test/winston_debug.log', level: 'debug' }),
    new winston.transports.File({ filename: '/test/winston_error.log', level: 'error' }),
  ]
});

export default logger