/*
 * @Description: 用户
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-07-31 10:51:24
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import { Controller, Get, Post, Ctx, RequestParam } from 'koa-controllers';
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
@Controller
class UserController extends PersonController {
  /**
   * 添加数据
   * @param ctx
   * @param nickName
   * @param guid
   */
  @Post('/user/create')
  public async createUser(
    @Ctx ctx: any,
    @RequestParam('nickName', { required: true }) nickName: string,
    @RequestParam('guid', { required: true }) guid: number,
    @RequestParam('age', { required: true }) age: number
  ): Promise<any> {
    const userData: UserInterface = {
      nickName,
      guid,
      age,
    };
    const user: UserModel = new UserModel();
    const createUser = await user.create(userData);
    return (ctx.body = this.fromData(1000, createUser, '成功'));
  }
  /**
   * 修改
   * @param ctx
   * @param guid
   */
  @Post('/user/update')
  public async updateUser(
    @Ctx ctx: any,
    @RequestParam('guid', { required: true }) guid: number,
    @RequestParam('nickName', { required: true }) nickName: string
  ): Promise<any> {
    const user: UserModel = new UserModel();
    const where: UpdateUserGuid = {
      guid,
    };
    const data: UpdateUserNickName = {
      nickName,
    };
    const updateData: MongodbUpdate = await user.update(where, data);
    return (ctx.body = updateData.status
      ? this.fromData(1000, {}, '成功')
      : this.fromData(1001, {}, '失败'));
  }
  /**
   * 查询数据
   * @param ctx
   * @param guid
   */
  @Get('/user/getList')
  public async getUser(
    @Ctx ctx: any,
    @RequestParam('guid', { required: false }) guid?: number
  ): Promise<any> {
    const user: UserModel = new UserModel();
    const where: GetUserInterface = {};
    if (guid) where.guid = guid;
    const readUser: MongodbFind = await user.find(where);
    return (ctx.body = this.fromData(1000, readUser.data, '成功'));
  }
  /**
   * 删除
   */
  @Post('/user/remove')
  public async removeUser(
    @Ctx ctx: any,
    @RequestParam('guid', { required: true }) guid: number
  ): Promise<any> {
    const user: UserModel = new UserModel();
    const where: UpdateUserGuid = {
      guid,
    };
    const removeUser: MongodbRemove = await user.remove(where);
    console.log(removeUser);
    return (ctx.body = removeUser.status
      ? this.fromData(1000, {}, '成功')
      : this.fromData(1001, {}, '失败'));
  }
}
export default UserController;
