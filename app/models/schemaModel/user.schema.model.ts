/*
 * @Description: 用户数据表
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-07-31 09:09:52
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import mongoose from '../../modules/mongoose.module';
import db from '../../../config/db.config';
/**
 * 表名
 */
const table = `${db.prefix}user`;
/**
 * 定义表结构 字段 类型
 */
const userSchema = new mongoose.Schema({
  nickName: { type: String },
  guid: { type: Number },
  age: { type: Number },
});
export default mongoose.model(table, userSchema);
