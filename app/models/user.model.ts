import PersonModel from './person.model';
import userSchema from '../schema/user.schema';
/**
 * 操作user表
 */
class UserModel extends PersonModel {
  constructor() {
    super();
  }
  async create(data: object) {
    /**
     * 实例化
     */
    const createModel = new userSchema(data);
    /**
     * 插入数据
     */
    const addData: object = createModel.save();
    console.log('创建数据');
    return addData;
  }
  async update(where: object, data: object) {
    const updateData = await userSchema.updateOne(where, data);
    console.log(`更新数据数据`);
    return updateData;
  }
  async find(where: object) {
    const list: Array<any> = await userSchema.find(where);
    return list;
  }
  async remove(where: object) {
    const removeData = await userSchema.remove(where);
    console.log('删除数据');
    return removeData;
  }
}
export default UserModel;
