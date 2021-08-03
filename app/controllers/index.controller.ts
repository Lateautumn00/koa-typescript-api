/*
 * @Description:默认
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-03 20:10:23
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import {
  Controller,
  Ctx,
  Req,
  Body,
  Get,
  Post,
  Delete,
  Query,
  Flow,
  Params,
  Version,
} from 'koa-ts-controllers';
import PersonController from './person.controller';
import { IndexInterface } from '../interface/index.interface';
import * as dayjs from 'dayjs';
@Controller('/test')
class IndexController extends PersonController {
  @Get('/')
  public getServeTime(): object {
    const data: IndexInterface = {
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    return super.fromData(1000, data, '访问 koa-typescript-api 成功');
  }
}
export default IndexController;
