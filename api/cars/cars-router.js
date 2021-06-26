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
router.get('/:id', checkCarId, async (req, res, next) => {
    try {
        res.status(200).json(req.cars)
    } catch (error) {
        next(error)
    }
})

//create car

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, async (req, res, next) => {
    try {
        res.status(201).json(req.body)
    } catch (error) {
        next(error)
    }
})


server.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render({
        message: err.message,
        error: {}
    });
});

module.exports = router;
