/*
 * @Description:mongodb数据处理类
 * @Author: lanchao
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-07 19:43:48
 * @LastEditors: lanchao
 * @Reference:
 */
import * as schemaModel from '../models/index.model';
class UserModel {
  modelName: string;
  data: object;
  constructor(modelName: string) {
    this.modelName = modelName;
    this.data = {};
  }
  /**
   * @description:请求方法入口
   * @param  {*}
   * @return {*}
   * @param {string} fun 方法名
   * @param {object} where 条件
   * @param {object} data 数据
   */
  async model(fun: string, where: object, data: object): Promise<object> {
    switch (fun) {
      case 'create':
        this.data = await this.create(data);
        break;
      case 'update':
        this.data = await this.updateOne(where, data);
        break;
      case 'find':
        this.data = await this.find(where);
        break;
      case 'remove':
        this.data = await this.remove(where);
        break;
      default:
        console.error('请求的mongodb方法还未在代码中实现');
        break;
    }
    return this.data;
  }
  /**
   * @description: 插入数据
   * @param  {*}
   * @return {*}
   * @param {object} data
   */
  private async create(data: object): Promise<object> {
    /**
     * 实例化
     */
    const createModel = new schemaModel[this.modelName](data);
    /**
     * 插入数据
     */
    const returnData: object = await createModel.save();
    return returnData;
  }
  /**
   * @description: 更新数据
   * @param  {*}
   * @return {*}
   * @param {object} where
   * @param {object} data
   */
  private async updateOne(where: object, data: object): Promise<object> {
    const returnData = await schemaModel[this.modelName].updateOne(where, data);
    return {
      status: returnData.n ? true : false,
    };
  }
  /**
   * @description: 查询数据
   * @param  {*}
   * @return {*}
   * @param {object} where
   */
  private async find(where: object): Promise<object> {
    const returnData: Array<any> = await schemaModel[this.modelName].find(
      where
    );
    return {
      count: returnData.length,
      data: returnData,
    };
  }
  /**
   * @description: 删除数据
   * @param  {*}
   * @return {*}
   * @param {object} where
   */
  private async remove(where: object): Promise<object> {
    const returnData = await schemaModel[this.modelName].remove(where);
    return {
      status: returnData.n ? true : false,
      deletedCount: returnData.deletedCount,
    };
  }
}
export default UserModel;
