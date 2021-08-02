/*
 * @Description:启动 入口文件
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-02 17:22:27
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import * as Koa from 'koa';
import * as path from 'path';
import * as cors from 'koa2-cors';
import { useControllers } from 'koa-controllers';
import * as http from 'http';
import * as ws from 'ws';
import * as qs from 'qs';
import log4JsModules from './app/modules/log4js.module';

const app: any = new Koa();

/**
 * logStatus 是否开启日志打印，线上建议设为false
 */
const logStatus: boolean = true;
useControllers(app, path.join(__dirname, '/app/controllers/*.controller.js'), {
  multipart: {
    dest: '',
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
const server: any = http.createServer(app.callback());
/**
 * websocket 服务 open   如果不需要  可去掉
 */
const webSocket: any = new ws.Server({ server });
webSocket.on('connection', function (conn: any, request: any) {
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
    console.log('进来啦');
    /**
     * server.handleUpgrade(request, socket, head, function done(conn) {
     * server.emit('connection', conn, request);
     * });
     */
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
