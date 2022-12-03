import { hello } from ".";

describe("hello", () => {
  it("gives a custom greeting", () => {
    expect(hello("Laska")).toStrictEqual("Hello, Laska!");
  });
});
