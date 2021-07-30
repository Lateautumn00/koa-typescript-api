/*
 * @Description: 用户数据表
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-07-30 20:08:50
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import mongoose from '../modules/mongoose.module';
/**
 * 表名
 */
const table = 'user';
/**
 * 定义表结构 字段 类型
 */
const userSchema = new mongoose.Schema({
  nickName: { type: String },
  guid: { type: Number },
  age: { type: Number },
});
export default mongoose.model(table, userSchema);