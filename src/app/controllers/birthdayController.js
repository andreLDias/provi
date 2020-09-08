const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/auth');

const authConfig = require('../../config/auth')

const Birthday = require('../models/Birthday');

const router = express.Router();

router.use(authMiddleware);

router.get('/', async (req, res) => {
  Birthday.find({}, (error, birthday) => {
    if(error){
      res.send("Error.");
      next();
    }
    res.json({ birthday });
  }).populate('user');
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const birthday = await Birthday.create({ ...req.body, user: req.userId });

    return res.send({ birthday })
  } catch (err) {
    return res.status(400).send({ error: "Error creating new Birthday." })
  }
});

// READ
router.get('/:birthdayId', async (req, res) => {
  try {
    const birthday = await Birthday.findById(req.params.birthdayId).populate('user');

    return res.send({ birthday })
  } catch(err) {
    return res.status(400).send({ error: "Error finding the Birthday." })
  }
});

// UPDATE
router.put('/:birthdayId', async (req, res) => {
  try {
    const { cep, street, number } = req.body;
    const birthday = await Birthday.findByIdAndUpdate(req.params.birthdayId, {
      cep,
      street,
      number
    }, { new: true }).populate('user');

    return res.send({ birthday })
  } catch(err) {
    return res.status(400).send({ error: "Error updating the Birthday." })
  }
});

// DELETE
router.delete('/:birthdayId', async (req, res) => {
  try {
    const birthday = await Birthday.findByIdAndRemove(req.params.birthdayId).populate('user');

    return res.send({ ok: true })
  } catch(err) {
    return res.status(400).send({ error: "Error deleting the Birthday." })
  }
});

module.exports = app => app.use('/birthday', router);
