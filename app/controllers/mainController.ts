import * as Koa from 'koa';
import { Controller, Get, Ctx } from 'koa-controllers';
@Controller
class MainController {
  @Get('/')
  public async index(@Ctx ctx: Koa.BaseContext) {
    ctx.body = '首页';
  }
  @Get('/user')
  public async user(@Ctx ctx: Koa.BaseContext) {
    ctx.body = '用户中心';
  }
}
