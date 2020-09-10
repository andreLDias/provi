const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cepValidator = require('cep-promise');

const authMiddleware = require('../middlewares/auth');

const authConfig = require('../../config/auth')

const Address = require('../models/Address');
const Step = require('../models/Step');

const router = express.Router();


// display all
router.get('/', async (req, res) => {
  Address.find({}, (error, address) => {
    if(error){
      res.send("Error.");
      next();
    }
    res.json({ address });
  });
});

router.use(authMiddleware);
// CREATE
router.post('/', async (req, res) => {
  try {
    let { cep, street, number, complement, city, state } = req.body

    const result = await cepValidator(cep)
    if (!state) { state = (result.state); };
    if (!street) { street = (result.street); };
    if (!city) { city = (result.city); };
    if (!complement) { number = "Sem complemento." };
    if (!number) { number = 0 };

    const old_address = await Address.findOne({
      cep: cep,
      street: street,
      number: number,
      complement: complement,
      city: city,
      state: state,
      user: req.userId
    });
    if(old_address) {
      old_address.updateAt = Date.now;
      await old_address.save();
      return res.send({ old_address })
    }
    const address = await Address.create({ cep, street, number, complement, city, state, user: req.userId });
    const step = await Step.findOneAndUpdate({
      user: req.userId
    }, {
      currentStep: "address_step",
      next_end_point: "amount_step",
    });
    return res.send({ address, success: true, next_end_point: 'amount-date' });
  } catch (err) {
    return res.status(400).send({ error: "Error creating new Address." })
  }
});

// READ
router.get('/:addressId', async (req, res) => {
  try {
    const address = await Address.findById(req.params.addressId);

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
    }, { new: true });

    return res.send({ address })
  } catch(err) {
    return res.status(400).send({ error: "Error updating the Address." })
  }
});

// DELETE
router.delete('/:addressId', async (req, res) => {
  try {
    const address = await Address.findByIdAndRemove(req.params.addressId);

    return res.send({ ok: true })
  } catch(err) {
    return res.status(400).send({ error: "Error deleting the Address." })
  }
});

module.exports = app => app.use('/address', router);
