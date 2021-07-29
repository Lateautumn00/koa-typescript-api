import * as Koa from 'koa';
import * as path from 'path';
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
