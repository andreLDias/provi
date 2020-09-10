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

const frisby = require('frisby');
const Joi = frisby.Joi;

it('Health Check', async function () {
  return await frisby.get('http://localhost:3000/health-check/')
    .expect('status', 200);
});

it ('should return a status of 200', async function () {
  return await frisby
    .get('http://localhost:3000/users/all')
    .expect('status', 200)
    .expect('jsonTypes', 'users.*', { // Assert *each* object in 'items' array
      '_id': Joi.string().required(),
      'email': Joi.string().required(),
      'createdAt': Joi.date().iso().required(),
      'updateAt': Joi.date().iso().required(),
    });
});
