import { Controller, Get, Ctx, RequestParam } from 'koa-controllers';
import TestModel from '../models/test.model';
@Controller
export class TestController {
  @Get('/test/index')
  public async index(@Ctx ctx: any) {
    const getTestInfo: string = await TestModel.index(
      'Hello koa-typescript-api'
    );
    ctx.body = getTestInfo;
  }
  @Get('/test/user')
  public async user(@Ctx ctx: any) {
    ctx.body = '这里是user';
  }
  @Get('/test/getUserName')
  public async getUserName(
    @Ctx ctx: any,
    @RequestParam('username', { required: true }) username: string
  ) {
    console.log(username);
    ctx.body = username;
  }
}
