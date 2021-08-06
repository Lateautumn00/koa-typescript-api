/*
 * @Description:usermodel
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-06 10:48:02
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import PersonModel from './person.model';
import userSchemaModel from './schemaModel/user.schema.model';
class UserModel extends PersonModel {
  static instance: any;
  static getInstance() {
    if (!UserModel.instance) {
      UserModel.instance = new UserModel();
    }
    return UserModel.instance;
  }
  constructor() {
    super();
  }
  /**
   * @description:
   * @param  {*}
   * @return {*}
   * @param {string} fun 方法名
   * @param {object} where 条件
   * @param {object} data 数据
   */
  async model(fun: string, where: object, data: object): Promise<object> {
    let returnData: object = {};
    switch (fun) {
      case 'create':
        returnData = await this.create(data);
        break;
      case 'update':
        returnData = await this.updateOne(where, data);
        break;
      case 'find':
        returnData = await this.find(where);
        break;
      case 'remove':
        returnData = await this.remove(where);
        break;
      default:
        console.error('请求的mongodb方法还未在代码中实现');
        break;
    }
    return returnData;
  }
  private async create(data: object): Promise<object> {
    /**
     * 实例化
     */
    const createModel = new userSchemaModel(data);
    /**
     * 插入数据
     */
    const returnData: object = await createModel.save();
    return returnData;
  }
  private async updateOne(where: object, data: object): Promise<object> {
    const returnData = await userSchemaModel.updateOne(where, data);
    return {
      status: returnData.n ? true : false,
    };
  }
  private async find(where: object): Promise<object> {
    const returnData: Array<any> = await userSchemaModel.find(where);
    return {
      count: returnData.length,
      data: returnData,
    };
  }
  private async remove(where: object): Promise<object> {
    const returnData = await userSchemaModel.remove(where);
    return {
      status: returnData.n ? true : false,
      deletedCount: returnData.deletedCount,
    };
  }
}
export default UserModel.getInstance();
