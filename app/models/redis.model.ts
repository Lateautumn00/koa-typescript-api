/*
 * @Description: redis操作模块
 * @Author: lanchao
 * @Date: 2021-08-23 16:00:23
 * @LastEditTime: 2021-08-28 16:48:28
 * @LastEditors: lanchao
 * @Reference:
 */
import RedisModule from '../modules/ioredis.module';
import RedisConfig from '../../config/redis.config';
class RedisModel {
  redisName: string;
  /**
   * @description:
   * @param  {*}
   * @return {*}
   * @param {string} redisName key值
   */
  constructor(redisName: string) {
    this.redisName = `${RedisConfig.prefix}${redisName}`;
  }
  /**
   * @description:请求方法入口
   * @param  {*}
   * @return {*}
   * @param {string} funName 方法名
   */
  async model(
    funName: string,
    jsonData: { data: any; ex?: string; time?: number }
  ): Promise<object> {
    let returnDta = {};
    switch (funName) {
      case 'get':
        returnDta = await this.get();
        break;
      case 'set':
        if (!jsonData.ex) jsonData.ex = 'EX';
        if (!jsonData.time) jsonData.time = -1;
        returnDta = await this.set(jsonData);
        break;
      case 'incr':
        returnDta = await this.incr();
        break;
      case 'decr':
        returnDta = await this.decr();
        break;
      case 'del':
        returnDta = await this.del();
        break;
      case 'hmSet':
        returnDta = await this.hmSet(jsonData);
        break;
      case 'hLen':
        returnDta = await this.hLen();
        break;
      case 'hGet':
        returnDta = await this.hGet(jsonData);
        break;
      case 'hGetAll':
        returnDta = await this.hGetAll();
        break;
      case 'hSet':
        returnDta = await this.hSet(jsonData);
        break;
      case 'pub':
        returnDta = await this.pub(jsonData);
        break;
      default:
        console.error('请求的redis方法还未在代码中实现');
        break;
    }
    return returnDta;
  }
  /**
   * @description:写入字符串数据
   * @param  {*}
   * @return {*}
   * @param {object} jsonData
   * @param {*} ex
   * @param {*} time
   */
  private async set(jsonData: {
    data: any;
    ex?: string;
    time?: number;
  }): Promise<object> {
    let data = {};
    await RedisModule.set(
      this.redisName,
      jsonData.data,
      jsonData.ex,
      jsonData.time
    )
      .then((result: any) => {
        data = result;
      })
      .catch((error: any) => {
        console.error(error);
      });
    return data;
  }
  /**
   * @description:查询字符串
   * @param  {*}
   * @return {*}
   */
  private async get(): Promise<object> {
    let data = {};
    await RedisModule.get(this.redisName)
      .then((result: any) => {
        data = result;
      })
      .catch((error: any) => {
        console.error(error);
      });
    return data;
  }
  /**
   * @description: 自增1
   * @param  {*}
   * @return {*}
   */
  private async incr(): Promise<object> {
    let data = {};
    await RedisModule.incr(this.redisName)
      .then((result: any) => {
        data = result;
      })
      .catch((error: any) => {
        console.error(error);
      });
    return data;
  }
  /**
   * @description: 自增1
   * @param  {*}
   * @return {*}
   */
  private async decr(): Promise<object> {
    let data = {};
    await RedisModule.decr(this.redisName)
      .then((result: any) => {
        data = result;
      })
      .catch((error: any) => {
        console.error(error);
      });
    return data;
  }
  /**
   * @description:删除数据
   * @param  {*}
   * @return {*}
   */
  private async del(): Promise<object> {
    let data = {};
    await RedisModule.del(this.redisName)
      .then((result: any) => {
        data = result;
      })
      .catch((error: any) => {
        console.error(error);
      });
    return data;
  }
  /**
   * @description: 存储hash
   * @param  {*}
   * @return {*}
   * @param {*} jsonData
   */
  private async hmSet(jsonData: { data: any }): Promise<object> {
    let data = {};
    await RedisModule.hmset(this.redisName, jsonData.data)
      .then((result: any) => {
        data = result;
      })
      .catch((error: any) => {
        console.error(error);
      });
    return data;
  }
  /**
   * @description: 获取hash字段数量
   * @param  {*}
   * @return {*}
   */
  private async hLen(): Promise<object> {
    const data = { len: 0 };
    await RedisModule.hlen(this.redisName)
      .then((result: any) => {
        data.len = result;
      })
      .catch((error: any) => {
        console.error(error);
      });
    return data;
  }
  /**
   * @description: 查询hash单个数据
   * @param  {*}
   * @return {*}
   */
  private async hGet(jsonData: { data: Array<string> }): Promise<object> {
    const data = { str: '' };
    await RedisModule.hget(this.redisName, jsonData.data[0])
      .then((result: any) => {
        data.str = result;
      })
      .catch((error: any) => {
        console.error(error);
      });
    return data;
  }
  /**
   * @description: 查询hash说有数据
   * @param  {*}
   * @return {*}
   */
  private async hGetAll(): Promise<object> {
    let data = {};
    await RedisModule.hgetall(this.redisName)
      .then((result: any) => {
        data = result;
      })
      .catch((error: any) => {
        console.error(error);
      });
    return data;
  }
  /**
   * @description: 更新hash的某一个key-value
   * @param  {*}
   * @return {*}
   * @param {object} jsonData
   */
  private async hSet(jsonData: { data: object }): Promise<object> {
    let data = {};
    const key = Object.keys(jsonData.data)[0];
    const value = Object.values(jsonData.data)[0];
    await RedisModule.hset(this.redisName, key, value)
      .then((result: any) => {
        data = result;
      })
      .catch((error: any) => {
        console.error(error);
      });
    return data;
  }
  /**
   * @description: 订阅消息生产者
   * @param  {*}
   * @return {*}
   * @param {*} jsonData
   */
  private async pub(jsonData: { data: {} }): Promise<object> {
    let data = {};
    await RedisModule.pub(this.redisName, jsonData.data)
      .then((result: any) => {
        data = result;
      })
      .catch((error: any) => {
        console.error(error);
      });
    return data;
  }
}
export default RedisModel;
