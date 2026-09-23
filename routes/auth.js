var express = require('express');
var router = express.Router();

var service = require('../services/users');
var private = require('../middlewares/private');

router.post('/login', service.authenticate);
router.get('/logout', private.checkJWT, service.logout);

module.exports = router;