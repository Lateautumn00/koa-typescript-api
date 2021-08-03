/*
 * @Description: 用户
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-03 15:23:07
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
import UserModel from '../models/user.model';
import PersonController from './person.controller';
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
@Controller('/user')
class UserController extends PersonController {
  /**
   * 添加数据
   * @param ctx
   * @param nickName
   * @param guid
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
    const user: UserModel = new UserModel();
    const createUser = await user.create(userData);
    return super.fromData(1000, createUser, '成功');
  }
  /**
   * 修改
   * @param ctx
   * @param guid
   */
  @Post('/update')
  public async updateUser(
    @Body('guid') guid: number,
    @Body('nickName') nickName: string
  ): Promise<any> {
    const user: UserModel = new UserModel();
    const where: UpdateUserGuid = {
      guid,
    };
    const data: UpdateUserNickName = {
      nickName,
    };
    const updateData: MongodbUpdate = await user.update(where, data);
    return updateData.status
      ? super.fromData(1000, {}, '成功')
      : super.fromData(1001, {}, '失败');
  }
  /**
   * 查询数据
   * @param ctx
   * @param guid
   */
  @Get('/getList')
  public async getUser(@Params('guid') guid?: number): Promise<any> {
    const user: UserModel = new UserModel();
    const where: GetUserInterface = {};
    if (guid) where.guid = guid;
    const readUser: MongodbFind = await user.find(where);
    return super.fromData(1000, readUser.data, '成功');
  }
  /**
   * 删除
   */
  @Delete('/remove/:guid')
  public async removeUser(@Params('guid') guid: number): Promise<any> {
    const user: UserModel = new UserModel();
    const where: UpdateUserGuid = {
      guid,
    };
    const removeUser: MongodbRemove = await user.remove(where);
    return removeUser.status
      ? super.fromData(1000, {}, '成功')
      : super.fromData(1001, {}, '失败');
  }
}
export default UserController;
