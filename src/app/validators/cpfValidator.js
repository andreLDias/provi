const CPF = require('cpf');

const cpf_validator = (cpf) => {
  isValid = CPF.isValid(cpf);
  return isValid
}

module.exports = cpf_validator
