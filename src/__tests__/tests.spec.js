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
      .expect('jsonTypes', 'users.*', {
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
      .expect('jsonTypes', 'cpfs.*', {
        '_id': Joi.string().required(),
        'cpf': Joi.string().required(),
        'user': Joi.string().required(),
        'createdAt': Joi.date().iso().required(),
        'updateAt': Joi.date().iso().required(),
      });
  });
});

describe("Names", () => {
  it ('It should verify if names display correctly', async function () {
    return await frisby
      .get('http://localhost:3000/name/')
      .expect('status', 200)
      .expect('jsonTypes', 'names.*', {
        '_id': Joi.string().required(),
        'firstName': Joi.string().required(),
        'lastName': Joi.string().required(),
        'user': Joi.string().required(),
        'createdAt': Joi.date().iso().required(),
        'updateAt': Joi.date().iso().required(),
      });
  });
});

describe("Birthdays", () => {
  it ('It should verify if birthdays display correctly', async function () {
    return await frisby
      .get('http://localhost:3000/birthday/')
      .expect('status', 200)
      .expect('jsonTypes', 'birthdays.*', {
        '_id': Joi.string().required(),
        'birthday': Joi.string().required(),
        'user': Joi.string().required(),
        'createdAt': Joi.date().iso().required(),
        'updateAt': Joi.date().iso().required(),
      });
  });
});

describe("Phones", () => {
  it ('It should verify if phones display correctly', async function () {
    return await frisby
      .get('http://localhost:3000/phone/')
      .expect('status', 200)
      .expect('jsonTypes', 'phones.*', {
        '_id': Joi.string().required(),
        'phoneNumber': Joi.string().required(),
        'user': Joi.string().required(),
        'createdAt': Joi.date().iso().required(),
        'updateAt': Joi.date().iso().required(),
      });
  });
});

describe("Addresses", () => {
  it ('It should verify if addresses display correctly', async function () {
    return await frisby
      .get('http://localhost:3000/address/')
      .expect('status', 200)
      .expect('jsonTypes', 'addresses.*', {
        '_id': Joi.string().required(),
        'cep': Joi.string().required(),
        'street': Joi.string(),
        'number': Joi.string(),
        'complement': Joi.string(),
        'city': Joi.string(),
        'state': Joi.string(),
        'user': Joi.string().required(),
        'createdAt': Joi.date().iso().required(),
        'updateAt': Joi.date().iso().required(),
      });
  });
});

describe("Amount", () => {
  it ('It should verify if amounts display correctly', async function () {
    return await frisby
      .get('http://localhost:3000/amount/')
      .expect('status', 200)
      .expect('jsonTypes', 'amounts.*', {
        '_id': Joi.string().required(),
        'amount': Joi.number().required(),
        'user': Joi.string().required(),
        'createdAt': Joi.date().iso().required(),
        'updateAt': Joi.date().iso().required(),
      });
  });
});
