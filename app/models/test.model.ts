class TestModel {
  text: any;
  public async index(text: string) {
    const test1 = await this.getText1.call({ text: text });
    const test2 = await this.getText2(text);
    return `${test1} | ${test2}`;
  }
  public async getText1() {
    return this.text;
  }
  public async getText2(text: string) {
    return text;
  }
}
export default new TestModel();
