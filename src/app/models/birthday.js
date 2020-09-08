const mongoose = require('../../database');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const BirthdaySchema = new mongoose.Schema({
  birthday:{
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

const Birthday = mongoose.model('Birthday', BirthdaySchema);

module.exports = Birthday;
