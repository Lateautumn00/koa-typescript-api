/*
 * @Description: redis 连接模块
 * @Author: lanchao
 * @Date: 2021-08-23 15:01:29
 * @LastEditTime: 2021-08-23 17:07:52
 * @LastEditors: lanchao
 * @Reference:
 */
import * as Redis from 'ioredis';
import RedisNode from '../../config/redis.config';
const pubRedis = {
  host: RedisNode.host,
  port: RedisNode.port,
  password: RedisNode.password,
  prefix: RedisNode.prefix,
  ttl: 60 * 60 * 23,
  family: 4,
  db: RedisNode.db,
};
const publisherRedis = new Redis(pubRedis);
console.log('redis connect open');
export default publisherRedis;
