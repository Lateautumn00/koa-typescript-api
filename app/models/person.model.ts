/*
 * @Description:定义抽象函数为model 基类
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-07-30 20:27:22
 * @LastEditors: Lanchao cui
 * @Reference:
 */
abstract class PersonModel {
  /**
   *  构造函数 因 在抽象类中无法实例化该对象，古此处构造函数无用
   */
  constructor() {}
  /**
   * 创建数据
   */
  abstract create(data: object);
  /**
   * 更新数据
   */
  abstract update(where: object, data: object);
  /**
   * 读取数据
   */
  abstract find(where: object);
  /**
   * 删除数据
   */
  abstract remove(where: object);
}
export default PersonModel;
