const { Router } = require('express');
const Movies = require('../models/Movies');

module.exports = Router()

.post('/', async (req, res) => {
    const movies = await Movies.insert(req.body);
    res.send(movies);
})
.get('/:id', async (req, res) => {
    const movies = await Movies.getById(req.params.id);
    res.send(movies);
})
.get('/', async (req, res) => {
    const movies = await Movies.getAll();
    res.send(movies);
})

.patch('/:id', async (req, res) => {
    const movies = await Movies.updateById(req.params.id, req.body);
    res.send(movies);
})

.delete('/:id', async (req, res) => {
    const movies = await Movies.deleteById(req.params.id);
    res.send(movies);
})

