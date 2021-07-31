/*
 * @Description:定义抽象函数为model 基类
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-07-31 09:56:00
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
  abstract create<D>(data: D);
  /**
   * 更新数据
   */
  abstract update<W, D>(where: W, data: D);
  /**
   * 读取数据
   */
  abstract find<W>(where: W);
  /**
   * 删除数据
   */
  abstract remove<W>(where: W);
}
export default PersonModel;
