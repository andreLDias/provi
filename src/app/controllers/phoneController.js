const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/auth');

const authConfig = require('../../config/auth')

const Phone = require('../models/Phone');
const Step = require('../models/Step');

const router = express.Router();


// Display all
router.get('/', async (req, res) => {
  Phone.find({}, (error, phones) => {
    if(error){
      res.send("Error.");
      next();
    }
    res.json({ phones });
  });
});

router.use(authMiddleware);
// CREATE
router.post('/', async (req, res) => {
  try {
    const phoneNumber = req.body.phoneNumber;
    const old_number = await Phone.findOne({
      phoneNumber: phoneNumber,
      user: req.userId
    });
    if(old_number) {
      old_number.updateAt = Date.now();
      await old_number.save();
      return res.send({ old_number })
    }
    if (!phoneNumber) {
      throw new Error("Undefined phone.")
    }
    const phone = await Phone.create({ phoneNumber, user: req.userId });
    const step = await Step.findOneAndUpdate({
      user: req.userId
    }, {
      currentStep: "phone_step",
      next_end_point: "address_step",
    })

    return res.send({ phone, success: true, next_end_point: 'address-step' });
  } catch (err) {
    console.log("Errors", err);
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
    const { phoneNumber } = req.body;
    const phone = await Phone.findByIdAndUpdate(req.params.phoneId, {
      phoneNumber
    }, { new: true });

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
