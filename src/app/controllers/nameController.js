const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/auth');

const authConfig = require('../../config/auth')

const Name = require('../models/Name');

const router = express.Router();

router.use(authMiddleware);

// Display all
router.get('/', async (req, res) => {
  Name.find({}, (error, names) => {
    if(error){
      res.send("Error.");
      next();
    }
    res.json({ names });
  }).populate('user');
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const { data } = req.body
    firstName = data.split(" ")[0];
    lastNameArr = data.split(" ").slice(1);
    lastName = lastNameArr.toString().replace(/,/gm, " ");
    const name = await Name.create({ firstName: firstName, lastName: lastName, user: req.userId });

    return res.send({ name })
  } catch (err) {
    return res.status(400).send({ error: "Error creating new name." })
  }
});

// READ
router.get('/:nameId', async (req, res) => {
  try {
    const name = await Name.findById(req.params.nameId).populate('user');

    return res.send({ name })
  } catch(err) {
    return res.status(400).send({ error: "Error finding the name." })
  }
});

// UPDATE
router.put('/:nameId', async (req, res) => {
  try {
    const { data } = req.body
    firstName = data.split(" ")[0];
    lastNameArr = data.split(" ").slice(1);
    lastName = lastNameArr.toString().replace(/,/gm, " ");
    const name = await Name.findByIdAndUpdate(req.params.nameId, {
      firstName,
      lastName
    }, { new: true }).populate('user');

    return res.send({ name })
  } catch(err) {
    return res.status(400).send({ error: "Error updating the name." })
  }
});

// DELETE
router.delete('/:nameId', async (req, res) => {
  try {
    const name = await Address.findByIdAndRemove(req.params.nameId).populate('user');

    return res.send({ ok: true })
  } catch(err) {
    return res.status(400).send({ error: "Error deleting the Address." })
  }
});

module.exports = app => app.use('/name', router);
