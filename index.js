'use strict';

const express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    debug = require('debug')('hackernews'),
    news = require('./route/news');

const app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

app.get('/', (req, res, next) => {
    res.send('Welcome to HackerNews API');
});

app.use('/searchnews', news);

exports.server = app.listen(process.env.PORT || 3000, () => debug('Structo app listening on port 3000!'));

exports.app = app;