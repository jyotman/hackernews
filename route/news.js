'use strict';

const newsController = require('../controller/news');
const router = require('express').Router();

router.get('/', newsController.search);

module.exports = router