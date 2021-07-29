import * as log4js from 'log4js';
import LogConfig from '../../config/log4js.config';
log4js.configure(LogConfig);
const resLogger: any = log4js.getLogger('resLogger');
const errorLogger: any = log4js.getLogger('errorLogger');
const consoleLogger: any = log4js.getLogger();
const log4JsModules: any = {
  logError: (ctx: any, error: any, resTime: number) => {
    if (ctx && error) {
      errorLogger.error(formatError(ctx, error, resTime));
    }
  },
  logResponse: (ctx: any, resTime: number) => {
    if (ctx) {
      resLogger.info(formatRes(ctx, resTime));
    }
  },
  logInfo: (info: any) => {
    if (info) {
      consoleLogger.info(formatInfo(info));
    }
  },
};

const formatInfo = (info: any) => {
  return `***************info log start ***************
          info detail: ${JSON.stringify(info)}
          *************** info log end ****************
         `;
};
/**
 * 格式化响应日志
 * @param ctx
 * @param resTime
 * @returns
 */
const formatRes = (ctx: any, resTime: number) => {
  return `*************** response log start ***************
          ${formatReqLog(ctx.request, resTime)}
          response status: ${ctx.status}
          response body: ${JSON.stringify(ctx.body)}
          *************** response log end *****************
         `;
};
/**
 * 格式化错误日志
 * @param ctx
 * @param err
 * @param resTime
 * @returns
 */
const formatError = (ctx: any, err: any, resTime: number) => {
  return `*************** error log start ***************
          ${formatReqLog(ctx.request, resTime)}
          err name: ${err.name}
          err message: ${err.message}
          err stack: ${err.stack}
          *************** error log end *****************
         `;
};
/**
 * 格式化请求日志
 * @param req
 * @param resTime
 * @returns
 */
const formatReqLog = (req: any, resTime: number) => {
  const method: string = req.method;
  const request: string =
    method === 'GET'
      ? `request query: ${JSON.stringify(req.query)}`
      : `request body: ${JSON.stringify(req.body)}`;
  return `request method: ${method}
          request originalUrl: ${req.originalUrl}
          request client ip: ${req.ip}
          ${request}
          response time: ${resTime}
         `;
};

export default log4JsModules;
