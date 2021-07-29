import PersonModel from './person.model';
require('../modules/mongoose.module');
/**
 * 操作user表
 */
class UserModel extends PersonModel {
  readonly table: string = 'user';
  create() {
    return `${this.table} 创建数据`;
  }
  update() {
    return `${this.table} 更新数据数据`;
  }
  read() {
    return `${this.table} 读取数据`;
  }
  delete() {
    return `${this.table} 删除数据`;
  }
}
export default UserModel;
