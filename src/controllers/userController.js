const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')

const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    if(await User.findOne({ email })) {
      return res.status(400).send({ error: "User already exists." })
    }
    const user = await User.create(req.body);

    user.password = undefined; // para nao mostrar o password

    return res.send({ user });
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

  const token = jwt.sign({ id: user.id }, authConfig.secret, {
    expiresIn: 86400,
  });

  res.send({ user, token });
});

router.get('/all', (req, res) => {
  User.find({}, (error, users) => {
    if(error){
      res.send("Error.");
      next();
    }
    res.json(users);
  })
})

module.exports = app => app.use('/users', router);
