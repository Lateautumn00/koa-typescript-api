/*
 * @Description:mongodb配置
 * @Author: lanchao
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-23 16:33:41
 * @LastEditors: lanchao
 * @Reference:
 * /

 /* db_user: 'koa',用户名
 * db_pwd: 'koa123456',密码
 * db_host: '192.168.184.128:27017',地址 可配置副本集，每个地址之间用分号隔开
 * db_name: 'koa',库名
 * prefix: 'koa_',集合名开头
 */
export default {
  db_user: 'koa',
  db_pwd: 'koa123456',
  db_host: '192.168.184.128:27017',
  db_name: 'koa',
  prefix: 'koa_',
};
