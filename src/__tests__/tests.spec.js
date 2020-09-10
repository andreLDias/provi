const { cpfValidator } = require('../app/validators');

describe("CPF function", () => {
  test("it should verify if the cpf is valid (w/o pattern)", () => {
    const input = "44496561808";

    const output = true;

    expect(cpfValidator(input)).toEqual(output);

  });

  test("it should verify if the cpf is valid (w/ pattern)", () => {
    const input = "444.965.618/08";

    const output = true;

    expect(cpfValidator(input)).toEqual(output);

  });

  test("it should verify if the cpf is invalid", () => {
    const input = "4";

    const output = false;

    expect(cpfValidator(input)).toEqual(output);

  });
});
