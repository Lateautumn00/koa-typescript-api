/*
 * @Description:usermodel
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-07-31 10:50:23
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import PersonModel from './person.model';
import userSchemaModel from './schemaModel/user.schema.model';
import {
  UserInterface,
  GetUserInterface,
  UpdateUserGuid,
  UpdateUserNickName,
} from '../interface/user.interface';
import {
  MongodbRemove,
  MongodbFind,
  MongodbUpdate,
} from '../interface/mongodb.interface';
class UserModel extends PersonModel {
  constructor() {
    super();
  }
  async create<UserInterface>(data: UserInterface): Promise<any> {
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
  async update<UpdateUserGuid, UpdateUserNickName>(
    where: UpdateUserGuid,
    data: UpdateUserNickName
  ): Promise<any> {
    const updateData = await userSchemaModel.updateOne(where, data);
    const returnData: MongodbUpdate = {
      status: updateData.n ? true : false,
    };
    return returnData;
  }
  async find<GetUserInterface>(where: GetUserInterface): Promise<any> {
    const list: Array<any> = await userSchemaModel.find(where);
    const returnData: MongodbFind = {
      count: list.length,
      data: list,
    };
    return returnData;
  }
  async remove<UpdateUserGuid>(where: UpdateUserGuid): Promise<any> {
    const removeData = await userSchemaModel.remove(where);
    const returnData: MongodbRemove = {
      status: removeData.n ? true : false,
      deletedCount: removeData.deletedCount,
    };
    return returnData;
  }
}
export default UserModel;
