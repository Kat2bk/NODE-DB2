const Cars = require('./cars-model');
const validator = require('vin-validator');

 const checkCarId = (req, res, next) => {
  Cars.getById(req.params.id)
  .then(cars => {
    if (cars) {
      req.cars = cars
      next()
    } else {
      res.status(404).json({message: `car with ${req.params.id} not found`})
    }
  })
  .catch(error => {
    next(error)
  })
}

const checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body;

  if (!vin || !make || !model) {
    res.status(400).json({message: `please enter all required fields`})
  } else if (!mileage || mileage < 0) {
    res.status(400).json({message: "please enter valid input for car mileage"})
  } else {
    next()
  }
}

const checkVinNumberValid = (req, res, next) => {
  const isValid = validator.validate(req.body.vin)

  if (isValid) {
    next()
  } else {
    res.status(400).json({message: `vin ${req.body.vin} is invalid`})
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  // need to create a getVin knex function similar to getById

  try {
    const vin = await Cars.getVin(req.body.vin)
    if (vin) {
      res.status(400).json({message: `vin ${req.body.vin} already exists`})
    } else {
      next()
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
};