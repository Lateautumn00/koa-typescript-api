import * as Koa from 'koa';
import * as path from 'path';
import { useControllers } from 'koa-controllers';
const app = new Koa();
useControllers(app, path.join(__dirname, '/app/controllers/*.controller.js'), {
  multipart: {
    dest: '',
  },
});
app.use(async (ctx: any, next: any) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});
app.on('error', (err: any, ctx: any) => {
  console.error('server error', err, ctx);
});
app.listen(8888, '0.0.0.0', function () {
  console.log('start success');
});
