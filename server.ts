import * as Koa from 'koa';
import { useControllers } from 'koa-controllers';
const app = new Koa();
useControllers(app, __dirname + '/app/controllers/*.controller.js', {
  multipart: {
    dest: '',
  },
});
app.use(async (ctx: any, next: any) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  // if (ctx.url.split('.').pop() === 'ico') {
  //   return;
  // }
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
});
app.use(async (ctx: any, next: any) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});
app.on('error', (err: any, ctx: any) => {
  console.error('server error', err, ctx);
});
app.listen(3000, '0.0.0.0', function () {
  console.log('start success');
});
