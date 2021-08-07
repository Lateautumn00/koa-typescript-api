/*
 * @Description: 用户
 * @Author: lanchao
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-07 19:41:14
 * @LastEditors: lanchao
 * @Reference:
 */
import person from './person.controller';
import {
  UserInterface,
  UpdateUserGuid,
  UpdateUserNickName,
} from '../interface/user.interface';
import UserService from '../service/user.sevice';
@person.Controller('/user')
class UserController extends person.PersonController {
  /**
   * 添加数据
   * @description:
   * @param  {*}
   * @return {*}
   */
  @person.Post('/create')
  public async createUser(
    @person.Body('nickName') nickName: string,
    @person.Body('guid') guid: number,
    @person.Body('age') age: number
  ): Promise<any> {
    const userData: UserInterface = {
      nickName,
      guid,
      age,
    };
    const server: UserService = new UserService();
    const createUser = await server.createUser(userData);
    return super.fromData(1000, createUser, '成功');
  }
  /**
   * 修改数据
   * @description:
   * @param  {*}
   * @return {*}
   */
  @person.Post('/update')
  public async updateUser(
    @person.Body('guid') guid: number,
    @person.Body('nickName') nickName: string
  ): Promise<any> {
    const where: UpdateUserGuid = {
      guid,
    };
    const data: UpdateUserNickName = {
      nickName,
    };
    const server: UserService = new UserService();
    const updateData = await server.updateUser(where, data);
    return updateData.status
      ? super.fromData(1000, {}, '成功')
      : super.fromData(1001, {}, '失败');
  }
  /**
   * 查询数据
   * @description:
   * @param  {*}
   * @return {*}
   */
  @person.Get('/getList/:guid?')
  public async getUser(@person.Params('guid') guid?: number): Promise<any> {
    const server: UserService = new UserService();
    const readUser = await server.getUser(guid ? guid : '');
    return super.fromData(1000, readUser.data, '成功');
  }
  /**
   * 删除数据
   * @description:
   * @param  {*}
   * @return {*}
   */
  @person.Delete('/remove/:guid')
  public async removeUser(@person.Params('guid') guid: number): Promise<any> {
    const server: UserService = new UserService();
    const removeUser = await server.removeUser(guid);
    return removeUser.status
      ? super.fromData(1000, {}, '成功')
      : super.fromData(1001, {}, '失败');
  }
}
export default UserController;
