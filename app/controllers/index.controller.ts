/*
 * @Description:默认
 * @Author: lanchao
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-23 15:18:27
 * @LastEditors: lanchao
 * @Reference:
 */
import Person from './person.controller';
import { IndexInterface } from '../interface/index.interface';
import * as Dayjs from 'dayjs';
@Person.Controller('/test')
class IndexController extends Person.PersonController {
  @Person.Get('/')
  public getServeTime(): object {
    const data: IndexInterface = {
      time: Dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    return super.fromData(1000, data, '访问 koa-typescript-api 成功');
  }
}
export default IndexController;
