const CPF = require('cpf');

const cpf_validator = (cpf) => {
  formated_cpf = CPF.format(cpf);
  isValid = CPF.isValid(formated_cpf);
  return isValid
}

module.exports = cpf_validator
