/*
 * @Description: user逻辑层
 * @Author: Lanchao cui
 * @Date: 2021-08-03 20:20:51
 * @LastEditTime: 2021-08-04 20:18:02
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import UserModel from '../models/user.model';
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
class UserService {
  /**
   * 处理添加数据的逻辑
   * @description:
   * @param  {*}
   * @return {*}
   * @param {UserInterface} userData
   */
  public async createUser(userData: UserInterface): Promise<any> {
    const user: UserModel = new UserModel();
    const createUser = await user.create(userData);
    return createUser;
  }
  /**
   * 处理更新数据逻辑
   * @description:
   * @param  {*}
   * @return {*}
   */
  public async updateUser(
    where: UpdateUserGuid,
    data: UpdateUserNickName
  ): Promise<any> {
    const user: UserModel = new UserModel();
    const updateData: MongodbUpdate = await user.update(where, data);
    return updateData;
  }
  /**
   * 处理查询数据逻辑
   * @description:
   * @param  {*}
   * @return {*}
   * @param {*} guid
   */
  public async getUser(guid): Promise<any> {
    const where: GetUserInterface = {};
    if (guid) where.guid = guid;
    const user: UserModel = new UserModel();
    const readUser: MongodbFind = await user.find(where);

    return readUser;
  }
  /**
   * 处理删除数据逻辑
   * @description:
   * @param  {*}
   * @return {*}
   * @param {*} guid
   */
  public async removeUser(guid): Promise<any> {
    const where: UpdateUserGuid = {
      guid,
    };
    const user: UserModel = new UserModel();
    const removeUser: MongodbRemove = await user.remove(where);
    return removeUser;
  }
}
export default UserService;
