const mongoose = require('../../database');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const StepSchema = new mongoose.Schema({
  currentStep: {
    type: String,
    require: true,
    default: "cpf",
  },
  next_end_point: {
    type: String,
    require: true,
  },
  isOver: {
    type: Boolean,
    default: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    require: true,
    unique: true
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

const Step = mongoose.model('Step', StepSchema);

module.exports = Step;
