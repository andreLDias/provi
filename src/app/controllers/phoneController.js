const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/auth');

const authConfig = require('../../config/auth')

const Phone = require('../models/Phone');

const router = express.Router();

router.use(authMiddleware);

// Display all
router.get('/', async (req, res) => {
  Phone.find({}, (error, phone) => {
    if(error){
      res.send("Error.");
      next();
    }
    res.json({ phone });
  }).populate('user');
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const phone = await Phone.create({ ...req.body, user: req.userId });

    return res.send({ phone })
  } catch (err) {
    return res.status(400).send({ error: "Error creating new phone." })
  }
});

// READ
router.get('/:phoneId', async (req, res) => {
  try {
    const phone = await Phone.findById(req.params.phoneId).populate('user');

    return res.send({ phone })
  } catch(err) {
    return res.status(400).send({ error: "Error finding the Phone." })
  }
});

// UPDATE
router.put('/:phoneId', async (req, res) => {
  try {
    const { cep, street, number } = req.body;
    const phone = await Phone.findByIdAndUpdate(req.params.phoneId, {
      cep,
      street,
      number
    }, { new: true }).populate('user');

    return res.send({ phone })
  } catch(err) {
    return res.status(400).send({ error: "Error updating the Phone." })
  }
});

// DELETE
router.delete('/:phoneId', async (req, res) => {
  try {
    const phone = await Phone.findByIdAndRemove(req.params.phoneId).populate('user');

    return res.send({ ok: true })
  } catch(err) {
    return res.status(400).send({ error: "Error deleting the Phone." })
  }
});

module.exports = app => app.use('/phone', router);
