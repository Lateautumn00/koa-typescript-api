/*
 * @Description:usermodel
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-06 10:35:02
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
  async model(fun: string, where: object, data: object) {
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
    const addData: object = await createModel.save();
    return addData;
  }
  private async updateOne(where: object, data: object): Promise<object> {
    const updateData = await userSchemaModel.updateOne(where, data);
    return {
      status: updateData.n ? true : false,
    };
  }
  private async find(where: object): Promise<object> {
    const list: Array<any> = await userSchemaModel.find(where);
    return {
      count: list.length,
      data: list,
    };
  }
  private async remove(where: object): Promise<object> {
    const removeData = await userSchemaModel.remove(where);
    return {
      status: removeData.n ? true : false,
      deletedCount: removeData.deletedCount,
    };
  }
}
export default UserModel.getInstance();
