/*
 * @Description: user逻辑层
 * @Author: lanchao
 * @Date: 2021-08-03 20:20:51
 * @LastEditTime: 2021-08-07 19:44:05
 * @LastEditors: lanchao
 * @Reference:
 */
import UserModel from '../modules/mongodb.modules';
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
    const newModel = new UserModel('user');
    const createUser = await newModel.model('create', {}, userData);
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
    const newModel = new UserModel('user');
    const updateData = await newModel.model('updateOne', where, data);
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
    const newModel = new UserModel('user');
    const readUser = await newModel.model('find', where, {});
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
    const newModel = new UserModel('user');
    const removeUser = await newModel.model('remove', where, {});
    return removeUser;
  }
}
export default UserService;
