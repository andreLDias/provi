const mongoose = require('../../database');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const AddressSchema = new mongoose.Schema({
  cep: {
    type: String,
    require: true,
    lowercase: true,
  },
  street: {
    type: String,
    require: true,
  },
  number:{
    type: String,
    require: true,
  },
  complement: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
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
});

const Address = mongoose.model('Address', AddressSchema);

module.exports = Address;
