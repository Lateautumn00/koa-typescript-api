/*
 * @Description:mongodb库模块
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-07-30 20:08:44
 * @LastEditors: Lanchao cui
 * @Reference:
 */
import * as mongoose from 'mongoose';
import mongodb from '../../config/db.config';
const dbUrl = `mongodb://${mongodb.db_user}:${mongodb.db_pwd}@${mongodb.db_host}/${mongodb.db_name}`;
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true });
const dbConnect = mongoose.connection;
dbConnect.once('open', () => {
  console.log('mongodb database open');
});
dbConnect.once('close', () => {
  console.log('mongodb database close');
});
dbConnect.on('error', (error: any) => {
  console.log('mongodb database error' + error);
});
export default mongoose;