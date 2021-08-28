/*
 * @Description:mongodb库连接模块
 * @Author: lanchao
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-23 15:22:21
 * @LastEditors: lanchao
 * @Reference:
 */
import * as Mongoose from 'mongoose';
import MongodbNode from '../../config/db.config';
const dbUrl = `mongodb://${MongodbNode.db_user}:${MongodbNode.db_pwd}@${MongodbNode.db_host}/${MongodbNode.db_name}`;
Mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const dbConnect = Mongoose.connection;
dbConnect.once('open', () => {
  console.log('mongodb database open');
});
dbConnect.once('close', () => {
  console.log('mongodb database close');
});
dbConnect.on('error', (error: any) => {
  console.log('mongodb database error' + error);
});
export default Mongoose;
