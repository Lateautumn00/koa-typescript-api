/**
 * user表字段类型规范
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
