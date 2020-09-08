const mongoose = require('../../database');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const NameSchema = new mongoose.Schema({
  firstName:{
    type: String,
    require: true,
  },
  lastName:{
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

const Name = mongoose.model('Name', NameSchema);

module.exports = Name;
