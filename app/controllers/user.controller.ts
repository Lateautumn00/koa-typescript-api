/*
 * @Description: 用户
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-04 11:32:42
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import {
  Controller,
  Ctx,
  Req,
  Body,
  Get,
  Post,
  Delete,
  Query,
  Flow,
  Params,
  Version,
} from 'koa-ts-controllers';
import PersonController from './person.controller';
import {
  UserInterface,
  UpdateUserGuid,
  UpdateUserNickName,
} from '../interface/user.interface';
import {
  MongodbRemove,
  MongodbFind,
  MongodbUpdate,
} from '../interface/mongodb.interface';
import UserService from '../service/user.sevice';
@Controller('/user')
class UserController extends PersonController {
  /**
   * 添加数据
   * @description:
   * @param  {*}
   * @return {*}
   */
  @Post('/create')
  public async createUser(
    @Body('nickName') nickName: string,
    @Body('guid') guid: number,
    @Body('age') age: number
  ): Promise<any> {
    const userData: UserInterface = {
      nickName,
      guid,
      age,
    };
    const createUser = await UserService.prototype.createUser(userData);
    return super.fromData(1000, createUser, '成功');
  }
  /**
   * 修改数据
   * @description:
   * @param  {*}
   * @return {*}
   */
  @Post('/update')
  public async updateUser(
    @Body('guid') guid: number,
    @Body('nickName') nickName: string
  ): Promise<any> {
    const where: UpdateUserGuid = {
      guid,
    };
    const data: UpdateUserNickName = {
      nickName,
    };
    const updateData: MongodbUpdate = await UserService.prototype.updateUser(where, data);
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
  @Get('/getList/:guid?')
  public async getUser(@Params('guid') guid?: number): Promise<any> {
    const readUser: MongodbFind = await UserService.prototype.getUser(guid ? guid : '');
    return super.fromData(1000, readUser.data, '成功');
  }
  /**
   * 删除数据
   * @description:
   * @param  {*}
   * @return {*}
   */
  @Delete('/remove/:guid')
  public async removeUser(@Params('guid') guid: number): Promise<any> {
    const removeUser: MongodbRemove = await UserService.prototype.removeUser(guid);
    return removeUser.status
      ? super.fromData(1000, {}, '成功')
      : super.fromData(1001, {}, '失败');
  }
}
export default UserController;
