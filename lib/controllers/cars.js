const { Router } = require('express');
const Cars = require('../models/Cars');

module.exports = Router()

.post('/', async (req, res) => {
    const cars = await Cars.insert(req.body);
    res.send(cars);
})
.get('/:id', async (req, res) => {
    const cars = await Cars.getById(req.params.id);
    res.send(cars);
})
.get('/', async (req, res) => {
    const cars = await Cars.getAll();
    res.send(cars);
})
.patch('/:id', async (req, res) => {
    const cars = await Cars.updateById(req.params.id, req.body);
    res.send(cars);
})
.delete('/:id', async (req, res) => {
    const cars = await Cars.deleteById(req.params.id);
    res.send(cars);
})