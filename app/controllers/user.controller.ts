import { Controller, Get, Post, Ctx, RequestParam } from 'koa-controllers';
import UserModel from '../models/user.model';
import PersonController from './person.controller';
import {
  UserInterface,
  GetUserInterface,
  UpdateUserGuid,
  UpdateUserNickName,
} from '../interface/user.interface';
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
  ) {
    const userData: UserInterface = {
      nickName,
      guid,
      age,
    };
    const user: UserModel = new UserModel();
    const createUser = await user.create(userData);
    ctx.body = this.fromData(1000, createUser, '成功');
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
  ) {
    const user: UserModel = new UserModel();
    const where: UpdateUserGuid = {
      guid,
    };
    const data: UpdateUserNickName = {
      nickName,
    };
    const updateData = await user.update(where, data);
    ctx.body = this.fromData(1000, updateData, '成功');
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
  ) {
    const user: UserModel = new UserModel();
    const where: GetUserInterface = {};
    if (guid) where.guid = guid;
    const readUser = await user.find(where);
    ctx.body = this.fromData(1000, readUser, '成功');
  }
  /**
   * 删除
   */
  @Post('/user/remove')
  public async removeUser(
    @Ctx ctx: any,
    @RequestParam('guid', { required: true }) guid: number
  ) {
    const user: UserModel = new UserModel();
    const where: UpdateUserGuid = {
      guid,
    };
    const removeUser = await user.remove(where);
    ctx.body = this.fromData(1000, removeUser, '成功');
  }
}
export default UserController;
