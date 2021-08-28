/*
 * @Description: 用户数据表
 * @Author: lanchao
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-23 15:20:21
 * @LastEditors: lanchao
 * @Reference:
 */
import Mongoose from '../../modules/mongoose.module';
import DB from '../../../config/db.config';
/**
 * 表名
 */
const table = `${DB.prefix}user`;
/**
 * 定义表结构 字段 类型
 */
const userSchema = new Mongoose.Schema({
  nickName: { type: String },
  guid: { type: Number },
  age: { type: Number },
});
export default Mongoose.model(table, userSchema);
