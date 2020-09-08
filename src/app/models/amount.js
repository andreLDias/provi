const mongoose = require('../../database');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const AmountSchema = new mongoose.Schema({
  amount:{
    type: Number,
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

const Amount = mongoose.model('Amount', AmountSchema);

module.exports = Amount;
