/*
 * @Description:默认
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-07 19:25:41
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import person from './person.controller';
import { IndexInterface } from '../interface/index.interface';
import * as dayjs from 'dayjs';
@person.Controller('/test')
class IndexController extends person.PersonController {
  @person.Get('/')
  public getServeTime(): object {
    const data: IndexInterface = {
      time: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    };
    return super.fromData(1000, data, '访问 koa-typescript-api 成功');
  }
}
export default IndexController;
