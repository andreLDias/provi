const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { cpfValidator } = require('../validators/')

const authMiddleware = require('../middlewares/auth');


const authConfig = require('../../config/auth')

const Cpf = require('../models/Cpf');
const Step = require('../models/Step');

const router = express.Router();


// Display all
router.get('/', async (req, res) => {
  Cpf.find({}, (error, cpfs) => {
    if(error){
      res.send("Error.");
      next();
    }
    res.json({ cpfs });
  });
});

router.use(authMiddleware);
// CREATE
router.post('/', async (req, res) => {
  try {
    const cpf = req.body.cpf;
    if(!cpfValidator(cpf)) {
      return res.status(400).send({ error: "Invalid CPF." })
    }
    const old_cpf = await Cpf.findOne({
      cpf: cpf,
      user: req.userId
    });
    if(old_cpf) {
      old_cpf.updateAt = Date.now();
      await old_cpf.save();
      return res.send({ old_cpf })
    }
    if (!cpf) {
      throw new Error("Undefined cpf.")
    }
    const cpf_instance = await Cpf.create({ cpf, user: req.userId });
    const step = await Step.findOneAndUpdate({
      user: req.userId
    }, {
      currentStep: "cpf_step",
      next_end_point: "name_step",
    })

    return res.send({ cpf_instance, success: true, next_end_point: 'name-step' })
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
    const { cpf } = req.body;
    const cpf_instance = await Cpf.findByIdAndUpdate(req.params.cpfId, {
      cpf
    }, { new: true });

    return res.send({ cpf_instance })
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
