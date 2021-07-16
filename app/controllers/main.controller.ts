import { Controller, Get, Ctx, RequestParam, Post } from 'koa-controllers';
@Controller
export class MainController {
  @Get('/')
  public async index(@Ctx ctx: any) {
    ctx.body = '首页';
  }
  @Get('/user')
  public async user(@Ctx ctx: any) {
    console.log(ctx.query);
    ctx.body = '用户中心';
  }
  @Post('/aa')
  public async aa(
    @Ctx ctx: any,
    @RequestParam('username', { required: true }) username: string
  ) {
    console.log(username);
    ctx.body = username;
  }
}
