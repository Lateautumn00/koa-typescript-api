/*
 * @Description: user逻辑层
 * @Author: Lanchao cui
 * @Date: 2021-08-03 20:20:51
 * @LastEditTime: 2021-08-06 10:35:52
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
class UserService {
  /**
   * 处理添加数据的逻辑
   * @description:
   * @param  {*}
   * @return {*}
   * @param {UserInterface} userData
   */
  public async createUser(userData: UserInterface): Promise<any> {
    const createUser = await UserModel.model('create', {}, userData);
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
    const updateData = await UserModel.model('updateOne', where, data);
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
    const readUser = await UserModel.model('find', where, {});
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
    const removeUser = await UserModel.model('remove', where, {});
    return removeUser;
  }
}
export default UserService;
