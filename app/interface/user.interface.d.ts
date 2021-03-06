/*
 * @Description: user表字段类型规范
 * @Author: lanchao
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-09 20:01:40
 * @LastEditors: lanchao
 * @Reference:
 */
export interface UserInterface {
  nickName: string;
  guid: number;
  age: number;
}
/**
 * 根据guid查询数据
 */
export interface GetUserInterface {
  guid?: number;
}
/**
 * 修改
 */
export interface UpdateUserGuid {
  guid: number;
}
export interface UpdateUserNickName {
  nickName: string;
}
