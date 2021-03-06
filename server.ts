/*
 * @Description:启动 入口文件
 * @Author: lanchao
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-07 19:53:09
 * @LastEditors: lanchao
 * @Reference:
 *                        _oo0oo_
 *                       o8888888o
 *                       88" . "88
 *                       (| -_- |)
 *                       0\  =  /0
 *                     ___/`---'\___
 *                   .' \\|     |// '.
 *                  / \\|||  :  |||// \
 *                 / _||||| -:- |||||- \
 *                |   | \\\  - /// |   |
 *                | \_|  ''\---/''  |_/ |
 *                \  .-\__  '-'  ___/-. /
 *              ___'. .'  /--.--\  `. .'___
 *           ."" '<  `.___\_<|>_/___.' >' "".
 *          | | :  `- \`.;`\ _ /`;.`/ - ` : | |
 *          \  \ `_.   \_ __\ /__ _/   .-` /  /
 *      =====`-.____`.___ \_____/___.-`___.-'=====
 *                        `=---='
 *
 *
 *      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *            佛祖保佑       永不宕机     永无BUG
 *
 *        佛曰:
 *                写字楼里写字间，写字间里程序员；
 *                程序人员写程序，又拿程序换酒钱。
 *                酒醒只在网上坐，酒醉还来网下眠；
 *                酒醉酒醒日复日，网上网下年复年。
 *                但愿老死电脑间，不愿鞠躬老板前；
 *                奔驰宝马贵者趣，公交自行程序员。
 *                别人笑我忒疯癫，我笑自己命太贱；
 *                不见满街漂亮妹，哪个归得程序员？
 */

import * as Koa from 'koa';
import * as path from 'path';
import * as cors from 'koa2-cors';
import { bootstrapControllers } from 'koa-ts-controllers';
import * as http from 'http';
import log4JsModules from './app/modules/log4js.module';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
/**
 * 导入websocket ，不使用可隐藏掉
 */
import wsServer from './app/socket/index.socket';
const app: any = new Koa();
const router = new Router();
/**
 * logStatus 是否开启日志打印，线上建议设为false
 */
const logStatus: boolean = true;
bootstrapControllers(app, {
  router,
  basePath: '/api',
  controllers: [path.join(__dirname, '/app/controllers/*')],
  versions: {
    1: 'This version is deprecated and will soon be removed. Consider migrating to version 2 ASAP',
    2: true,
    dangote: true, // 非常适合定制的、特定于业务客户端的端点版本
  },
});
app.use(
  cors({
    origin: function (ctx: any) {
      return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
  })
);
app.use(async (ctx: any, next: any) => {
  const start: number = Date.now();
  let ms: number;
  try {
    await next();
    ms = Date.now() - start;
    if (logStatus) {
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
      log4JsModules.logResponse(ctx, ms);
    }
  } catch (error) {
    ms = Date.now() - start;
    console.error('request exception');
    log4JsModules.logError(ctx, error, ms);
  }
});
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());
const server: any = http.createServer(app.callback());
/**
 * websocket 服务   如果不需要  可去掉
 */
wsServer(server);
server.on('error', (err: any, ctx: any) => {
  console.error('server error', err, ctx);
});
server.listen(8888, '0.0.0.0', function () {
  console.log('start success');
});
