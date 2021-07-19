class TestModel {
  public async index(params: string) {
    const test = await this.test.call({ name: '张三', age: '里斯' }, '王五');
    return params + test;
  }
  public async test(name: string) {
    console.log(this, name);
    return 123456;
  }
}
export default new TestModel();
