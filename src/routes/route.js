const express = require('express');
const urlController = require('../controllers/urlController')
const router = express.Router();

//url shortening
router.post('/url/shorten',urlController.shortenUrl)
router.get('/:urlCode',urlController.fetchOriginalUrl)

module.exports = router;