/*
 * @Description:启动 入口文件
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-05 20:51:21
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import * as Koa from 'koa';
import * as path from 'path';
import * as cors from 'koa2-cors';
import { bootstrapControllers } from 'koa-ts-controllers';
import * as http from 'http';
import * as ws from 'ws';
import log4JsModules from './app/modules/log4js.module';
import * as Router from 'koa-router';
import * as bodyParser from 'koa-bodyparser';
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
 * websocket 服务 open   如果不需要  可去掉
 */
const ws1: any = new ws.Server({ noServer: true });
ws1.on('connection', function (conn: any, request: any) {
  console.log('ws connect');
  conn.on('message', (message: any) => {
    console.log('received: %s', message);
    message = JSON.parse(message);
    switch (message.type) {
      case 'PING':
        conn.send(
          JSON.stringify({
            code: 1000,
            type: 'PONG',
            data: {},
            message: '成功',
          })
        );
        break;
      default:
        break;
    }
  });
});
server.on('upgrade', function upgrade(request: any, socket: any, head: any) {
  const pathname: string = request.url.split('?')[0];
  if (pathname === '/socket/getName') {
    ws1.handleUpgrade(request, socket, head, function done(ws) {
      ws1.emit('connection', ws, request);
    });
  } else {
    console.error('不存在的websocket连接地址');
    socket.destroy();
  }
});
/**
 * websocket 服务 end
 */
server.on('error', (err: any, ctx: any) => {
  console.error('server error', err, ctx);
});
server.listen(8888, '0.0.0.0', function () {
  console.log('start success');
});
