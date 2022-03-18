const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/cars', require('./controllers/cars'))
app.use('/api/v1/pizza', require('./controllers/pizza'))
app.use('/api/v1/movies', require('./controllers/movies'))

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
