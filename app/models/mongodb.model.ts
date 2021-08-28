/*
 * @Description:mongodb数据处理类
 * @Author: lanchao
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-23 16:52:15
 * @LastEditors: lanchao
 * @Reference:
 */
import * as SchemaModel from './mongodb/index.model';
class MongoDbModel {
  modelName: string;
  constructor(modelName: string) {
    this.modelName = modelName;
  }
  /**
   * @description:请求方法入口
   * @param  {*}
   * @return {*}
   * @param {string} funName 方法名
   * @param {object} where 条件
   * @param {object} data 数据
   */
  async model(funName: string, where: object, data: object): Promise<object> {
    let returnData = {};
    switch (funName) {
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
    const createModel = new SchemaModel[this.modelName](data);
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
    const returnData = await SchemaModel[this.modelName].updateOne(where, data);
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
    const returnData: Array<any> = await SchemaModel[this.modelName].find(
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
    const returnData = await SchemaModel[this.modelName].remove(where);
    return {
      status: returnData.n ? true : false,
      deletedCount: returnData.deletedCount,
    };
  }
}
export default MongoDbModel;
