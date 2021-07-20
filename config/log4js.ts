import * as path from 'path';
const baseLogPath = path.resolve(__dirname, '../logs');
const errorLogPath = path.resolve(__dirname, '../logs/error/error.log');
const responseLogPath = path.resolve(
  __dirname,
  '../logs/response/response.log'
);
export default {
  appenders: {
    'rule-console': { type: 'console' },
    errorLogger: {
      type: 'dateFile',
      filename: errorLogPath,
      pattern: '-yyyy-MM-dd-hh',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      daysToKeep: 210,
      keepFileExt: true,
    },
    resLogger: {
      type: 'dateFile',
      filename: responseLogPath,
      pattern: '-yyyy-MM-dd-hh',
      alwaysIncludePattern: true,
      encoding: 'utf-8',
      daysToKeep: 210,
      keepFileExt: true,
    },
  },
  categories: {
    default: { appenders: ['rule-console'], level: 'all' },
    resLogger: { appenders: ['resLogger'], level: 'info' },
    errorLogger: { appenders: ['errorLogger'], level: 'error' },
    http: { appenders: ['resLogger'], level: 'info' },
  },
  disableClustering: true,
  baseLogPath: baseLogPath,
};
