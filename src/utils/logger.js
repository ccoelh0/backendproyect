import winston from "winston";

const logger = winston.createLogger({
  level: 'debug',
  transports: [
    new winston.transports.File({ filename: '/test/results/winston_error.log', level: 'error' }),
  ]
});

export default logger