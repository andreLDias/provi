const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/auth');

const authConfig = require('../../config/auth')

const Birthday = require('../models/Birthday');
const Step = require('../models/Step');

const router = express.Router();


router.get('/', async (req, res) => {
  Birthday.find({}, (error, birthdays) => {
    if(error){
      res.send("Error.");
      next();
    }
    res.json({ birthdays });
  });
});

router.use(authMiddleware);
// CREATE
router.post('/', async (req, res) => {
  try {
    const birth = req.body.birthday
    const old_birthday = await Birthday.findOne({
      birthday: birth,
      user: req.userId
    });
    if(old_birthday) {
      old_birthday.updateAt = Date.now();
      await old_birthday.save();
      return res.send({ old_birthday })
    }
    if (!birth) {
      throw new Error("Undefined birthday.")
    }
    const birthday = await Birthday.create({ ...req.body, user: req.userId });
    const step = await Step.findOneAndUpdate({
      user: req.userId
    }, {
      currentStep: "birthday_step",
      next_end_point: "phone_step",
    })
    return res.send({ birthday, success: true, next_end_point: 'phone-step' });
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
    const { birthday } = req.body;
    const birthday_instance = await Birthday.findByIdAndUpdate(req.params.birthdayId, {
      birthday
    }, { new: true });

    return res.send({ birthday_instance })
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
