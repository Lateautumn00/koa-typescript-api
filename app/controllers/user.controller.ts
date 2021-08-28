/*
 * @Description: 用户
 * @Author: lanchao
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-23 15:16:26
 * @LastEditors: lanchao
 * @Reference:
 */
import Person from './person.controller';
import {
  UserInterface,
  UpdateUserGuid,
  UpdateUserNickName,
} from '../interface/user.interface';
import UserService from '../service/user.service';
@Person.Controller('/user')
class UserController extends Person.PersonController {
  /**
   * 添加数据
   * @description:
   * @param  {*}
   * @return {*}
   */
  @Person.Post('/create')
  public async createUser(
    @Person.Body('nickName') nickName: string,
    @Person.Body('guid') guid: number,
    @Person.Body('age') age: number
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
  @Person.Post('/update')
  public async updateUser(
    @Person.Body('guid') guid: number,
    @Person.Body('nickName') nickName: string
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
  @Person.Get('/getList/:guid?')
  public async getUser(@Person.Params('guid') guid?: number): Promise<any> {
    console.log(guid);
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
  @Person.Delete('/remove/:guid')
  public async removeUser(@Person.Params('guid') guid: number): Promise<any> {
    const server: UserService = new UserService();
    const removeUser = await server.removeUser(guid);
    return removeUser.status
      ? super.fromData(1000, {}, '成功')
      : super.fromData(1001, {}, '失败');
  }
}
export default UserController;
