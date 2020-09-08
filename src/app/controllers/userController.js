const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../../config/auth')

const User = require('../models/User');

const router = express.Router();

function generateToken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    if(await User.findOne({ email })) {
      return res.status(400).send({ error: "User already exists." })
    }
    const user = await User.create(req.body);

    user.password = undefined; // para nao mostrar o password

    res.send({
      user,
      token: generateToken({ id: user.id })
    });

  } catch {
    return res.status(400).send({ error: "Registration failed." })
  }
});

router.post('/auth', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');

  if(!user){
    return res.status(400).send({ error: "User not found." })
  }
  if(!await bcrypt.compare(password, user.password)){
    return res.status(400).send({ error: "Invalid password." })
  }

  user.password = undefined;

  res.send({
    user,
    token: generateToken({ id: user.id })
  });
});

router.get('/all', (req, res) => {
  User.find({}, (error, users) => {
    if(error){
      res.send("Error.");
      next();
    }
    res.json({ users });
  }).populate('address')
});

router.get('/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('address');

    return res.send({ user })
  } catch(err) {
    return res.status(400).send({ error: "Error finding the user." })
  }
});

// TO-DO pesquisar os address via user
router.get('/:userId/addresses', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('address');
    const addresses = await Address.findBy({ user: userId }).populate('user');

    return res.send({ addresses })
  } catch(err) {
    return res.status(400).send({ error: "Error finding the address." })
  }
});


module.exports = app => app.use('/users', router);
