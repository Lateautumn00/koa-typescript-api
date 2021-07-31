/*
 * @Description: mongodb 返回值定义
 * @Author: Lanchao cui
 * @Date: 2021-07-31 10:05:58
 * @LastEditTime: 2021-07-31 10:48:54
 * @LastEditors: Lanchao cui
 * @Reference:
 */
export interface MongodbAdd {
}
export interface MongodbRemove {
  status: boolean;
  deletedCount: number;
}
export interface MongodbUpdate {
  status: boolean;
}
export interface MongodbFind {
  count: number;
  data: Array<any>;
}
