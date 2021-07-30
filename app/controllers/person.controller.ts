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
