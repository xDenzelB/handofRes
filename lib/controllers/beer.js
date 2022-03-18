const { Router } = require('express');
const Beer = require('../models/Beer');

module.exports = Router()

.post('/', async (req, res) => {
    const beer = await Beer.insert(req.body);
    res.send(beer);
})

.get('/:id', async (req, res) => {
    const beer = await Beer.getById(req.params.id);
    res.send(beer);
})
.get('/', async (req, res) => {
    const beer = await Beer.getAll();
    res.send(beer);
})

.patch('/:id', async (req, res) => {
    const beer = await Beer.updateById(req.params.id, req.body);
    res.send(beer);
})

.delete('/:id', async (req, res) => {
    const beer = await Beer.deleteById(req.params.id);
    res.send(beer);
})