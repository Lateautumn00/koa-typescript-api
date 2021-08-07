/*
 * @Description:log4js配置
 * @Author: lanchao
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-07 19:45:16
 * @LastEditors: lanchao
 * @Reference:
 */
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
