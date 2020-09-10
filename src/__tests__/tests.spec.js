const { cpfValidator } = require('../app/validators');
const frisby = require('frisby');
const Joi = frisby.Joi;

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

describe("Health Check", () => {
  it('It should verify if the API is on', async function () {
    return await frisby.get('http://localhost:3000/health-check/')
      .expect('status', 200);
  });
});

describe("Users", () => {
  it ('It should verify if users display correctly', async function () {
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
});

describe("CPFs", () => {
  it ('It should verify if CPFs display correctly', async function () {
    return await frisby
      .get('http://localhost:3000/cpf/')
      .expect('status', 200)
      .expect('jsonTypes', 'cpfs.*', { // Assert *each* object in 'items' array
        '_id': Joi.string().required(),
        'cpf': Joi.string().required(),
        'user': Joi.string().required(),
        'createdAt': Joi.date().iso().required(),
        'updateAt': Joi.date().iso().required(),
      });
  });
});

describe("Names", () => {
  it ('It should verify if Names display correctly', async function () {
    return await frisby
      .get('http://localhost:3000/name/')
      .expect('status', 200)
      .expect('jsonTypes', 'names.*', { // Assert *each* object in 'items' array
        '_id': Joi.string().required(),
        'firstName': Joi.string().required(),
        'lastName': Joi.string().required(),
        'user': Joi.string().required(),
        'createdAt': Joi.date().iso().required(),
        'updateAt': Joi.date().iso().required(),
      });
  });
});
