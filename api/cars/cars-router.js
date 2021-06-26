const express = require('express');
const router = express.Router()
const Cars = require('./cars-model');
const {checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid} = require('./cars-middleware');

//get

router.get('/', async (req, res, next) => {
    try {
        const cars = await Cars.getAll()
        res.json(cars)
    } catch (error) {
        next(error)
    }
})


// getById
router.get('/:id', checkCarId, (req, res, next) => {
    try {
        res.status(200).json(req.cars)
    } catch (error) {
        next(error)
    }
})

//create car

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try {
        const newCar = await Cars.create(req.body)
        res.status(201).json(newCar)
    } catch (error) {
        next(error)
    }
})

// testing: 4 failed, 9 passed.
// then it said there were no failed tests


router.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(err.status || 500)
    res.render({
        message: err.message,
        error: {}
    });
});

module.exports = router;
