import { Controller, Get, Ctx, RequestParam } from 'koa-controllers';
import UserModel from '../models/user.model';
@Controller
class UserController {
  @Get('/user/index')
  public async index(@Ctx ctx: any) {
    const user = new UserModel();
    ctx.body = user.create();
  }
  @Get('/user/getUserName')
  public async getUserName(
    @Ctx ctx: any,
    @RequestParam('username', { required: true }) username: string
  ) {
    console.log(username);
    ctx.body = username;
  }
}
export default UserController;
