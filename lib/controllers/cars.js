const { Router } = require('express');
const Cars = require('../models/Cars');

module.exports = Router()

.post('/', async (req, res) => {
    const cars = await Cars.insert(req.body);
    res.send(cars);
})