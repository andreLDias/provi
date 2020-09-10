const mongoose = require('../../database');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const CpfSchema = new mongoose.Schema({
  cpf:{
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
    default: Date.now,
  }
})

const Cpf = mongoose.model('Cpf', CpfSchema);

module.exports = Cpf;
