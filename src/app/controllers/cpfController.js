const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authMiddleware = require('../middlewares/auth');

const { cpfValidator } = require('../validators')

const authConfig = require('../../config/auth')

const Cpf = require('../models/Cpf');

const router = express.Router();

router.use(authMiddleware);

// Display all
router.get('/', async (req, res) => {
  Cpf.find({}, (error, cpf) => {
    if(error){
      res.send("Error.");
      next();
    }
    res.json({ cpf });
  });
});

// CREATE
router.post('/', async (req, res) => {
  try {
    const cpfNumber = req.body.cpfNumber;
    const old_cpf = await Cpf.findOne({
      cpfNumber: cpfNumber,
      user: req.userId
    });
    if(old_cpf) {
      old_cpf.updateAt = Date.now();
      await old_cpf.save();
      return res.send({ old_cpf })
    }
    if (!cpfNumber) {
      throw new Error("Undefined cpf.")
    }
    const cpf = await Cpf.create({ cpfNumber, user: req.userId });

    return res.send({ cpf })
  } catch (err) {
    console.log("Errors", err);
    return res.status(400).send({ error: "Error creating new cpf." })
  }
});

// READ
router.get('/:cpfId', async (req, res) => {
  try {
    const cpf = await Cpf.findById(req.params.cpfId).populate('user');

    return res.send({ cpf })
  } catch(err) {
    return res.status(400).send({ error: "Error finding the Cpf." })
  }
});

// UPDATE
router.put('/:cpfId', async (req, res) => {
  try {
    const { cep, street, number } = req.body;
    const cpf = await Cpf.findByIdAndUpdate(req.params.cpfId, {
      cep,
      street,
      number
    }, { new: true }).populate('user');

    return res.send({ cpf })
  } catch(err) {
    return res.status(400).send({ error: "Error updating the Cpf." })
  }
});

// DELETE
router.delete('/:cpfId', async (req, res) => {
  try {
    const cpf = await Cpf.findByIdAndRemove(req.params.cpfId).populate('user');

    return res.send({ ok: true })
  } catch(err) {
    return res.status(400).send({ error: "Error deleting the Cpf." })
  }
});

module.exports = app => app.use('/cpf', router);
