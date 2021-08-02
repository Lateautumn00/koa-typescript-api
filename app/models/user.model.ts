/*
 * @Description:usermodel
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-02 20:18:51
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
  async create<UserInterface>(data: UserInterface): Promise<object> {
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
  ): Promise<MongodbUpdate> {
    const updateData = await userSchemaModel.updateOne(where, data);
    return {
      status: updateData.n ? true : false,
    };
  }
  async find<GetUserInterface>(where: GetUserInterface): Promise<MongodbFind> {
    const list: Array<any> = await userSchemaModel.find(where);
    return {
      count: list.length,
      data: list,
    };
  }
  async remove<UpdateUserGuid>(where: UpdateUserGuid): Promise<MongodbRemove> {
    const removeData = await userSchemaModel.remove(where);
    return {
      status: removeData.n ? true : false,
      deletedCount: removeData.deletedCount,
    };
  }
}
export default UserModel;
