var express = require('express');
var router = express.Router({ mergeParams: true });

var service = require('../services/reservations');
var private = require('../middlewares/private');

router.get('/', private.checkJWT, service.getAll);
router.get('/:idReservation', private.checkJWT, service.getById);
router.post('/', private.checkJWT, service.add);
router.put('/:idReservation', private.checkJWT, service.update);
router.delete('/:idReservation', private.checkJWT, service.delete);

module.exports = router;