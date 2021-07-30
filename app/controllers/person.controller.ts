/*
 * @Description: 基类
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-07-30 20:07:51
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import { FromDataInterface } from '../interface/person.interface';
class PersonController {
  protected fromData(code: number, data: object, message?: string) {
    if (!message) message = code === 1000 ? '成功' : '失败';
    const jsonData: FromDataInterface = {
      code,
      data,
      message,
    };
    return jsonData;
  }
}
export default PersonController;