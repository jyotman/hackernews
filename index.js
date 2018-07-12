'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    news = require('./route/news');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    res.send('Welcome to HackerNews API');
});

app.use('/searchnews', news);

app.listen(process.env.PORT || 3000, () => console.log('Structo app listening on port 3000!'));