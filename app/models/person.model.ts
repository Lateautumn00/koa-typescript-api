/*
 * @Description:定义抽象函数为model 基类
 * @Author: Lanchao cui
 * @Date: 2021-07-30 20:01:02
 * @LastEditTime: 2021-08-06 10:52:55
 * @LastEditors: Lanchao cui
 * @Reference:
 */
abstract class PersonModel {
  /**
   *  构造函数 因 在抽象类中无法实例化该对象，古此处构造函数无用
   */
  constructor() {
  }
  /**
   * 工厂模式
   * @param fun
   * @param where
   * @param data
   */
  abstract model(fun: string, where: object, data: object): Promise<object>;
}
export default PersonModel;
