const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/auth');

const authConfig = require('../../config/auth')

const Address = require('../models/Address');

const router = express.Router();

router.use(authMiddleware);

// display all
router.get('/', async (req, res) => {
  Address.find({}, (error, address) => {
    if(error){
      res.send("Error.");
      next();
    }
    res.json({ address });
  }).populate('user');
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const address = await Address.create({ ...req.body, user: req.userId });

    return res.send({ address })
  } catch (err) {
    return res.status(400).send({ error: "Error creating new Address." })
  }
});

// READ
router.get('/:addressId', async (req, res) => {
  try {
    const address = await Address.findById(req.params.addressId).populate('user');

    return res.send({ address })
  } catch(err) {
    return res.status(400).send({ error: "Error finding the Address." })
  }
});

// UPDATE
router.put('/:addressId', async (req, res) => {
  try {
    const { cep, street, number } = req.body;
    const address = await Address.findByIdAndUpdate(req.params.addressId, {
      cep,
      street,
      number
    }, { new: true }).populate('user');

    return res.send({ address })
  } catch(err) {
    return res.status(400).send({ error: "Error updating the Address." })
  }
});

// DELETE
router.delete('/:addressId', async (req, res) => {
  try {
    const address = await Address.findByIdAndRemove(req.params.addressId).populate('user');

    return res.send({ ok: true })
  } catch(err) {
    return res.status(400).send({ error: "Error deleting the Address." })
  }
});

module.exports = app => app.use('/address', router);
