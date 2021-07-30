/*
 * @Description:启动 入口文件
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-07-30 20:42:02
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import * as Koa from 'koa';
import * as path from 'path';
import * as cors from 'koa2-cors';
import { useControllers } from 'koa-controllers';
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
app.on('error', (err: any, ctx: any) => {
  console.error('server error', err, ctx);
});
app.listen(8888, '0.0.0.0', function () {
  console.log('start success');
});
