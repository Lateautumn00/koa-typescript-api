/**
 * 定义抽象函数为model 基类
 */
abstract class PersonModel {
  /**
   * 数据表名
   */
  abstract table: string;
  /**
   * constructor() {} //构造函数 因 在抽象类中无法实例化该对象，古此处构造函数无用
   */
  /**
   * 创建数据
   */
  abstract create();
  /**
   * 更新数据
   */
  abstract update();
  /**
   * 读取数据
   */
  abstract read();
  /**
   * 删除数据
   */
  abstract delete();
}
export default PersonModel;