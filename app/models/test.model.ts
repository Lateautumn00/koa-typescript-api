class TestModel {
  text: string;
  public async index(text: string) {
    const test1 = await this.getText1.call({ text: text });
    const test2 = await this.getText2(text);
    return `${test1} | ${test2}`;
  }
  protected getText1() {
    return this.text;
  }
  protected getText2(text: string) {
    return text;
  }
}
export default new TestModel();
