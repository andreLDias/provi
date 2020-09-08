const mongoose = require('../database');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Não traz a password no select
  },
  token: {
    type: String,
    unique: true,
  },
  cpf: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
    unique: true,
  },
  lastName: {
    type: String,
    unique: true,
  },
  birthday: {
    type: String,
    unique: true,
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

UserSchema.pre('save', async function(next){
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  this.token = this.id ;

  next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;
