/*
 * @Description:默认
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-07-30 20:01:51
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import { Controller, Get, Ctx } from 'koa-controllers';
import PersonController from './person.controller';
import { IndexInterface } from '../interface/index.interface';
import * as dayjs from 'dayjs';
@Controller
class IndexController extends PersonController {
  @Get('/')
  public getServeTime(@Ctx ctx: any) {
    const date: IndexInterface = {
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    ctx.body = this.fromData(1000, date, '访问 koa-typescript-api 成功');
  }
}
export default IndexController;
