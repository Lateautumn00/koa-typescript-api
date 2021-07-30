/*
 * @Description: user表字段类型规范
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-07-30 20:08:26
 * @LastEditors: Lanchao cui
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
