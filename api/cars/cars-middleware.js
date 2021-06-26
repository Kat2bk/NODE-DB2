const Cars = require('./cars-model');
const validator = require('vin-validator');

exports.checkCarId = (req, res, next) => {
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

exports.checkCarPayload = (req, res, next) => {
  const {vin, make, model, mileage} = req.body;

  if (!vin || !make || !model) {
    res.status(400).json({message: `${req.body} is missing`})
  } else if (!mileage || mileage < 0) {
    res.status(400).json({message: "please enter valid input for car mileage"})
  } else {
    next()
  }
}

exports.checkVinNumberValid = (req, res, next) => {
  const isValid = validator.validate(req.body.vin)

  if (isValid) {
    next()
  } else {
    res.status(400).json({message: `vin ${req.body.vin} is invalid`})
  }
}

exports.checkVinNumberUnique = (req, res, next) => {
  // need to create a getVin knex function similar to getById
  Cars.getVin(req.params.vin)
  .then(vin => {
    vin.filter(number === req.params.vin ? res.status(400).json({message: `vin ${req.params.vin} already exists`}) : next())
  })
  .catch(error => {
    next(error)
  })
}